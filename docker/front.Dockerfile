FROM node:18-alpine as building

WORKDIR /app

COPY sr-front/package*.json ./
RUN npm install --no-audit --no-fund

COPY ./sr-front ./

RUN npm run build
RUN rm -rf /app/node_modules && npm cache clean --force

FROM nginx:alpine

COPY --from=building /app/dist /usr/share/nginx/html
COPY configs/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
