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
echo DROP DATABASE IF EXISTS medguardian >> tabelas.sql;
echo CREATE DATABASE medguardian >> tabelas.sql;
echo USE medguardian >> tabelas.sql;

echo CREATE TABLE IF NOT EXISTS computador( 
 idComputador INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
 nomeComputador VARCHAR(255) NOT NULL, 
 sistemaOperacional VARCHAR(255) NOT NULL 
 ); >> tabelas.sql;

echo CREATE TABLE IF NOT EXISTS componente( >> tabelas.sql;
echo idComponente INT AUTO_INCREMENT NOT NULL, >> tabelas.sql;
echo tabelas.sql >>	nomeComponente VARCHAR(225) NOT NULL, >> tabelas.sql;
echo PRIMARY KEY (idComponente)); >> tabelas.sql;

echo CREATE TABLE IF NOT EXISTS especificacao( >> tabelas.sql;
echo idEspecificacao INT AUTO_INCREMENT PRIMARY KEY NOT NULL, >> tabelas.sql;
echo fkComputador INT NOT NULL, >> tabelas.sql;
echo fkComponente INT NOT NULL, >> tabelas.sql;
echo totalComponente DECIMAL(6,2) NULL, >> tabelas.sql;
echo CONSTRAINT fk_computador_especificacao FOREIGN KEY (fkComputador) >> tabelas.sql;
echo REFERENCES computador(idComputador), >> tabelas.sql;
echo CONSTRAINT fk_componente_especificacao FOREIGN KEY (fkComponente) >> tabelas.sql;
echo tabelas.sql >>	REFERENCES componente(idComponente) >> tabelas.sql;
echo ); >> tabelas.sql;

echo CREATE TABLE IF NOT EXISTS registro( >> tabelas.sql;
echo idregistro INT AUTO_INCREMENT NOT NULL, >> tabelas.sql;
echo dataHoraRegistro DATETIME NOT NULL, >> tabelas.sql;
echo registro DECIMAL(6,2) NOT NULL, >> tabelas.sql;
echo tabelas.sql >>	tipoCaptura VARCHAR(255) NULL, >> tabelas.sql;
echo tabelas.sql >>	fkEspecificacao INT NOT NULL, >> tabelas.sql;
echo PRIMARY KEY (idregistro) >> tabelas.sql;
echo ); >> tabelas.sql;

cd ..
touch Dockerfile
echo Dockerfile >> FROM mysql:latest
echo Dockerfile >> ENV MYSQL_ROOT_PASSWORD=root
echo Dockerfile >> COPY ./Dock/ /docker-entrypoint-initdb.d/
echo Dockerfile >> EXPOSE 3306


sudo docker build -t meu-banco .

sudo docker run -d --name meu-container -p 3306:3306 meu-banco

sudo docker start meu-container


