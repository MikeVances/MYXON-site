# Web HMI in the browser

Many agricultural controllers ship their own **web interface** — a built-in HMI served over HTTP on the LAN. Traditionally you could only reach it by standing in front of the machine or setting up a VPN.

MYXON renders that web interface **directly in your browser**, through the same outbound tunnel the agent already maintains. No VPN client, no port forwarding, no exposed device.

> **Screenshot:** *Web Access card on the device dashboard listing an HTTP resource "Controller UI (HTTP · port 80)" with an "Open Web →" button.*

## How it works for you

1. Open the **device dashboard** and find the **Web Access** section.
2. Resources the agent discovered as **web servers** (HTTP) show an **Open Web →** button.
3. Click it — MYXON requests a short-lived, one-time access grant and opens the controller's web interface in a **new browser tab**.

That's it. You interact with the vendor's own HMI exactly as if you were on the farm LAN.

::: info Why a new tab?
Many controller HMIs send headers that block being embedded inside another page (`X-Frame-Options`). Opening in a dedicated tab gives you the full, unmodified interface.
:::

## What makes it safe

- **No inbound ports.** The browser never connects to the farm. It talks to MYXON, which relays traffic over the agent's existing outbound tunnel.
- **One-time, time-bounded grants.** Each session is authorized individually and expires automatically (30 minutes by default).
- **Fixed target.** The proxy can only reach the specific service the agent published — it cannot be redirected to arbitrary hosts on the network.
- **Policy-gated.** Web access obeys the same [access policies](/customer/access-policies) as every other resource. If your role or site policy blocks HTTP access, the **Open Web →** button is disabled.

## Current limitations (v1)

Web HMI access works best with **standard web interfaces that use relative paths**. Two cases need extra handling and are on the roadmap:

- **Live/streaming widgets over WebSockets** are not proxied yet — the page loads, but real-time push elements may not update.
- **Single-page apps that request assets from absolute root paths** (`/app.js`) may need per-device subdomain proxying, planned for a later release.

For these cases, VNC remote access remains available as a fallback.

## When to use which

| You want to… | Use |
|--------------|-----|
| Reach the controller's **own web UI** | **Open Web →** (this feature) |
| See the **physical HMI screen** of a controller without a web UI | [Direct HMI / VNC](/customer/device-dashboard) |
| A generic remote desktop to the edge device | VNC |
