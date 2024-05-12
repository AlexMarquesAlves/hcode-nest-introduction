FROM node:alpine
WORKDIR /usr/src/api

COPY . .
COPY ./.env.production ./.env

RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "dev"]
