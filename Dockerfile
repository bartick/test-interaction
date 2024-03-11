FROM node:20.11.1

COPY . .

RUN npm install --omit=dev

ENTRYPOINT ["node", "/lib/main.js"]
