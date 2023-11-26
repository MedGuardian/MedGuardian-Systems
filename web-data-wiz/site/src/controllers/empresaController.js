var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

// buscarAlertaPId

function buscarAlertaPId(req, res) {
  var idComputador = req.params.idComputador
  empresaModel.buscarAlertas(idComputador).then(function (resultado) {
      if (resultado.length >= 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}


function validarMetricas(req, res) {
  var fkEmpresa = req.params.idEmpresa
  empresaModel.buscarMetricas(fkEmpresa).then(function (resultado) {
      if (resultado.length >= 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}


function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.idEmpresa;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var cnpj = req.body.cnpj;
  var razaoSocial = req.body.razaoSocial;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
    } else {
      empresaModel.cadastrar(razaoSocial, cnpj).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}

function cadastrarMetrica(req, res) {
        var graveCpu = req.body.graveCpuServer
        var medioCpu = req.body.medioCpuServer
        var graveDisco = req.body.graveDiscoServer
        var medioDisco = req.body.medioDiscoServer
        var graveRam = req.body.graveRamServer
        var medioRam = req.body.medioRamServer
        var fkEmpresa = req.body.idEmpresaServer

  empresaModel.cadMetrica(graveCpu, medioCpu, graveDisco, medioDisco, graveRam, medioRam, fkEmpresa).then((resultado) => {
        res.status(200).json(resultado);
      });
    }


module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
  validarMetricas,
  cadastrarMetrica,
  buscarAlertaPId
};
