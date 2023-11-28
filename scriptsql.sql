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
 	nomeComponente VARCHAR(225) NOT NULL, 
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
	REFERENCES componente(idComponente) 
); 

CREATE TABLE IF NOT EXISTS registro( 
 	idregistro INT AUTO_INCREMENT NOT NULL, 
 	dataHoraRegistro DATETIME NOT NULL, 
 	registro DECIMAL(6,2) NOT NULL, 
	tipoCaptura VARCHAR(255) NULL, 
	fkEspecificacao INT NOT NULL, 
 	PRIMARY KEY (idregistro) 
);
