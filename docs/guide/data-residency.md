# Where your data lives

Holdings tell us the same thing: *"our data must stay with us."* Fair — and unlike a legacy RDP gateway, we don't ask you to take that on trust. Here is exactly what happens to the data from your controllers, and how you can verify it yourself.

## The short version

MYXON **transports** your production data — it does not harvest it. By default, the values from your sensors, the screens you see, and the video from your cameras stay with you. Only access metadata and device inventory live in the platform.

| Your data | What happens | Stored? |
|---|---|---|
| HMI screens, camera video, keystrokes, values you enter, access credentials | Relayed in real time during a session | **No — never stored** |
| Sensor readings (temperature, humidity, CO₂ …) | Logged to history | **Only if you switch logging on** (off by default) |
| Device inventory: firmware versions, online/offline, uptime | Service metadata | Yes |
| Audit: who connected, when, to which device | Event metadata (no content) | Yes |
| Screenshots, session recordings | — | **Never created** |

## Telemetry is your decision, not our default

Collecting sensor values is **switched off by default for every device**. Until you explicitly enable logging on a specific device, the agent sends only service data (uptime, tunnel state) — never the readings from your controller. This is by design: the core of MYXON is a **tunnel**, not a data vacuum.

## Verify us — don't trust us

A legacy RDP gateway you can't inspect; you just got used to it. MYXON you *can* inspect:

- **Network self-test** — capture the agent's traffic on your device (`tcpdump`/Wireshark) with logging off, and see for yourself: only a heartbeat leaves the device, no sensor values.
- **Inspect the agent** — the agent runs inside your perimeter; we provide it for audit along with a manifest of exactly what it sends.
- **Inspect the database** — in a self-hosted deployment, the list of tables is a query away in your own database.

> Want the full technical data-flow description for your IT/security team? Ask us — we hand it over for due-diligence.

## Self-hosted: your data never leaves your perimeter

MYXON runs **on your own hardware, inside your own network**. In a self-hosted deployment the entire stack — tunnel server, access gateways, backend, database — runs on your servers. Your database, your keys, your backups. For fully isolated environments we support an offline licence, so the platform never needs to call out.

This is the answer to *"our data must stay with us"* that cloud tunnel services (the ngrok/CloudPub family) cannot give: they are SaaS — traffic flows through the vendor's infrastructure, and their confidentiality guarantee is legal, not physical. With self-hosted MYXON it is physical: the data is simply never anywhere else.

---

*Straight talk: while a remote session is active, screens and video pass through the gateway in order to reach your browser — they are **relayed, not stored**. If your security policy requires that no one but you can ever see that traffic, a self-hosted deployment puts that gateway on your own hardware. We're happy to walk your IT team through the exact data flows.*
