FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем и собираем
COPY . .
RUN npm run build

FROM node:16-alpine AS production
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/ecosystem.config.js ./

# Ставим зависимости пропуская dev
RUN npm i --omit=dev && npm i pm2 -g

# Копируем со сборкой
COPY --from=builder /app/dist ./dist/
EXPOSE 3000

# Команда запуска приложения
CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]