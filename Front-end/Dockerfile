#1. Base Image

#2. Working Dir

#3. Bring all files

#4. Run installer

#5. Defaults CMD

FROM node:15.4 as build

WORKDIR /reactblog

COPY package*.json .

RUN yarn install

COPY . .

RUN yarn run build

FROM nginx:1.19

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /reactblog/build /usr/share/nginx/html


