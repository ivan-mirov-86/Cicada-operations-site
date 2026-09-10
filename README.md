# Cicada Operations

Статический информационный сайт о платёжных QR-сценариях Cicada.

## Страницы

- `public/index.html` — главная страница.
- `public/payment-gateway.html` — зарезервированная пустая страница Payment Gateway.

## Локальный просмотр

```bash
python3 -m http.server 8080 --directory public
```

После запуска откройте `http://localhost:8080`.

## Деплой

Workflow `.github/workflows/deploy-pages.yml` публикует каталог `public` после
каждого push в ветку `main`.

В настройках репозитория GitHub выберите:

1. **Settings → Pages**.
2. **Source → GitHub Actions**.

Для Timeweb App Platform выберите тип `Frontend → HTML/CSS/JS`, ветку `main` и
укажите `/public` в поле «Путь до директории проекта».
