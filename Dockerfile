FROM node:14.17-alpine

ENV PORT 3000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
# RUN yarn && yarn cache clean
RUN yarn

COPY . /usr/src/app

EXPOSE 3000

CMD ["yarn", "dev"]
