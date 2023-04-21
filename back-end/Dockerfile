FROM node:16-alpine
WORKDIR /app
COPY . .
RUN yarn install --production

EXPOSE 5000

ENV MONGODB_USERNAME thanhtrung
ENV MONGODB_PASSWORD thanhtrung

CMD ["yarn", "start"]
