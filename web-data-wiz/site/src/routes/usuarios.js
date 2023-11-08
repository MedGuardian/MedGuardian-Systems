var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});
router.post("/autenticarFuncionario", function (req, res) {
    usuarioController.autenticarFuncionario(req, res);
});
router.post("/cadastrarEndereco", function (req, res) {
    usuarioController.cadastrarEndereco(req, res);
})
router.post("/cadastrarFuncionario", function (req, res) {
    usuarioController.cadastrarFuncionario(req, res);
})
router.get("/buscar/:idFunc", function (req, res) {
    usuarioController.buscarFuncPorId(req, res);
})
router.post("/atualizarEmpresa/:idEmpresa", function (req, res) {
    usuarioController.atualizarEmpresa(req, res);
})

router.post("/atualizarFuncionario/:idFunc", function (req, res) {
    usuarioController.atualizarFuncionario(req, res);
})

router.post("/excluirMaquina", function (req, res) {
    usuarioController.excluirMaquina(req, res);
})

router.post("/selectComputador", function (req, res) {
    usuarioController.selectComputador(req, res);
})

router.post("/deletarTuplaPeloId", function (req, res) {
    usuarioController.deletarTuplaPeloId(req, res);
})

router.post("/selectDataDia", function (req, res) {
    usuarioController.selectDataDia(req, res);
})

router.post("/selectDataSemana", function (req, res) {
    usuarioController.selectDataSemana(req, res);
})

router.post("/selectDataMes", function (req, res) {
    usuarioController.selectDataMes(req, res);
})

router.post("/selectIntervaloData", function (req, res) {
    usuarioController.selectIntervaloData(req, res);
})


module.exports = router;