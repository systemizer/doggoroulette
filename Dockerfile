# specify the node base image with your desired version node:<version>
FROM node:10
# replace this with your application's default port
EXPOSE 8080

COPY . /

RUN cd frontend && yarn install && yarn build
RUN cd backend && yarn install

WORKDIR /backend
CMD ["yarn", "start"]