FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем и собираем
COPY . .
RUN npm run build

FROM nginx:latest AS production
COPY --from=builder /app/build /usr/share/nginx/html/
COPY ./nginx/default.conf /etc/nginx/conf.d/
EXPOSE 80

# Команда запуска приложения
CMD ["nginx", "-g", "daemon off;"]