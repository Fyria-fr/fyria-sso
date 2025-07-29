FROM node:23-alpine AS base

ARG VITE_API_URL=http://localhost:3000

FROM base AS builder
ARG YARN_VERSION=4.7.0

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare yarn@$YARN_VERSION
RUN apk update
RUN yarn global add turbo

WORKDIR /app

COPY . .
RUN turbo prune dashboard --docker

FROM base AS installer
ARG YARN_VERSION=4.7.0

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare yarn@$YARN_VERSION
RUN apk update

WORKDIR /app

ENV VITE_API_URL=${VITE_API_URL}

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install


COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN yarn turbo build --filter=dashboard...

FROM nginx:1.27.4-alpine-slim AS production

COPY --from=installer /app/apps/dashboard/dist ./var/www/html/
COPY --from=builder /app/apps/dashboard/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx","-g","daemon off;"]

EXPOSE 80

