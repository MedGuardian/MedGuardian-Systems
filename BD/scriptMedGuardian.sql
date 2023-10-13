-- DROP DATABASE medGuardian;
CREATE DATABASE medGuardian;
USE medGuardian;

CREATE TABLE IF NOT EXISTS empresa (
  idEmpresa INT NOT NULL,
  nomeEmpresa VARCHAR(45) NOT NULL,
  razaoSocial VARCHAR(45) NOT NULL,
  cnpjEmpresa VARCHAR(18) NOT NULL,
  emailEmpresa VARCHAR(45) NOT NULL,
  contatoEmpresa VARCHAR(45) NOT NULL,
  PRIMARY KEY (idEmpresa));

CREATE TABLE IF NOT EXISTS endereco (
  idEndereco INT AUTO_INCREMENT NOT NULL,
  cep CHAR(8) NOT NULL,
  Logradouro VARCHAR(45) NULL,
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
  fkComputador INT NOT NULL,
  CONSTRAINT fk_computador_componente
    FOREIGN KEY (fkComputador)
    REFERENCES Computador (idComputador),
  PRIMARY KEY (idComponente));

CREATE TABLE IF NOT EXISTS registro (
  idregistro INT AUTO_INCREMENT NOT NULL,
  dataHoraRegistro DATETIME NOT NULL,
  registro DECIMAL(6,2) NOT NULL,
  tipoCaptura VARCHAR(45) NULL,
  fkComputador INT NOT NULL,
  fkComponente INT NOT NULL,
  PRIMARY KEY (idregistro),
  CONSTRAINT fk_registro_computador1
    FOREIGN KEY (fkComputador)
    REFERENCES Computador (idComputador),
  CONSTRAINT fk_registro_Componente1
    FOREIGN KEY (fkComponente)
    REFERENCES Componente (idComponente));
    
    -- Empresa 1
INSERT INTO Empresa (idEmpresa, nomeEmpresa, razaoSocial, cnpjEmpresa, emailEmpresa, contatoEmpresa)
VALUES (1, 'Empresa A', 'Razao Social A', '12345678901', 'empresaA@email.com', 'Contato A');

-- Empresa 2
INSERT INTO Empresa (idEmpresa, nomeEmpresa, razaoSocial, cnpjEmpresa, emailEmpresa, contatoEmpresa)
VALUES (2, 'Empresa B', 'Razao Social B', '23456789012', 'empresaB@email.com', 'Contato B');

-- Empresa 3
INSERT INTO Empresa (idEmpresa, nomeEmpresa, razaoSocial, cnpjEmpresa, emailEmpresa, contatoEmpresa)
VALUES (3, 'Empresa C', 'Razao Social C', '34567890123', 'empresaC@email.com', 'Contato C');

-- Empresa 4
INSERT INTO Empresa (idEmpresa, nomeEmpresa, razaoSocial, cnpjEmpresa, emailEmpresa, contatoEmpresa)
VALUES (4, 'Empresa D', 'Razao Social D', '45678901234', 'empresaD@email.com', 'Contato D');

-- Empresa 5
INSERT INTO Empresa (idEmpresa, nomeEmpresa, razaoSocial, cnpjEmpresa, emailEmpresa, contatoEmpresa)
VALUES (5, 'Empresa E', 'Razao Social E', '56789012345', 'empresaE@email.com', 'Contato E');

-- Endereco 1 (pertencente à Empresa 1)
INSERT INTO Endereco (cep, Logradouro, numeroEmpresa, complementoEmpresa, fkEmpresa)
VALUES ('12345678', 'Rua A', 123, 'Apto 1', 1);

-- Endereco 2 (pertencente à Empresa 2)
INSERT INTO Endereco (cep, Logradouro, numeroEmpresa, complementoEmpresa, fkEmpresa)
VALUES ('23456789', 'Rua B', 456, 'Casa 2', 2);

-- Endereco 3 (pertencente à Empresa 3)
INSERT INTO Endereco (cep, Logradouro, numeroEmpresa, complementoEmpresa, fkEmpresa)
VALUES ('34567890', 'Rua C', 789, 'Sala 3', 3);

-- Endereco 4 (pertencente à Empresa 4)
INSERT INTO Endereco (cep, Logradouro, numeroEmpresa, complementoEmpresa, fkEmpresa)
VALUES ('45678901', 'Rua D', 101, 'Loja 4', 4);

-- Endereco 5 (pertencente à Empresa 5)
INSERT INTO Endereco (cep, Logradouro, numeroEmpresa, complementoEmpresa, fkEmpresa)
VALUES ('56789012', 'Rua E', 222, 'Apartamento 5', 5);

-- Funcionario 1 (trabalha na Empresa 1)
INSERT INTO Funcionario (nomeFuncionario, fkEmpresa, emailFuncionario, senhaFuncionario)
VALUES ('Funcionario 1', 1, 'funcionario1@email.com', 'senha1');

-- Funcionario 2 (trabalha na Empresa 2)
INSERT INTO Funcionario (nomeFuncionario, fkEmpresa, emailFuncionario, senhaFuncionario)
VALUES ('Funcionario 2', 2, 'funcionario2@email.com', 'senha2');

-- Funcionario 3 (trabalha na Empresa 3)
INSERT INTO Funcionario (nomeFuncionario, fkEmpresa, emailFuncionario, senhaFuncionario)
VALUES ('Funcionario 3', 3, 'funcionario3@email.com', 'senha3');

-- Funcionario 4 (trabalha na Empresa 4)
INSERT INTO Funcionario (nomeFuncionario, fkEmpresa, emailFuncionario, senhaFuncionario)
VALUES ('Funcionario 4', 4, 'funcionario4@email.com', 'senha4');

-- Funcionario 5 (trabalha na Empresa 5)
INSERT INTO Funcionario (nomeFuncionario, fkEmpresa, emailFuncionario, senhaFuncionario)
VALUES ('Funcionario 5', 5, 'funcionario5@email.com', 'senha5');

SELECT * FROM empresa;
SELECT * FROM endereco;
SELECT * FROM funcionario;
SELECT * FROM computador;
SELECT * FROM funcionariododia;
SELECT * FROM componente;
SELECT * FROM registro;



