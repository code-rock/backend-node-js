FROM node:alpine
WORKDIR /code

COPY package*.json ./
RUN npm install
COPY ./src/* ./src ./
COPY ./views/* ./views ./
COPY ./public/* ./public ./

EXPOSE 3000

CMD ["npm", "start"]