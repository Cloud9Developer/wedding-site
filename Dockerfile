#builder image
FROM node:trixie-slim AS builder

WORKDIR /app

RUN echo "run2"

COPY . .

RUN npm install && npm install -g gulp-cli gulp-terser

RUN gulp

# serve website
FROM nginx:alpine
# Copy your static files into the default NGINX web root
COPY --from=builder /app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]