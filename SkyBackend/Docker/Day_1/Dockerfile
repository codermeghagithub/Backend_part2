# FROM ubuntu:latest


# RUN  apt-get updateimage creation 
# RUN apt install -y curl
# RUN curl -sL https://deb.nodesource.com/setup_22.x -o/tmp/nodesource_setup.sh
# RUN  bash /tmp/nodesource_setup.sh
# RUN apt install -y nodejs

# COPY index.js /home/app/index.js
# COPY package.json /home/app/package.json
# COPY package-lock.json /home/app/package-lock.json

# WORKDIR /home/app
# RUN npm install

# CMD ["npm","start"]


#  ** Optimized way to crate IMAGE 
#  ** BASE IMAGE 
FROM node:20.17.0-alpine3.19

WORKDIR /home/app

# **INSTALL Node
# Do not need any intallation 

# **  Coping the sourse code to docker image 

COPY package*.json .
COPY Dockerfile Dockerfile
# **Install dependencies
RUN npm install

COPY index.js index.js

EXPOSE 3000
CMD ["npm","start"]
