FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY usuarios .
EXPOSE 8001
CMD ["npm", "start"]
