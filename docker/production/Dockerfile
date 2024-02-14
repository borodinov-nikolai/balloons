FROM node:18.0
ENV NODE_ENV=production

WORKDIR /app/

COPY ./ ./

RUN yarn install
RUN yarn build