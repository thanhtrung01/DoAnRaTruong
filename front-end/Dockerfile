FROM node:16-alpine
WORKDIR /client
COPY . .
RUN yarn install --production
CMD ["yarn", "start"]
EXPOSE 4001