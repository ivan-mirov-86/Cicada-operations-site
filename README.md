# Информационный портал

Статическая стартовая страница с автоматическим деплоем в GitHub Pages.

## Локальный просмотр

```bash
python3 -m http.server 8080 --directory public
```

После запуска откройте `http://localhost:8080`.

## Деплой

Workflow `.github/workflows/deploy-pages.yml` публикует содержимое каталога
`public` после каждого push в ветку `main`.

В настройках репозитория GitHub выберите:

1. **Settings → Pages**.
2. **Source → GitHub Actions**.

Пользовательский домен задан в `public/CNAME`:

`ivan-mirov-86-cicada-payments-com-2168.twc1.net`

Для работы домена его DNS-запись CNAME должна указывать на
`ivan-mirov-86.github.io`.
