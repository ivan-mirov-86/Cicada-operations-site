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

Для пользовательского домена добавьте файл `public/CNAME`, содержащий только
имя домена, а затем настройте DNS у регистратора.
