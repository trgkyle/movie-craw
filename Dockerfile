FROM node:12.18.2-alpine
ENV PRODUCTION true
WORKDIR /movie-craw
COPY ./package.json .
COPY ./backend/package.json ./backend/package.json
RUN npm install
ADD . .
CMD ["npm", "--prefix", "backend", "run", "start:temp"]