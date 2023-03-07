
FROM node:16-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["npm", "start"]
EXPOSE 5000