#To start these commands necessary to run this => /make -j 1 start/
start: 1 2 3 4 5 6 7 8
1:
	echo "Running docker-compose stop"
	docker-compose down
2:
	echo "Running webpack build"
	npm run build
3:
	echo "Running docker-compose build"
	docker-compose build
4:
	echo "Running docker-compose start"
	docker-compose -f docker-compose-dev.yml up -d
5:
	echo "Docker authorization"
	docker login
6:
	echo "Docker rename image"
	docker tag articles-node_backend:latest kondrashev/articles
7:
	echo "Docker push image"
	docker push kondrashev/articles
8:
	echo "Running webpack watch"
	npm run client
