FROM node
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["start:dev", "cross-env NODE_ENV=development nodemon ./server.js"]