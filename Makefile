#To start these commands necessary to run this => /make -j 1 start/
start: 1 2 3 4 5 6 7 8
1:
	echo "Running docker-compose stop"
	docker-compose down
2:
	echo "Running docker-compose build"
	docker-compose -f docker-compose-dev.yml build
3:
	echo "Running docker-compose start"
	docker-compose -f docker-compose-dev.yml up -d
4:
	echo "Docker delete image"
	docker rmi kondrashev/articles:latest
5:
	echo "Docker authorization"
	docker login
6:
	echo "Docker rename image"
	docker tag articles-server:latest kondrashev/articles
7:
	echo "Docker push image"
	docker push kondrashev/articles
8:
	echo "Running webpack watch"
	npm run client
