var database = require("../database/config");

function buscarPorId(id) {
  var query = `SELECT * FROM Empresa JOIN Endereco ON idEmpresa = fkEmpresa WHERE idEmpresa =${id};`;
  return database.executar(query);
}

function listar() {
  var query = `select * from empresa`;

  return database.executar(query);
}
function buscarMetricas(fkEmpresa) {
  var instrucaoSql = `
  SELECT * FROM metrica WHERE fkEMpresa = ${fkEmpresa}
  `;
  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var query = `select * from empresa where cnpj = '${cnpj}'`;

  return database.executar(query);
}

function cadastrar(razaoSocial, cnpj) {
  var query = `insert into empresa (razao_social, cnpj) values ('${razaoSocial}', '${cnpj}')`;

  return database.executar(query);
}
function cadMetrica(graveCpu, medioCpu, graveDisco, medioDisco, graveRam, medioRam, fkEmpresa){
  console.log(graveCpu, medioCpu, graveDisco, medioDisco, graveRam, medioRam, fkEmpresa)
  var instrucaoSQL = `INSERT INTO metrica (graveRam, MedioRam, graveCPU, medioCPU, graveDisco, medioDisco, fkEmpresa, fkComputador) VALUES
    (${graveRam}, ${medioRam}, ${graveCpu}, ${medioCpu}, ${graveDisco}, ${medioDisco}, ${fkEmpresa}, null);
    `
    return database.executar(instrucaoSQL)
  
}
module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
  buscarMetricas,
  cadMetrica
};
