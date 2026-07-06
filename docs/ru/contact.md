---
title: Контакты
---

<script setup>
import { ref } from 'vue'

// Публичная дверь backend через Tailscale Funnel (self-hosted; заявки в нашу платформу).
const API = 'https://hyper-myxon.taile34f93.ts.net'

const form = ref({ name: '', email: '', company: '', role: '', message: '', website: '' })
const state = ref('idle') // idle | sending | ok | error
const errorMsg = ref('')

async function submit() {
  state.value = 'sending'
  errorMsg.value = ''
  try {
    const res = await fetch(API + '/api/v0/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })
    if (!res.ok) {
      errorMsg.value = res.status === 429
        ? 'Слишком много отправок — попробуйте позже.'
        : 'Не удалось отправить. Проверьте поля и попробуйте снова.'
      state.value = 'error'
      return
    }
    state.value = 'ok'
  } catch (e) {
    errorMsg.value = 'Ошибка сети — попробуйте снова.'
    state.value = 'error'
  }
}
</script>

# Связаться с нами

Интересует MYXON — как **дилеру**, **системному интегратору** или **фермеру**?
Напишите нам, и мы свяжемся с вами.

<div v-if="state === 'ok'" class="contact-ok">
  ✅ Спасибо — ваше сообщение получено. Мы свяжемся с вами.
</div>

<form v-else class="contact-form" @submit.prevent="submit">
  <label>Имя<span>*</span>
    <input v-model="form.name" required maxlength="120" />
  </label>
  <label>Email<span>*</span>
    <input v-model="form.email" type="email" required maxlength="200" />
  </label>
  <label>Компания
    <input v-model="form.company" maxlength="200" />
  </label>
  <label>Вы…
    <select v-model="form.role">
      <option value="">—</option>
      <option value="dealer">Дилер</option>
      <option value="integrator">Системный интегратор</option>
      <option value="farmer">Фермер</option>
      <option value="other">Другое</option>
    </select>
  </label>
  <label>Сообщение<span>*</span>
    <textarea v-model="form.message" required maxlength="5000" rows="5"></textarea>
  </label>

  <!-- Honeypot: скрыто от людей; боты заполняют и тихо отбрасываются -->
  <input v-model="form.website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />

  <div v-if="state === 'error'" class="contact-err">{{ errorMsg }}</div>

  <button type="submit" :disabled="state === 'sending'">
    {{ state === 'sending' ? 'Отправляем…' : 'Отправить сообщение' }}
  </button>
</form>

<style scoped>
.contact-form { display: flex; flex-direction: column; gap: 14px; max-width: 560px; margin-top: 24px; }
.contact-form label { display: flex; flex-direction: column; gap: 6px; font-weight: 500; font-size: 14px; }
.contact-form label span { color: #dc2626; }
.contact-form input, .contact-form select, .contact-form textarea {
  border: 1px solid var(--vp-c-border); border-radius: 8px; padding: 9px 12px; font-size: 15px;
  background: var(--vp-c-bg); color: var(--vp-c-text-1);
}
.contact-form .hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
.contact-form button {
  align-self: flex-start; background: var(--vp-c-brand-1); color: #fff; border: 0;
  border-radius: 8px; padding: 10px 20px; font-weight: 600; cursor: pointer;
}
.contact-form button:disabled { opacity: .6; cursor: default; }
.contact-ok { margin-top: 24px; padding: 16px; border-radius: 8px;
  background: var(--vp-c-green-soft); color: var(--vp-c-green-1); font-weight: 500; }
.contact-err { color: #dc2626; font-size: 14px; }
</style>
