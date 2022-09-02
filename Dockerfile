# ==============================================================================
# SETUP STAGE
# ==============================================================================

FROM node:16-alpine3.14 AS setup

# Create and change to the app directory.
WORKDIR /src

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

RUN npm ci


# ==============================================================================
# BUILD STAGE
# ==============================================================================

FROM node:16-alpine3.14 AS build

# Create and change to the app directory.
WORKDIR /src

COPY --from=setup /src/node_modules /src/node_modules
COPY . .

RUN npm run build

# ==============================================================================
# OPTIMIZATION STAGE
# ==============================================================================

FROM ubuntu:20.04 AS optimization

# Create and change to the app directory.
WORKDIR /src

COPY --from=build /src/dist/dz-dialect-app /src/dist/dz-dialect-app

RUN gzip -k -r /src/dist/dz-dialect-app

# ==============================================================================
# PRODUCTION STAGE
# ==============================================================================

# production environment
FROM nginx:1.13.9-alpine

RUN \
  rm -rf /etc/nginx/conf.d && \
  mkdir -p /etc/nginx/conf.d

COPY ./default.conf /etc/nginx/conf.d/
COPY --from=optimization /src/dist/dz-dialect-app /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
