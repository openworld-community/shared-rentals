# Frontend Shared Rentals

## Разработка

### Запуск API и базы

```bash
# Запуск контейнера с API и базой данных
$ docker compose -f docker/docker-compose.yaml up db api --remove-orphans
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
