FROM nginx:1.18-alpine as release

COPY conf.d/ /etc/nginx/conf.d/
COPY ./dist/ /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]
