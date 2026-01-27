FROM node:14-alpine

WORKDIR /usr/app

# Install some dependencies
COPY ./package.json ./
# COPY ./ ./
RUN npm install
COPY ./ ./

# Default command
CMD ["npm", "start"]