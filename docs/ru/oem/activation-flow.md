# Поток кода активации — техническая справка

Эта страница объясняет точное взаимодействие с API при саморегистрации устройства — для разработчиков и интеграторов, которым нужно понять или расширить поток.

## Полная последовательность

```mermaid
sequenceDiagram
    participant A as Edge-агент (Orange Pi)
    participant S as Backend MYXON
    participant DB as PostgreSQL

    Note over A: Первый запуск — device.json не найден
    Note over A: MYXON_ACTIVATION_CODE=A3F1-B2E4-C9D7-0F56

    A->>A: Обнаружить контроллеры LAN<br/>(скан портов 5843, 5900, 80)

    A->>S: POST /api/v0/agent/activate
    Note right of A: {"code": "A3F1-B2E4-C9D7-0F56",<br/>"metadata": {"firmware_version": "...",<br/>"published_resources": [...]}}

    S->>DB: SELECT * FROM activation_codes WHERE code = ?
    DB-->>S: строка кода (expires_at, used_at=NULL, tenant_id)

    alt Код истёк
        S-->>A: 410 Gone — код истёк
    else Код уже использован
        S-->>A: 409 Conflict — код уже использован
    else Код не найден
        S-->>A: 404 Not Found
    else Код валиден
        S->>DB: SELECT COUNT(*) FROM devices
        DB-->>S: 42
        S->>S: serial = "MX-2026-00043"
        S->>DB: INSERT INTO devices (serial_number, tenant_id, status='online', claim_state='claimed')
        S->>S: Выделить порт туннеля (10043)
        S->>S: Сгенерировать frpc_token (случайные 256 бит)
        S->>DB: UPDATE activation_codes SET used_at=now(), device_id=new_device_id
        S->>DB: INSERT INTO audit_events (action='device.activated')
        S-->>A: 201 Created
        Note left of S: {"device_id": "uuid",<br/>"serial_number": "MX-2026-00043",<br/>"frpc_token": "...",<br/>"tunnel": {"frps_host": "...", "assigned_port": 10043}}
    end

    A->>A: Сохранить /etc/myxon/device.json<br/>(device_id, серийник, frpc_token)
    A->>A: Записать /etc/myxon/agent_token (chmod 0600)
    A->>A: Запустить frpc-туннель (порт 10043)
    A->>S: POST /api/v0/agent/heartbeat (каждые 15с)
```

## Эндпоинт API

```
POST /api/v0/agent/activate
Content-Type: application/json
(заголовок Authorization не требуется)
```

### Тело запроса

```typescript
{
  code: string              // Код активации: "XXXX-XXXX-XXXX-XXXX"
  metadata?: {
    firmware_version?: string
    hardware_info?: string
    model?: string
    published_resources?: Resource[]
  }
}

interface Resource {
  id: string           // напр. "remote-plus"
  protocol: string     // "tcp" | "vnc" | "http"
  host: string         // LAN-IP контроллера
  port: number         // LAN-порт
  name: string         // Человекочитаемое имя
}
```

### Ответ (201 Created)

```typescript
{
  accepted: true
  device_id: string          // UUID нового устройства
  serial_number: string      // Сгенерирован: "MX-2026-00043"
  frpc_token: string         // Сохраните — больше не присылается
  tunnel: {
    frps_host: string        // Хост сервера frps
    frps_port: number        // Порт привязки frps (по умолчанию 7000)
    assigned_port: number    // Уникальный порт для туннеля этого устройства
    subdomain: string | null // Опциональная поддомен-маршрутизация
  }
}
```

### Ответы с ошибками

| Статус | Когда |
|--------|------|
| `404 Not Found` | Код не существует |
| `409 Conflict` | Код уже использован другим устройством |
| `410 Gone` | Код истёк |

## Формат серийного номера

Серийные номера генерируются автоматически:

```
MX-{ГОД}-{ПОСЛЕДОВАТЕЛЬНОСТЬ}
```

- `{ГОД}` — 4-значный год активации
- `{ПОСЛЕДОВАТЕЛЬНОСТЬ}` — 5-значный счётчик устройств на момент активации, дополненный нулями

Пример: `MX-2026-00043` — 43-е устройство, активированное в 2026 году.

::: warning Не настоящая DB-последовательность
Текущая реализация использует `SELECT COUNT(*) FROM devices` для определения следующего номера. В сценариях высокой конкурентности (несколько активаций точно в один момент) есть малый шанс коллизии — уникальное ограничение БД отклонит дубликат, устройство получит ошибку 500 и повторит попытку. Для типичных OEM-развёртываний (по одному устройству за раз) это не проблема.
:::

## Свойства безопасности

| Свойство | Как обеспечивается |
|----------|-----------------|
| Одноразовость | `used_at` ставится при первом использовании; сервер отклоняет последующие вызовы |
| Срок годности | `expires_at` проверяется на стороне сервера при каждом запросе |
| Авторизация не нужна | Сам код ЯВЛЯЕТСЯ доказательством авторизации |
| frpc_token выдаётся однажды | Возвращается только в ответе 201; последующие регистрации используют его без повторной выдачи |
| Токен хранится безопасно | Сохраняется в файл `chmod 0600`; никогда не логируется |
