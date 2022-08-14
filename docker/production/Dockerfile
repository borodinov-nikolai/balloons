FROM node:16
ENV NODE_ENV=production

WORKDIR /app/

COPY ./ ./

RUN yarn install
RUN yarn build
