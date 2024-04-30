FROM node:alpine
WORKDIR /usr/src/api

COPY ./ ./
COPY ./.env.production ./.env

RUN yarn install --quiet --no-optional --no-fund --loglevel=error
RUN yarn run build


CMD ["yarn", "run", "start:prod"]
