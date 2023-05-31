# Shared Rentals Backend

## Разработка

### Переопределение .env

Создать файл `.env.local`
Переопределить конкретные переменные (не обязательно все)

### Запуск фронтенда

```bash
# run frontend manually from sources
$ cd sr-front

$ npm install && npm run dev
```

Приложение будет доступно по адресу [http://localhost:5173](http://localhost:5173)

### Запуск базы данных

```bash
$ docker compose -f docker/docker-compose.yaml up db
```

База данных будет доступна по адресу `localhost:5432`

### Разработка API

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Тестирование

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Полезные ресурсы

_Как создавать ресурсы через `nest cli`_

```bash
$ nest g resource <resource_name>

```

Подробнее по ссылке: [CRUD generator](https://docs.nestjs.com/recipes/crud-generator)

---

_Миграции при помощи `typeorm`_

Документация по работе с миграциями: [https://typeorm.io/migrations](https://typeorm.io/migrations)

```bash
# create migration
$ typeorm migration:create ./path-to-migrations-dir/PostRefactoring

# run migration
$ typeorm -d ormconfig.ts migration:run

# revert migration
$ typeorm -d ormconfig.ts migration:revert
```

Так же миграции можно создавать автоматически, на основе изменений в схеме БД: [generating migrations](https://typeorm.io/migrations#generating-migrations)

```bash
$ typeorm -d ormconfig.ts migration:generate
```

### Документация компонент

- [NestJS](https://docs.nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeScript](https://www.typescriptlang.org/)
