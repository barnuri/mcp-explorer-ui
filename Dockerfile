FROM node as builder   
WORKDIR /app   
COPY package*.json ./
RUN npm i    
COPY . .   
ARG CONFIG_PATH   
ENV CONFIG_PATH $CONFIG_PATH   
RUN npm run build   
CMD ["npm", "start"]
