FROM node:12-alpine

WORKDIR /usr/src/app

COPY client/package.json ./
COPY client/package-lock.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY client/ .

EXPOSE 8080
CMD [ "npm", "run", "serve" ]
