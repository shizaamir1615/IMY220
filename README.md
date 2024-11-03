docker build -t imyproject .
docker run --name express -p 3000:3000 imyproject
docker stop express
docker rm express




