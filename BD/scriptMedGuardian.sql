-- DROP DATABASE medGuardian;
CREATE DATABASE medGuardian;
USE medGuardian;

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
  fkAdmin INT NULL,
  fkEmpresaAdmin INT NULL,
  CONSTRAINT fk_funcionario_empresa_admin FOREIGN KEY (fkEmpresaAdmin) REFERENCES empresa(idEmpresa),
  CONSTRAINT fk_funcionario_admin FOREIGN KEY (fkAdmin) REFERENCES funcionario (idFuncionario),
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

SELECT * FROM empresa;
SELECT * FROM endereco;
SELECT * FROM funcionario;
SELECT * FROM computador;
SELECT * FROM funcionariododia;
SELECT * FROM componente;
SELECT * FROM registro;



