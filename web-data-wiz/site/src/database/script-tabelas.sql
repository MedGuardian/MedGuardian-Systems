-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/


CREATE DATABASE medGuard;
USE medGuard;
CREATE TABLE Empresa (
  idEmpresa INT NOT NULL auto_increment,
  razaoSocial VARCHAR(45) NOT NULL,
  cnpjEmpresa VARCHAR(18) NOT NULL,
  emailEmpresa VARCHAR(45) NOT NULL,
  contatoEmpresa VARCHAR(45) NOT NULL,
  senhaEmpresa VARCHAR(45) NOT NULL,
  PRIMARY KEY (idEmpresa));

CREATE TABLE Endereco (
  idEndereco INT NOT NULL auto_increment,
  cep CHAR(9) NOT NULL,
  logradouro VARCHAR(45) NOT NULL,
  numeroEmpresa INT NOT NULL,
  complementoEmpresa VARCHAR(45) NOT NULL,
  fkEmpresa INT NOT NULL,
  PRIMARY KEY (idEndereco),
  CONSTRAINT fk_Endereco_Empresa
    FOREIGN KEY (fkEmpresa)
    REFERENCES Empresa (idEmpresa));

CREATE TABLE Funcionario (
  idFuncionario INT NOT NULL,
  nomeFuncionario VARCHAR(45) NOT NULL,
  fkEmpresa INT NOT NULL,
  cpfFuncionario VARCHAR(45) NOT NULL,
  loginFuncionario VARCHAR(45) NOT NULL,
  senhaFuncionario VARCHAR(45) NOT NULL,
  fkSupervisor INT NOT NULL,
  PRIMARY KEY (idFuncionario),
  CONSTRAINT fkFuncionarioEmpresa
    FOREIGN KEY (fkEmpresa)
    REFERENCES Empresa (idEmpresa),
    CONSTRAINT fkFuncionarioSupervisor
    FOREIGN KEY (fkSupervisor)
    REFERENCES Funcionario (idFuncionario));

CREATE TABLE Computador (
  idComputador INT NOT NULL,
  nomeComputador VARCHAR(45) NOT NULL,
  PRIMARY KEY (idComputador));

CREATE TABLE FuncionarioDoDia (
  fkFuncionario INT NOT NULL,
  fkComputador INT NOT NULL,
  dia DATE NOT NULL,
  PRIMARY KEY (fkFuncionario, fkComputador),
  CONSTRAINT fkFuncionarioComputador
    FOREIGN KEY (fkFuncionario)
    REFERENCES Funcionario (idFuncionario),
  CONSTRAINT fkComputadorFuncionario
    FOREIGN KEY (fkComputador)
    REFERENCES Computador (idComputador));

CREATE TABLE Componente (
  idComponente INT NOT NULL,
  nomeComponente VARCHAR(45) NOT NULL,
  PRIMARY KEY (idComponente));

CREATE TABLE Registro (
  idregistro INT NOT NULL,
  dataRegistro DATE NOT NULL,
  registro DECIMAL NOT NULL,
  tipoCaptura VARCHAR(45) NOT NULL,
  fkComputador INT NOT NULL,
  fkComponente INT NOT NULL,
  PRIMARY KEY (idregistro),
  CONSTRAINT fkRegistroComputador
    FOREIGN KEY (fkComputador)
    REFERENCES Computador (idComputador),
  CONSTRAINT fkRegistroComponente
    FOREIGN KEY (fkComponente)
    REFERENCES Componente (idComponente));
    

/*
comandos para criar usuário em banco de dados azure, sqlserver,
com permissão de insert + update + delete + select
*/

CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
DEFAULT_SCHEMA = dbo;

EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

EXEC sys.sp_addrolemember @rolename = N'db_datareader',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';
