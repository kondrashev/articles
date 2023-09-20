# for start these commands nessasary to run this => /make -j 1 start/
start: 1 2 3 4
1:
	echo "Running docker compose stop"
	docker compose down
2:
	echo "Running webpack build"
	npm run build
3:
	echo "Running docker compose build"
	docker compose build
4:
	echo "Running docker compose start"
	docker compose up -d
