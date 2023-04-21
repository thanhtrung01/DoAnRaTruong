FROM node:16-alpine
WORKDIR /app
COPY . /back-end/
RUN yarn install --production
CMD ["yarn", "start"]
EXPOSE 4001