FROM node:10

ADD . /src
WORKDIR /src

RUN yarn && yarn cache clean

RUN yarn build
RUN yarn migrate

EXPOSE 3000

CMD ["yarn", "start"]
