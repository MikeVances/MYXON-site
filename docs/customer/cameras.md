# Cameras

Watch the cameras on your site — greenhouses, barns, sheds, machine rooms — **right in the browser**, through the same secure connection you use for controllers. No separate camera app, no port forwarding on the site's router.

> **Screenshot:** *Device dashboard "Cameras" card listing "Greenhouse 1 (RTSP)" and "Barn entrance (RTSP)", each with a Watch button.*

## How to view a camera

1. Open the [device dashboard](/customer/device-dashboard) and find the **Cameras** section.
2. Click **Watch** on the camera you want to see.
3. The live view opens in the browser.

For most cameras that's all you need. If a camera requires a specific stream path or login, click the **…** button next to it and fill in:

- **RTSP path** (e.g. `/stream1` or the vendor's channel path)
- **Username / password** (optional)

> **Screenshot:** *Camera credentials form: RTSP path, Username, Password — all optional.*

::: info How the video reaches you
Cameras stream over the site's local network to the on-site agent, which forwards the video through the secure tunnel to the platform. You never expose the camera to the internet, and the camera's login is never stored in your browser.
:::

## Access control

Camera viewing is gated by your [access policy](/customer/access-policies) (`allow camera access`). If a camera shows **"restricted"**, your role or site policy doesn't permit it.

## Requirements

- The device must be **online**.
- The camera must be an **RTSP** IP camera reachable on the site's local network.
- The camera must be published as a resource on the device (your dealer/installer configures this, including the stream path if the camera needs one).

::: tip Bandwidth on slow uplinks
Live video uses more of the site's internet upload than controller data does. On sites with limited connectivity (e.g. 4G), the platform favours a lightweight live view so monitoring stays responsive.
:::

→ Next: [Remote desktop & terminal](/customer/bastion) · [Custom dashboards](/customer/dashboards)
