# Custom Dashboards

Build your own overview pages from **cards** — live values, trend charts, images, and notes — laid out however you like. Put the numbers that matter for your operation on one screen.

> **Screenshot:** *A dashboard titled "Greenhouse overview" with a grid of cards: a large temperature value, a humidity trend sparkline, a floor-plan image, and a text note.*

## Card types

| Card | Shows |
|------|-------|
| **Value** | A single number from a device metric — latest reading, or an aggregate (average, min, max) over a period |
| **Trend** | A sparkline of a metric over time |
| **Image** | Any image by URL — a floor plan, a photo, a diagram |
| **Note** | Free text — labels, instructions, reminders |

Value and trend cards read from your [device metrics](/customer/device-dashboard) (logging must be enabled on the device).

## Building a dashboard

1. Open **Dashboards** from the left menu.
2. Click **New** and give the dashboard a name.
3. Click **Edit** to enter edit mode.
4. Use **Add card** to drop in the card types you need.
5. **Drag** cards to move them and **resize** by the corner.
6. Click the **gear** on a card to configure it (pick a device + metric for value/trend, a URL for an image, text for a note).
7. Click **Save**.

> **Screenshot:** *Dashboard in edit mode: a palette of "Add card" buttons at the top, cards with drag handles and a gear/delete overlay.*

## Availability metrics

A value card can show **uptime %** — the share of time a parameter stayed within a set threshold over the period. It's a simple, at-a-glance health indicator for a piece of equipment (a proxy for availability).

## Who can edit

Anyone in your organisation can **view** dashboards. **Editing** (create, change layout, delete) is available to admin roles. Dashboards are scoped to your organisation and can be tied to a specific site or device.

→ Next: [Device dashboard](/customer/device-dashboard) · [Alarms](/customer/alarms)
