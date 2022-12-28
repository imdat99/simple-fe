FROM node:16.17.1 as builder

WORKDIR /frontend
ARG ENV_FILE

ENV NODE_ENV staging

COPY package.json .
COPY .env.production .

RUN npm install

COPY . .

# RUN echo "$ENV_FILE" > '.env'
# RUN echo "$ENV_FILE" > '.env.production'

RUN npm run build

FROM nginx:1.18-alpine as release

COPY ./conf.d/ /etc/nginx/conf.d/
COPY --from=builder /frontend/dist/ /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]
