#!/bin/bash

git clone https://github.com/MedGuardian/MedGuardian-Systems.git

wget https://github.com/MedGuardian/MedGuardian-Systems/raw/Beralde-Individual/jarMedGuardian/target/jarMedGuardian-1.0-SNAPSHOT-jar-with-dependencies.jar



sudo apt-get update -y
sudo apt-get install default-jre -y

java -version

if [ $? = 0 ];

	then 
		echo "Cliente possui JAR instalado!"

	else
		echo "Cliente nao possui JAR instalado!"
		echo "Instalando JAR!"

	sudo apt install openjdk-17-jre -y
	echo"Java Instalado!"
	echo "Ate logo!"

fi

docker --version

if [ $? = 0 ];

	then 
		echo "Cliente possui docker instalado!"

	else 	
		echo "Cliente não possui docker instalado!"
		echo "Instalando Docker!"

	
		sudo apt install docker.io -y
		sudo apt update && sudo apt upgrade -y
fi
mkdir Dock
cd Dock

touch tabelas.sql
echo tabelas.sql >> DROP DATABASE IF EXISTS medguardian;
echo tabelas.sql >> CREATE DATABASE medguardian;
echo tabelas.sql >> USE medguardian;

echo tabelas.sql >> CREATE TABLE IF NOT EXISTS computador (
echo tabelas.sql >> idComputador INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
echo tabelas.sql >> nomeComputador VARCHAR(255) NOT NULL,
echo tabelas.sql >> sistemaOperacional VARCHAR(255) NOT NULL
echo tabelas.sql >> );

echo tabelas.sql >> CREATE TABLE IF NOT EXISTS componente (
echo tabelas.sql >> idComponente INT AUTO_INCREMENT NOT NULL,
echo tabelas.sql >>	nomeComponente VARCHAR(225) NOT NULL,
echo tabelas.sql >> PRIMARY KEY (idComponente));

echo tabelas.sql >> CREATE TABLE IF NOT EXISTS especificacao(
echo tabelas.sql >> idEspecificacao INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
echo tabelas.sql >> fkComputador INT NOT NULL,
echo tabelas.sql >> fkComponente INT NOT NULL,
echo tabelas.sql >> totalComponente DECIMAL(6,2) NULL,
echo tabelas.sql >> CONSTRAINT fk_computador_especificacao FOREIGN KEY (fkComputador)
echo tabelas.sql >> REFERENCES computador(idComputador),
echo tabelas.sql >> CONSTRAINT fk_componente_especificacao FOREIGN KEY (fkComponente)
echo tabelas.sql >>	REFERENCES componente(idComponente)
echo tabelas.sql >> );

echo tabelas.sql >> CREATE TABLE IF NOT EXISTS registro (
echo tabelas.sql >> idregistro INT AUTO_INCREMENT NOT NULL,
echo tabelas.sql >> dataHoraRegistro DATETIME NOT NULL,
echo tabelas.sql >> registro DECIMAL(6,2) NOT NULL,
echo tabelas.sql >>	tipoCaptura VARCHAR(255) NULL,
echo tabelas.sql >>	fkEspecificacao INT NOT NULL,
echo tabelas.sql >> PRIMARY KEY (idregistro)
echo tabelas.sql >> );

cd ..
touch Dockerfile
echo Dockerfile >> FROM mysql:latest
echo Dockerfile >> ENV MYSQL_ROOT_PASSWORD=root
echo Dockerfile >> COPY ./Dock/ /docker-entrypoint-initdb.d/
echo Dockerfile >> EXPOSE 3306


sudo docker build -t meu-banco .

sudo docker run -d --name meu-container -p 3306:3306 meu-banco

sudo docker start meu-container


