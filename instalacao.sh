#!/bin/bash
wget https://github.com/MedGuardian/MedGuardian-Systems/raw/Beralde-Individual/jarMedGuardian/target/jarMedGuardian-1.0-SNAPSHOT-jar-with-dependencies.jar

sudo apt-get update -y
sudo apt-get install default-jre -y

java -version

if [ $? = 0 ];

	then 
		 "Cliente possui JAR instalado!"

	else
		 "Cliente nao possui JAR instalado!"
		 "Instalando JAR!"

	sudo apt install openjdk-17-jre -y
	"Java Instalado!"
	 "Ate logo!"

fi

docker --version

if [ $? = 0 ];

	then 
		 "Cliente possui docker instalado!"

	else 	
		 "Cliente não possui docker instalado!"
		 "Instalando Docker!"

	
		sudo apt install docker.io -y
		sudo apt update && sudo apt upgrade -y
fi
mkdir Dock
cd Dock

wget https://github.com/MedGuardian/MedGuardian-Systems/raw/Beralde-Individual/scriptsql.sql

cd ..

cat<<EOL >> Dockerfile
FROM mysql:latest 
ENV MYSQL_ROOT_PASSWORD=root 
COPY ./Dock/ /docker-entrypoint-initdb.d/ 
EXPOSE 3306
EOL

sudo docker build -t meu-banco .
sudo docker run -d --name meu-container -p 3306:3306 meu-banco
