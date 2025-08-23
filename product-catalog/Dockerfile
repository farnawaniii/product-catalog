FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY . .

# add netcat for waiting on mongo/es
RUN apk add --no-cache bash netcat-openbsd

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["docker-entrypoint.sh"]
