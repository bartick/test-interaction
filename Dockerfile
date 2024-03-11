FROM node:20.11.1

WORKDIR /app

COPY . /app

RUN npm install --omit=dev

ENTRYPOINT ["node", "/app/lib/main.js"]
