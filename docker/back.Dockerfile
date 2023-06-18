FROM node:18-alpine as building

WORKDIR /build

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ./sr-back/package*.json ./
RUN npm install --omit=dev --no-audit --no-fund

COPY ./sr-back ./
RUN npm run build

FROM node:18-alpine as migration

WORKDIR /app

COPY --from=building /build/dist/migrations/*.js /app/migrations/
COPY --from=building ./build/dist/config /app/config
COPY --from=building /build/dist/ormconfig.js /app
COPY --from=building ./build/node_modules /app/node_modules

CMD npx typeorm -d ormconfig.js migration:run

FROM node:18-alpine as production

WORKDIR /

RUN apk --no-cache add curl

COPY --from=building ./build/dist/src/ /app
COPY --from=building ./build/dist/config /config
COPY --from=building ./build/node_modules /node_modules

HEALTHCHECK --interval=3s --timeout=3s --start-period=1s --retries=3 CMD curl -f http://localhost:3000/status || exit 1
EXPOSE 3000
CMD node app/main
