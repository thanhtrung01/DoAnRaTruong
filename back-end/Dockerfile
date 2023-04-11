FROM node:14-alpine

WORKDIR /app

RUN chown node:node /app

COPY --chown=node:node package*.json ./

USER node

RUN npm ci --quiet --production

COPY --chown=node:node . .

EXPOSE 8005

ENV MONGODB_USERNAME thanhtrung
ENV MONGODB_PASSWORD thanhtrung

CMD ["npm", "start"]
