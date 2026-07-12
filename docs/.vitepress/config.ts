import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'MYXON',
  description: 'Remote access and monitoring platform for agricultural automation systems',

  // GitHub Pages project repo → assets served under /MYXON-site/
  base: '/MYXON-site/',

  head: [
    // favicon: head-ссылки НЕ проходят через withBase → путь с base вручную
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/MYXON-site/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#F26A1B' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'MYXON Docs' }],
    ['meta', { property: 'og:description', content: 'Remote access and monitoring for agricultural controllers' }],
  ],

  themeConfig: {
    logo: { light: '/logo-light.svg', dark: '/logo-dark.svg' },
    siteTitle: 'MYXON Docs',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/MikeVances/MYXON-site' },
    ],
    search: { provider: 'local' },
  },

  // ── i18n: English (root) + Russian (/ru/) ──────────────────────────────────
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/guide/what-is-myxon' },
          { text: 'Dealer', link: '/dealer/overview' },
          { text: 'Customer', link: '/customer/overview' },
          { text: 'OEM / SDK', link: '/oem/overview' },
          { text: 'Contact', link: '/contact' },
        ],
        sidebar: {
          '/guide/': [{
            text: 'Introduction',
            items: [
              { text: 'What is MYXON?', link: '/guide/what-is-myxon' },
              { text: 'Core concepts', link: '/guide/concepts' },
              { text: 'Two deployment scenarios', link: '/guide/scenarios' },
              { text: 'Where your data lives', link: '/guide/data-residency' },
              { text: 'Cloud or self-hosted', link: '/guide/deployment-options' },
            ],
          }],
          '/dealer/': [{
            text: 'Dealer Portal',
            items: [
              { text: 'Overview', link: '/dealer/overview' },
              { text: 'Register devices (Scenario 1)', link: '/dealer/register-devices' },
              { text: 'Activation codes (Scenario 2)', link: '/dealer/activation-codes' },
              { text: 'Invite customers', link: '/dealer/invite-customers' },
              { text: 'Fleet monitoring', link: '/dealer/fleet-monitoring' },
              { text: 'White-label & branded access', link: '/dealer/white-label' },
              { text: 'Multi-level park hierarchy', link: '/dealer/park-hierarchy' },
            ],
          }],
          '/customer/': [{
            text: 'Customer Portal',
            items: [
              { text: 'Overview', link: '/customer/overview' },
              { text: 'Claim a device (QR code)', link: '/customer/claim-device' },
              { text: 'Device dashboard', link: '/customer/device-dashboard' },
              { text: 'Web HMI in the browser', link: '/customer/web-access' },
              { text: 'Remote desktop & terminal (RDP/SSH)', link: '/customer/bastion' },
              { text: 'Cameras', link: '/customer/cameras' },
              { text: 'Custom dashboards', link: '/customer/dashboards' },
              { text: 'Remote access control', link: '/customer/remote-access-control' },
              { text: 'Locations', link: '/customer/locations' },
              { text: 'Alarms', link: '/customer/alarms' },
              { text: 'Notifications', link: '/customer/notifications' },
              { text: 'Access policies', link: '/customer/access-policies' },
            ],
          }],
          '/oem/': [{
            text: 'OEM / SDK Integration',
            items: [
              { text: 'Overview', link: '/oem/overview' },
              { text: 'Quick install', link: '/oem/install' },
              { text: 'Agent configuration', link: '/oem/agent-config' },
              { text: 'Activation code flow', link: '/oem/activation-flow' },
              { text: 'LAN auto-discovery', link: '/oem/lan-discovery' },
            ],
          }],
        },
        footer: {
          message: 'MYXON Platform · <a href="/MYXON-site/privacy">Privacy Policy</a>',
          copyright: 'Built for agricultural automation professionals',
        },
      },
    },

    ru: {
      label: 'Русский',
      lang: 'ru-RU',
      link: '/ru/',
      themeConfig: {
        nav: [
          { text: 'Руководство', link: '/ru/guide/what-is-myxon' },
          { text: 'Дилер', link: '/ru/dealer/overview' },
          { text: 'Клиент', link: '/ru/customer/overview' },
          { text: 'OEM / SDK', link: '/ru/oem/overview' },
          { text: 'Контакты', link: '/ru/contact' },
        ],
        sidebar: {
          '/ru/guide/': [{
            text: 'Введение',
            items: [
              { text: 'Что такое MYXON?', link: '/ru/guide/what-is-myxon' },
              { text: 'Ключевые понятия', link: '/ru/guide/concepts' },
              { text: 'Два сценария развёртывания', link: '/ru/guide/scenarios' },
              { text: 'Где ваши данные', link: '/ru/guide/data-residency' },
              { text: 'Облако или self-hosted', link: '/ru/guide/deployment-options' },
            ],
          }],
          '/ru/dealer/': [{
            text: 'Портал дилера',
            items: [
              { text: 'Обзор', link: '/ru/dealer/overview' },
              { text: 'Регистрация устройств (Сценарий 1)', link: '/ru/dealer/register-devices' },
              { text: 'Коды активации (Сценарий 2)', link: '/ru/dealer/activation-codes' },
              { text: 'Приглашение клиентов', link: '/ru/dealer/invite-customers' },
              { text: 'Мониторинг парка', link: '/ru/dealer/fleet-monitoring' },
              { text: 'White-label и брендированный вход', link: '/ru/dealer/white-label' },
              { text: 'Многоуровневая иерархия парка', link: '/ru/dealer/park-hierarchy' },
            ],
          }],
          '/ru/customer/': [{
            text: 'Портал клиента',
            items: [
              { text: 'Обзор', link: '/ru/customer/overview' },
              { text: 'Активация устройства (QR-код)', link: '/ru/customer/claim-device' },
              { text: 'Панель устройства', link: '/ru/customer/device-dashboard' },
              { text: 'Веб-HMI в браузере', link: '/ru/customer/web-access' },
              { text: 'Удалённый рабочий стол и терминал (RDP/SSH)', link: '/ru/customer/bastion' },
              { text: 'Камеры', link: '/ru/customer/cameras' },
              { text: 'Дашборды', link: '/ru/customer/dashboards' },
              { text: 'Управление удалённым доступом', link: '/ru/customer/remote-access-control' },
              { text: 'Локации', link: '/ru/customer/locations' },
              { text: 'Аварии', link: '/ru/customer/alarms' },
              { text: 'Уведомления', link: '/ru/customer/notifications' },
              { text: 'Политики доступа', link: '/ru/customer/access-policies' },
            ],
          }],
          '/ru/oem/': [{
            text: 'Интеграция OEM / SDK',
            items: [
              { text: 'Обзор', link: '/ru/oem/overview' },
              { text: 'Быстрая установка', link: '/ru/oem/install' },
              { text: 'Настройка агента', link: '/ru/oem/agent-config' },
              { text: 'Поток кодов активации', link: '/ru/oem/activation-flow' },
              { text: 'Авто-обнаружение в LAN', link: '/ru/oem/lan-discovery' },
            ],
          }],
        },
        footer: {
          message: 'Платформа MYXON · <a href="/MYXON-site/ru/privacy">Политика конфиденциальности</a>',
          copyright: 'Сделано для специалистов по автоматизации сельского хозяйства',
        },
        docFooter: { prev: 'Предыдущая', next: 'Следующая' },
        outline: { label: 'На этой странице' },
        lastUpdated: { text: 'Обновлено' },
        returnToTopLabel: 'Наверх',
        sidebarMenuLabel: 'Меню',
        darkModeSwitchLabel: 'Оформление',
        lightModeSwitchTitle: 'Переключить на светлую тему',
        darkModeSwitchTitle: 'Переключить на тёмную тему',
        langMenuLabel: 'Сменить язык',
      },
    },
  },

  markdown: {
    config: (md) => {
      // additional markdown-it plugins can be added here
    },
  },
})
