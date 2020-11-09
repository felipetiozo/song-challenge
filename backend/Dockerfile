FROM node:12-alpine AS runtime

#
# Copy package specs to install
#
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

#
# Install dependencies
#
RUN export NODE_ENV=production
RUN cd app && yarn install

#
# Copy app data
#
COPY . /app

RUN cd app && yarn build

#
# Runtime specifics
#
EXPOSE 80 443
WORKDIR /app

CMD ["node", "./dist/server.js"]
