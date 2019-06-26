FROM node:8-jessie
RUN npm install -g vue-cli
RUN npm install -g firebase-tools
WORKDIR /myapp
ENV HOST 0.0.0.0
EXPOSE 3000
USER node
COPY --chown=node:node . WORKDIR
