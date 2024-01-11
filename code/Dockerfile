FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@8.11.0
COPY . /app
WORKDIR /app

FROM base AS build

ARG VERSION
ENV VITE_VERSION=${VERSION}

ARG BASE_PATH
ENV BASE_PATH=${BASE_PATH}
ENV VITE_BASE_PATH=${BASE_PATH}

ARG BASE_URL
ENV VITE_BASE_URL=${BASE_URL}

ARG SHARE_URL
ENV VITE_SHARE_URL=${SHARE_URL}

RUN --mount=type=cache,id=pnpm install
RUN pnpm --version
RUN pnpm run build

FROM base
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/.output /app/.output
CMD [ "pnpm", "start" ]