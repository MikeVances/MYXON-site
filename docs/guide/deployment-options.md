# Deployment: cloud or self-hosted

MYXON is one platform with two ways to run it. Same codebase, same features — the difference is **where it lives** and **who operates it**. Pick the one that matches your data policy.

> Not to be confused with the [two business scenarios](/guide/scenarios) (MYXON Box vs OEM agent) — that's about *who installs the agent*. This page is about *where the server runs*.

## At a glance

| | **Cloud (managed by MYXON)** | **Self-hosted (your infrastructure)** |
|---|---|---|
| Who runs the server | We do | You do — in your own perimeter |
| Where your data sits | On our hosting | Entirely on your hardware |
| Best for | Dealers, SMB, anyone who wants zero ops | Holdings with a strict *"our data stays with us"* policy |
| Setup effort | None — sign in and go | You deploy the stack (we provide images + runbook) |
| Updates | We handle them | You pull releases (signed) |
| Isolated / air-gapped | — | Supported, with an offline licence |

## Cloud — managed by MYXON

We host the entire stack; you just sign in. Fastest path to value, zero operational burden — no servers to run, no updates to apply, no database to back up. The natural choice for dealers and for customers who don't have a sovereignty requirement.

## Self-hosted — on your own infrastructure

The whole stack — tunnel server, access gateways, backend, database — runs **on your hardware, inside your network**. Your database, your keys, your backups. Access sessions are terminated on *your* servers, so controller data never leaves your perimeter. For fully isolated environments, an offline licence means the platform never needs to call out.

This is the answer to *"our data must stay with us"* that cloud tunnel services (the ngrok/CloudPub family) cannot give — they are SaaS by definition. See [**Where your data lives**](/guide/data-residency) for the exact data-flow picture.

Self-hosting is an **enterprise capability**, not a discount tier: it carries the sovereignty and support that large holdings require. Talk to us about the right fit for your fleet size.

## Same product either way

Whichever you choose, you get the same MYXON: outbound-only tunnel, Web HMI, remote desktop, cameras, multi-level park hierarchy, alarms and notifications, role-based access. The deployment model changes *where the data lives* — not *what the platform does*.
