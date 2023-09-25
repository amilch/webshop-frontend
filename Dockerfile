FROM node:latest as build-stage

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# COPY package*.json ./
# RUN npm install

CMD ["npm", "run", "dev"]
