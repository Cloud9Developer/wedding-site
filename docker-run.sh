PORT=2345
docker build -t weddingsite .
docker stop `docker ps | grep ${PORT} | awk '{print $1}'`

docker run -d \
-p ${PORT}:80 \
--restart=unless-stopped \
weddingsite:latest