var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
})

router.post("/cadastrarMetrica", function (req, res) {
  empresaController.cadastrarMetrica(req, res);
})

router.get("/buscar", function (req, res) {
    empresaController.buscarPorCnpj(req, res);
});

router.get("/alertaPorId/:idComputador", function (req, res) {
  empresaController.buscarAlertaPId(req, res);
});


router.get("/buscar/:idEmpresa", function (req, res) {
  empresaController.buscarPorId(req, res);
});

router.get("/listar", function (req, res) {
  empresaController.listar(req, res);
});

router.get("/validarMetrica/:idEmpresa", function(req, res){
  empresaController.validarMetricas(req,res)
})

module.exports = router;