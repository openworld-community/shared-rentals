# 🏡 Shared Rentals

## Структура проекта

- sr-front - фронтенд приложение
- sr-back - бэкенд API
- configs - файлы конфигурации для nginx, базы
- docker - докерфайлы и docker-compose

## Стек проекта

### Frontend

- vite
- typescript
- react
- tailwind
- rtk query

### Backend

- nodejs
- typescript
- [nestjs](https://nestjs.com/)
- [typeorm](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)

## Инструкции по разработке

- [Frontend](./sr-front/README.md)
- [Backend](./sr-back/README.md)

## Документация API

Доступна через Swagger UI: [http://localhost:3000/api](http://localhost:3000/api)

Для доступа необходимо запустить бекенд и базу командой из инструкции: [sr-front/README.md](sr-front/README.md)
