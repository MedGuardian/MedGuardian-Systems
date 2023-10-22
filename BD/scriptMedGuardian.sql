-- DROP DATABASE medguardian;
CREATE DATABASE medguardian;
USE medguardian;

CREATE TABLE IF NOT EXISTS empresa (
  idEmpresa INT AUTO_INCREMENT NOT NULL,
  razaoSocial VARCHAR(45) NOT NULL,
  cnpjEmpresa VARCHAR(18) NOT NULL,
  emailEmpresa VARCHAR(45) NOT NULL,
  contatoEmpresa VARCHAR(45) NOT NULL,
  senhaEmpresa VARCHAR(255) NOT NULL,
  PRIMARY KEY (idEmpresa));

CREATE TABLE IF NOT EXISTS endereco (
  idEndereco INT AUTO_INCREMENT NOT NULL,
  cep CHAR(8) NOT NULL,
  logradouro VARCHAR(45) NULL,
  numeroEmpresa INT NOT NULL,
  complementoEmpresa VARCHAR(45) NULL,
  fkEmpresa INT NOT NULL,
  PRIMARY KEY (idEndereco),
  CONSTRAINT fk_Endereco_Empresa
    FOREIGN KEY (fkEmpresa)
    REFERENCES Empresa (idEmpresa));

CREATE TABLE IF NOT EXISTS funcionario (
  idFuncionario INT AUTO_INCREMENT NOT NULL,
  nomeFuncionario VARCHAR(45) NOT NULL,
  fkEmpresa INT NOT NULL,
  emailFuncionario VARCHAR(45) NOT NULL,
  senhaFuncionario VARCHAR(45) NOT NULL,
  tipoAcesso VARCHAR(45) NOT NULL,
  CONSTRAINT chk_tipoAcesso CHECK (tipoAcesso IN ('Gerente', 'Supervisor', 'Analista', 'Estagiário')),
  PRIMARY KEY (idFuncionario),
  CONSTRAINT fk_Funcionario_Empresa1
    FOREIGN KEY (fkEmpresa)
    REFERENCES Empresa (idEmpresa));

CREATE TABLE IF NOT EXISTS computador (
  idComputador INT AUTO_INCREMENT NOT NULL,
  nomeComputador VARCHAR(45) NOT NULL,
  PRIMARY KEY (idComputador));

CREATE TABLE IF NOT EXISTS funcionarioDoDia (
  fkFuncionario INT NOT NULL,
  fkComputador INT NOT NULL,
  dataHora DATETIME NOT NULL,
  CONSTRAINT pkComposta_Funcionario_Computador PRIMARY KEY (fkFuncionario, fkComputador, dataHora),
  CONSTRAINT fk_Funcionario_has_computador_Funcionario1
    FOREIGN KEY (fkFuncionario)
    REFERENCES Funcionario (idFuncionario),
  CONSTRAINT fk_Funcionario_has_computador_computador1
    FOREIGN KEY (fkComputador)
    REFERENCES Computador (idComputador));

CREATE TABLE IF NOT EXISTS componente (
  idComponente INT AUTO_INCREMENT NOT NULL,
  nomeComponente VARCHAR(45) NOT NULL,
  PRIMARY KEY (idComponente));
  
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

CREATE TABLE IF NOT EXISTS registro (
  idregistro INT AUTO_INCREMENT NOT NULL,
  dataHoraRegistro DATETIME NOT NULL,
  registro DECIMAL(6,2) NOT NULL,
  tipoCaptura VARCHAR(45) NULL,
	fkEspecificacao INT NOT NULL,
  PRIMARY KEY (idregistro)
);
    
    
INSERT INTO empresa (razaoSocial, cnpjEmpresa, emailEmpresa, contatoEmpresa, senhaEmpresa) VALUES ('a', 1, 'lucasa@gmail.com', '21102002', '1');
INSERT INTO funcionario (nomeFuncionario, fkEmpresa, emailFuncionario, senhaFuncionario, tipoAcesso) VALUES ('lucas', 1, 'lucas@gmail.com', '21102002', "Estagiário");

SELECT * FROM empresa;
SELECT * FROM endereco;
SELECT * FROM funcionario;
SELECT * FROM computador;
SELECT * FROM funcionariododia;
SELECT * FROM componente;
SELECT * FROM especificacao;
SELECT * FROM registro;

select * from especificacao join computador
	on fkComputador = idComputador
		where idComputador = 1;
        
 UPDATE endereco SET cep = 05882000, Logradouro = 'bla', numeroEmpresa = 1263, complementoEmpresa = 'bla' WHERE fkEmpresa = 1;
 
 select * from endereco join empresa
	on fkEmpresa = idEmpresa;
	



