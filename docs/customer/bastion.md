# Remote Desktop & Terminal (RDP / SSH)

Open a Windows HMI panel or a Linux edge device **directly in your browser** — no RDP client, no PuTTY, no VPN software to install. Everything runs in a browser tab through a secure, audited session.

> **Screenshot:** *Device dashboard "Bastion (RDP / SSH)" card listing two targets: "Panel PC (RDP · 3389)" and "Edge gateway (SSH · 22)", each with a Connect button.*

## When to use it

| Target | Protocol | Typical use |
|--------|----------|-------------|
| Windows HMI / panel PC | **RDP** | Full desktop of the operator panel — configure the controller software, view SCADA |
| Linux edge / gateway | **SSH** | Terminal access for diagnostics and maintenance |

This complements the [Web HMI](/customer/web-access) (for the vendor's web interface) and [VNC](/customer/device-dashboard) (for screen mirroring) — RDP/SSH give you a full desktop or shell.

## How to connect

1. Open the [device dashboard](/customer/device-dashboard) and find the **Bastion (RDP / SSH)** section.
2. Click **Connect** on the target you need.
3. Enter the machine's credentials in the form:
   - **RDP:** username, password, and (optionally) Windows domain.
   - **SSH:** username, and either a password or a private key.
4. The session opens in the browser. Mouse and keyboard work as if you were sitting in front of the machine.

> **Screenshot:** *Credentials modal for RDP: Username, Password, and Domain fields, with a "Connect" button.*

::: info Your credentials stay protected
The machine credentials you enter are used to open the session and are **never stored in your browser** and **never travel across the connection to your screen** — the platform injects them into the session on the server side.
:::

## Access control

RDP and SSH are gated by your [access policy](/customer/access-policies) — an admin decides which users may open remote-desktop or terminal sessions. If a target shows **"restricted"**, your role or site policy doesn't permit it.

By default these are available to admin and engineer roles (the people who service the panels), not to view-only accounts.

## Requirements

- The device must be **online**.
- The panel/edge machine must be reachable on the site's local network and expose RDP (3389) or SSH (22).
- The service must be published as a resource on the device (your dealer/installer configures this).

→ Next: [Cameras](/customer/cameras) · [Access policies](/customer/access-policies)
