FROM node:12.18.2-alpine
ENV PRODUCTION true
WORKDIR /movie-craw
RUN npm i -g @nestjs/cli
COPY ./package.json .
COPY ./backend/package.json ./backend/package.json
RUN npm install
ADD . .
RUN npm run build
CMD ["npm", "--prefix", "backend", "run", "start:temp"]