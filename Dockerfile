FROM node:alpine
WORKDIR /usr/src/api

COPY . .
COPY ./.env.production ./.env

RUN yarn install
RUN yarn run build

EXPOSE 3000
CMD ["yarn", "run", "dev"]
