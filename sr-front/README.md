# Frontend Shared Rentals

## Разработка

### Запуск API и базы

Перед запуском необходимо создать файл окружения `sr-back/.env.local` со следующим содержимым

```.env
NODE_ENV=dev
```

После этого можно запустить контейнеры с бекендом командой:

```bash
$ docker compose -f docker/docker-compose.yaml up migrations db api --remove-orphans
```

Запуск бекенда без контейнера: см. [README бекенда](../sr-back/README.md)

### Разработка приложения

```bash
# Запуск в режиме разработки
npm run dev
```

Приложение будет доступно по адресу [http://localhost:5173](http://localhost:5173)

### Тестирование

_TODO_

### Полезные ресурсы

### Документация компонент

### Тестирование
