# Быстрая установка

Самый быстрый способ установить агента MYXON на любое устройство на базе Debian.

## Требования

Перед установкой:
1. [Сгенерируйте код активации](/ru/dealer/activation-codes) в вашем Портале дилера
2. Знайте URL вашего сервера MYXON (напр. `https://myxon.yourcompany.com`)
3. Имейте root-доступ к целевому устройству

## Установка одной строкой

```bash
curl -fsSL https://your-domain.com/install.sh | bash -s -- \
    --code A3F1-B2E4-C9D7-0F56 \
    --server https://myxon.yourcompany.com
```

Замените `A3F1-B2E4-C9D7-0F56` на сгенерированный вами код активации.

::: tip Запуск из локального файла
Если вы провижините устройства из локальной сети без доступа в интернет (напр. цех завода), скопируйте файлы агента на устройство и запустите:
```bash
scp -r edge-agent/ technician@device-ip:/tmp/myxon-agent
ssh technician@device-ip
cd /tmp/myxon-agent
sudo bash install.sh --code A3F1-B2E4-C9D7-0F56 --server https://myxon.yourcompany.com
```
:::

## Что делает установщик

```
▶ Установка системных пакетов...
    apt-get: python3 python3-pip python3-venv curl iproute2

▶ Установка frpc 0.61.0...
    Скачивает frp для вашей архитектуры (aarch64/armv7l/x86_64)
    Устанавливает в /usr/local/bin/frpc

▶ Установка агента в /opt/myxon-agent...
    Копирует myxon_agent.py, local_api.py

▶ Настройка Python virtualenv...
    /opt/myxon-agent/venv: httpx fastapi uvicorn

▶ Запись конфигурации агента...
    /opt/myxon-agent/agent.env

▶ Установка systemd-сервиса...
    /etc/systemd/system/myxon-agent.service
    systemctl enable myxon-agent

▶ Запуск myxon-agent...
    Ждёт 3 секунды, проверяет /etc/myxon/device.json

  ✓ Устройство успешно активировано!
    Серийник: MX-2026-00001
```

## Проверка установки

Проверьте статус сервиса:
```bash
systemctl status myxon-agent
```

Смотрите логи в реальном времени:
```bash
journalctl -u myxon-agent -f
```

Подтвердите, что устройство зарегистрировано:
```bash
cat /etc/myxon/device.json
```

Ожидаемый вывод:
```json
{
  "device_id": "550e8400-e29b-41d4-a716-446655440000",
  "serial_number": "MX-2026-00001",
  "frpc_token": "..."
}
```

## Режим роутера — Orange Pi как шлюз LAN

Если у вашего Orange Pi есть **USB Ethernet-адаптер**, подключённый к промышленному коммутатору,
вы можете сделать его полноценным DHCP-роутером для сети ПЛК/HMI.
Тогда агент служит шлюзом LAN для всех нижестоящих контроллеров.

```
Интернет ──── eth0 (DHCP от провайдера/аплинка)
                      Orange Pi
USB-адаптер ── eth1 ──── коммутатор ──── ПЛК / HMI / VNC устройства
                      (192.168.10.1/24)
```

### Что настраивается

| Компонент | Что происходит |
|-----------|-------------|
| Статический IP `eth1` | `192.168.10.1/24` (настраивается через `--lan-ip`) |
| dnsmasq DHCP | Устройства получают `.100`–`.200`, шлюз `192.168.10.1`, DNS `8.8.8.8` |
| IP forwarding | `sysctl net.ipv4.ip_forward=1` (постоянно) |
| iptables NAT | ПЛК получают доступ в интернет через Orange Pi |
| `MYXON_SCAN_MODE` | Автоматически ставится в `lan-only` — агент сканирует только `eth1` |

### Команда установки

```bash
sudo bash install.sh \
    --code A3F1-B2E4-C9D7-0F56 \
    --server https://myxon.yourcompany.com \
    --lan-iface eth1
```

Свой IP шлюза (если `192.168.10.1` конфликтует с вашей сетью):

```bash
sudo bash install.sh \
    --code A3F1-B2E4-C9D7-0F56 \
    --server https://myxon.yourcompany.com \
    --lan-iface eth1 \
    --lan-ip 10.20.0.1
```

### Как найти имя USB-адаптера

USB Ethernet-адаптеры на Debian видны как `enxXXXXXXXXXXXX` (на базе MAC) или `eth1`:

```bash
ip link show
# Ищите: enx001122334455 или eth1 — тот, что DOWN или без IP
```

### Проверка настройки роутера

После установки убедитесь, что устройства на коммутаторе получают DHCP-аренду:

```bash
# DHCP-аренды
cat /var/lib/misc/dnsmasq.leases

# Таблица маршрутизации
ip route show

# Правила NAT
iptables -t nat -L POSTROUTING -n -v
```

::: tip Повторный запуск install
Настройка роутера **идемпотентна** — можно безопасно перезапускать `install.sh --lan-iface eth1`
после перезагрузки или при добавлении нового устройства. Правила iptables проверяются перед добавлением.
:::

## Резервный WAN через 4G — запасной интернет через USB-модем

Если к Orange Pi подключён USB 4G-модем, установщик может настроить его как
**автоматический резервный WAN** — переключение на LTE при падении основного канала.

```
Интернет ──── eth0 (основной WAN, metric 100)
                    Orange Pi
USB 4G-модем ── wwan0 (резервный WAN, metric 200) ← включается при падении eth0
```

NetworkManager автоматически повышает маршрут по умолчанию `wwan0`, когда `eth0` теряет несущую —
без кастомных скриптов и перезагрузки.

### Команда установки

```bash
sudo bash install.sh \
    --code A3F1-B2E4-C9D7-0F56 \
    --server https://myxon.yourcompany.com \
    --backup-modem /dev/ttyUSB0
```

### Совмещённый режим: роутер + 4G-резерв

Для полной настройки (Orange Pi как шлюз LAN **и** 4G-резерв):

```bash
sudo bash install.sh \
    --code A3F1-B2E4-C9D7-0F56 \
    --server https://myxon.yourcompany.com \
    --lan-iface eth1 \
    --backup-modem /dev/ttyUSB0
```

### Что настраивается

| Компонент | Результат |
|-----------|--------|
| `ModemManager` + `NetworkManager` | Установлены, включены |
| `myxon-wan-primary` (соединение NM) | eth0, DHCP, metric 100 |
| `myxon-wan-4g` (соединение NM) | wwan0, GSM/APN, metric 200 |
| `myxon-wan-monitor.service` | Пишет события переключения в journal |

### Проверка переключения

```bash
# Текущий активный WAN-интерфейс
nmcli device status

# Лог переключения в реальном времени
journalctl -t myxon-wan -f

# Форсированный тест переключения (отключить eth0, проверить маршрут)
ip link set eth0 down
ip route show default    # должен показать wwan0
```

### Настройка APN

APN по умолчанию — `internet`. Большинство операторов в Европе используют его.
Если ваш оператор требует другой APN:

```bash
nmcli connection modify myxon-wan-4g gsm.apn <apn-вашего-оператора>
nmcli connection up myxon-wan-4g
```

::: tip Модемы Huawei HiLink
Huawei E3372 и подобные **HiLink**-модемы выставляют встроенный роутер через USB Ethernet
(`192.168.8.1`). Они видны как обычный Ethernet-адаптер — не как GSM-модем.
Для них **не** используйте `--backup-modem`. Просто подключите — NetworkManager
сам определит их как второй Ethernet-WAN.
:::

## Тихая / неинтерактивная установка

Для заводского создания образов или скриптов cloud-init:

```bash
MYXON_ACTIVATION_CODE=A3F1-B2E4-C9D7-0F56 \
MYXON_CLOUD_URL=https://myxon.yourcompany.com \
MYXON_SCAN_MODE=auto \
    bash install.sh
```

Или через окружение в `runcmd` cloud-init:
```yaml
runcmd:
  - MYXON_ACTIVATION_CODE=A3F1-B2E4-C9D7-0F56 MYXON_CLOUD_URL=https://myxon.yourcompany.com bash /opt/myxon-installer/install.sh
```

## Переустановка (уже активированное устройство)

Если вы перезапускаете `install.sh` на устройстве, где уже есть `/etc/myxon/device.json`:

- Установщик **обнаруживает существующее состояние** и печатает предупреждение
- Он обновляет `agent.env` новым URL сервера (если изменился), но **не перезаписывает** код активации
- Сервис перезапускается с обновлённой конфигурацией

Чтобы сбросить устройство и переактивировать его новым кодом:
```bash
rm /etc/myxon/device.json
sudo bash install.sh --code NEW-CODE-XXXX --server https://myxon.yourcompany.com
```

::: danger Нужен новый код
Для каждого сброса нужно генерировать **новый код активации**. Исходный код уже помечен как использованный на сервере и повторно не применим.
:::

## Удаление

```bash
systemctl stop myxon-agent myxon-local-api 2>/dev/null
systemctl disable myxon-agent myxon-local-api 2>/dev/null
rm -rf /opt/myxon-agent /etc/myxon
rm -f /etc/systemd/system/myxon-agent.service
systemctl daemon-reload
```
