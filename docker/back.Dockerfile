FROM node:18-alpine as building

WORKDIR /build

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ./sr-back/package*.json /build
RUN npm install --omit=dev --no-audit --no-fund

COPY ./sr-back /build
RUN npm run build

FROM node:18-alpine as production

WORKDIR /app

COPY --from=building ./build/dist/src/ /app
COPY --from=building ./build/node_modules /app/node_modules

CMD node main
