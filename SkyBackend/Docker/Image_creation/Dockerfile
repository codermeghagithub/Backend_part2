# ** Use Node.js Alpine image

FROM node:20.17.0-alpine3.19

# **set WORKING DIRECTORY
WORKDIR /home/app
# ** INSTALL Node
# Do not need any installation
COPY package*.json ./


# ** Install dependencies
RUN npm install

# ** Copy the source code to docker image
COPY . .

# Expose port for Vite development server

EXPOSE 5173

CMD ["npm","run","dev","--","--host"]


