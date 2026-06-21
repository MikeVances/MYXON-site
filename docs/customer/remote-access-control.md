# Controlling remote access

Remote access is a convenience — but on a production farm it must never be something you cannot switch off. MYXON gives you **two independent ways to allow or block remote access** to a device, and the local one always wins.

> **Screenshot:** *Device dashboard remote-access row showing a green "allowed" status with a "Disable" button, and the badge variants for "disabled locally" and "blocked from cloud".*

## Two levels of control

### Local control — on the device, sovereign

A person physically at the machine can disable remote access directly on the edge device, independent of the cloud. This is the **sovereign** control: when it says *no*, no one — not an operator in the portal, not anyone with cloud credentials — can open a remote session to that device.

It is meant for the situations where remote access must be physically guaranteed off: maintenance on live equipment, safety lockout, or a site policy that forbids outside connections during certain operations.

::: tip Why local wins
Safety and trust both require that the person standing next to the machine has the final say. A cloud account, however privileged, can never override a local block. This is the property large operators and holdings ask about first.
:::

### Cloud control — from the portal

From the device dashboard, an administrator can allow or block remote access remotely. This is the convenient day-to-day switch: disable a device you are not currently servicing, re-enable it when needed.

> **Screenshot:** *Remote-access row with the toggle button reading "Disable" (when currently allowed) / "Enable" (when blocked from cloud).*

## How the states combine

Remote access to a device is **allowed only when nothing is blocking it**. Any single block — local or cloud — is enough to deny access. The dashboard always shows you which one is in effect:

| Badge | Meaning |
|-------|---------|
| 🟢 **allowed** | Remote access is open |
| **disabled locally** | Blocked on the device itself — sovereign, cannot be overridden from the cloud |
| **blocked from cloud** | An administrator disabled it from the portal |

To re-open access, **every** active block must be cleared. If a device shows *disabled locally*, the cloud toggle alone will not restore access — someone has to re-enable it on the device.

## Who can change it

The cloud toggle is available to **administrators**. The local control is available to anyone with physical access to the edge device — by design, because it exists precisely for the people on site.

See [access policies](/customer/access-policies) for finer-grained control over *who* can do *what* once remote access is allowed.
