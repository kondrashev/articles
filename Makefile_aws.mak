#To start these commands necessary to run this => /make -f Makefile_aws.mak -j 1 start/
start: 1 2 3 4
1:
	echo "Remove all containers from ec2"
	sudo docker-compose down
2:
	echo "Remove the image of project from ec2"
	sudo docker rmi kondrashev/articles:latest
3:
	echo "Run all containers from ec2"
	sudo docker-compose up -d
4:
	echo "Check status all containers all from ec2"
	sudo docker ps -a