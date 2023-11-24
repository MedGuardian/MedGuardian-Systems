DROP DATABASE IF EXISTS medguardian;
CREATE DATABASE medguardian;
USE medguardian;

CREATE TABLE IF NOT EXISTS empresa (
  idEmpresa INT AUTO_INCREMENT NOT NULL,
  razaoSocial VARCHAR(255) NOT NULL,
  cnpjEmpresa VARCHAR(18) NOT NULL,
  emailEmpresa VARCHAR(255) NOT NULL,
  contatoEmpresa VARCHAR(255) NOT NULL,
  senhaEmpresa VARCHAR(255) NOT NULL,
  PRIMARY KEY (idEmpresa));

CREATE TABLE IF NOT EXISTS endereco (
  idEndereco INT AUTO_INCREMENT NOT NULL,
  cep CHAR(8) NOT NULL,
  logradouro VARCHAR(255) NULL,
  numeroEmpresa INT NOT NULL,
  complementoEmpresa VARCHAR(255) NULL,
  fkEmpresa INT NOT NULL,
  PRIMARY KEY (idEndereco),
  CONSTRAINT fk_Endereco_Empresa
    FOREIGN KEY (fkEmpresa)
    REFERENCES empresa (idEmpresa));

CREATE TABLE IF NOT EXISTS funcionario (
  idFuncionario INT AUTO_INCREMENT NOT NULL,
  nomeFuncionario VARCHAR(255) NOT NULL,
  fkEmpresa INT NOT NULL,
  emailFuncionario VARCHAR(255) NOT NULL,
  senhaFuncionario VARCHAR(255) NOT NULL,
  tipoAcesso VARCHAR(255) NOT NULL,
  CONSTRAINT chk_tipoAcesso CHECK (tipoAcesso IN ('Gerente', 'Supervisor', 'Analista', 'Estagiário')),
  PRIMARY KEY (idFuncionario),
  CONSTRAINT fk_Funcionario_Empresa1
    FOREIGN KEY (fkEmpresa)
    REFERENCES empresa (idEmpresa));

CREATE TABLE IF NOT EXISTS computador (
  idComputador INT AUTO_INCREMENT NOT NULL,
  nomeComputador VARCHAR(255) NOT NULL,
  sistemaOperacional VARCHAR(255) NOT NULL,
  fkEmpresa INT,
  CONSTRAINT fk_computador_empresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
  PRIMARY KEY (idComputador));

CREATE TABLE IF NOT EXISTS componente (
  idComponente INT AUTO_INCREMENT NOT NULL,
  nomeComponente VARCHAR(225) NOT NULL,
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
  tipoCaptura VARCHAR(255) NULL,
	fkEspecificacao INT NOT NULL,
  PRIMARY KEY (idregistro)
);

CREATE TABLE IF NOT EXISTS metrica(
idMetrica INT PRIMARY KEY AUTO_INCREMENT,
graveRam DECIMAL(4,2) NOT NULL,
medioRam DECIMAL(4,2) NOT NULL,
graveCPU DECIMAL(4,2) NOT NULL,
medioCPU DECIMAL(4,2) NOT NULL,
graveDisco DECIMAL(4,2) NOT NULL,
medioDisco DECIMAL(4,2) NOT NULL,
fkEmpresa INT NOT NULL,
fkComputador INT NULL
);

CREATE TABLE IF NOT EXISTS alertas(
idAlerta INT PRIMARY KEY NOT NULL,
tipoAlerta VARCHAR(255) NOT NULL,
fkComputador INT NOT NULL);
    
INSERT INTO empresa (razaoSocial, cnpjEmpresa, emailEmpresa, contatoEmpresa, senhaEmpresa) VALUES ('a', 1, 'lucasa@gmail.com', '21102002', '1');
INSERT INTO funcionario (nomeFuncionario, fkEmpresa, emailFuncionario, senhaFuncionario, tipoAcesso) VALUES ('lucas', 1, 'lucas@gmail.com', '21102002', "Estagiário");

SELECT * FROM empresa;
SELECT * FROM endereco;
SELECT * FROM funcionario;
SELECT * FROM computador;
SELECT * FROM componente;
SELECT * FROM especificacao;
SELECT * FROM registro JOIN especificacao ON fkEspecificacao = idEspecificacao JOIN componente ON fkComponente = idComponente;

delete from especificacao where fkComputador = 1;

select * from registro join especificacao
	on fkEspecificacao = idEspecificacao
		join computador
			on idComputador = fkComputador
		where idComputador = 1;
        
 UPDATE endereco SET cep = 05882000, Logradouro = 'bla', numeroEmpresa = 1263, complementoEmpresa = 'bla' WHERE fkEmpresa = 1;
 
 select * from endereco join empresa
	on fkEmpresa = idEmpresa;
	
select dataHoraRegistro, registro, tipoCaptura from registro join especificacao
	on fkEspecificacao = idEspecificacao where fkEspecificacao = 5;
    
    SELECT * FROM registro;
    
    SELECT dataHoraRegistro, registro, tipoCaptura FROM registro WHERE fkEspecificacao = 1 ORDER BY idRegistro DESC LIMIT 6;
    
SELECT fkComponente, totalComponente FROM especificacao WHERE fkComponente = 1;

select * from especificacao;
SELECT dataHoraRegistro, registro, tipoCaptura, fkEspecificacao FROM registro WHERE fkEspecificacao = 1 AND tipoCaptura = "UsoCPU" ORDER BY idRegistro DESC LIMIT 6;
SELECT registro, tipoCaptura, fkEspecificacao FROM registro WHERE fkEspecificacao = 1 ORDER BY idRegistro DESC LIMIT 7;
SELECT * FROM computador WHERE fkEmpresa = '2';
select * from empresa;
select * from funcionario;
insert into computador (nomeComputador, sistemaOperacional, fkEmpresa) values 
('notebook-kat', 'windows', 2),
('notebook-pedro', 'windows', 2),
('notebook-victor', 'linux', 2);

select * from registro join especificacao on idEspecificacao = fkEspecificacao 
join computador on idComputador = fkComputador join empresa on fkEmpresa = idEmpresa where fkEmpresa = 2 and fkEspecificacao = 3 and tipoCaptura = 'Uso'
order by idRegistro desc limit 6;
use medguardian;
select * from registro;


