# syntax=docker/dockerfile:1

#  -----------------------------------------------------------------------------;
#    Опциональный Docker-образ для разработки.
#    НЕ используется по умолчанию - обычный путь: npm install && npm run dev.
#    Этот образ - для тех, кто хочет изолировать Node/npm-окружение от хоста
#    (см. docker-compose.yml).
#
#    node:22-slim (а не alpine): @parcel/watcher и другие нативные зависимости
#    поставляются прекомпилированными под glibc - на Alpine (musl) пришлось бы
#    либо собирать их на лету (python3/make/g++ в образе), либо рисковать, что
#    прекомпилированного бинарника для musl просто нет.
#
#    Работаем под непривилегированным юзером (не root) - встроенный в образ
#    "node" (uid/gid 1000:1000 по умолчанию). Если UID/GID на хосте другой
#    (см. `id -u`/`id -g`), передайте их через --build-arg или UID/GID в .env
#    рядом с docker-compose.yml, иначе запись в примонтированный build/ с хоста
#    упрётся в permission denied.
#  -----------------------------------------------------------------------------;

FROM node:22-slim

ARG UID=1000
ARG GID=1000

# Образ уже содержит юзера node с uid/gid 1000:1000 - переименовываем,
# только если реально передали другие значения
RUN if [ "$UID" != "1000" ] || [ "$GID" != "1000" ]; then \
      groupmod -g "$GID" node && usermod -u "$UID" -g "$GID" node; \
    fi

WORKDIR /app
RUN chown "$UID:$GID" /app

USER node

# Кэшируем слой зависимостей отдельно от исходников
COPY --chown=$UID:$GID package.json package-lock.json ./

# npm ci - детерминированная установка строго по package-lock.json;
# cache mount ускоряет повторные docker build при правке зависимостей
RUN --mount=type=cache,target=/home/node/.npm,uid=$UID,gid=$GID npm ci

COPY --chown=$UID:$GID . .

EXPOSE 8080 3001

CMD ["npm", "run", "dev"]
