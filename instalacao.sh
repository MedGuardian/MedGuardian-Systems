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

touch tabelas.sql
cat<<EOL >> tabelas.sql
 DROP DATABASE IF EXISTS medguardian ;
 CREATE DATABASE medguardian ;
 USE medguardian ;

CREATE TABLE IF NOT EXISTS computador( 
 	idComputador INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
 	nomeComputador VARCHAR(255) NOT NULL, 
 	sistemaOperacional VARCHAR(255) NOT NULL 
); 

CREATE TABLE IF NOT EXISTS componente( 
 	idComponente INT AUTO_INCREMENT NOT NULL, 
 	tabelas.sql >>	nomeComponente VARCHAR(225) NOT NULL, 
 	PRIMARY KEY (idComponente)
); 

CREATE TABLE IF NOT EXISTS especificacao( 
 	idEspecificacao INT AUTO_INCREMENT PRIMARY KEY NOT NULL, 
 	fkComputador INT NOT NULL,
 	fkComponente INT NOT NULL, 
 	totalComponente DECIMAL(6,2) NULL, 
 	CONSTRAINT fk_computador_especificacao FOREIGN KEY (fkComputador) 
 	REFERENCES computador(idComputador), 
 	CONSTRAINT fk_componente_especificacao FOREIGN KEY (fkComponente) 
	tabelas.sql >>	REFERENCES componente(idComponente) 
); 

CREATE TABLE IF NOT EXISTS registro( 
 	idregistro INT AUTO_INCREMENT NOT NULL, 
 	dataHoraRegistro DATETIME NOT NULL, 
 	registro DECIMAL(6,2) NOT NULL, 
 	tabelas.sql >>	tipoCaptura VARCHAR(255) NULL, 
 	tabelas.sql >>	fkEspecificacao INT NOT NULL, 
 	PRIMARY KEY (idregistro) 
); 
EOL
cd ..

cat<<EOL >> Dockerfile
 FROM mysql:latest 
 ENV MYSQL_ROOT_PASSWORD=root 
 COPY ./Dock/ /docker-entrypoint-initdb.d/ 
 EXPOSE 3306 /
EOL

sudo docker build -t meu-banco .
sudo docker run -d --name meu-container -p 3306:3306 meu-banco
sudo docker start meu-container