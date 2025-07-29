FROM node:23-alpine AS base

FROM base AS builder
ARG YARN_VERSION=4.7.0

RUN apk add --no-cache openssl
RUN corepack enable && corepack prepare yarn@$YARN_VERSION
RUN yarn global add turbo

WORKDIR /app

COPY . .
RUN turbo prune api --docker

FROM base AS installer
ARG YARN_VERSION=4.7.0

WORKDIR /app

RUN apk add --no-cache openssl
RUN corepack enable && corepack prepare yarn@$YARN_VERSION

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock /yarn.lock
RUN yarn install


COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN yarn generate

RUN yarn turbo run build --filter=api...

FROM installer AS production

ARG PORT=3001

WORKDIR /app

RUN apk add --no-cache openssl
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=installer --chown=nodejs:nestjs /app .
CMD sh -c "node apps/api/dist/main.js"

EXPOSE $PORT
