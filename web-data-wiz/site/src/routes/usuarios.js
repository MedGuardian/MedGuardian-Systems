var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/cadastrarMetrica", function (req, res) {
    usuarioController.cadastrarMetrica(req, res);
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

router.post("/atualizarGrafico", function (req, res) {
    usuarioController.atualizarGrafico(req, res);
});

router.post("/selectTotalComponentes", function (req, res) {
    usuarioController.selectTotalComponentes(req, res);
});

router.post("/atualizarIndicadores", function (req, res) {
    usuarioController.atualizarIndicadores(req, res);
});

router.post("/selectFuncionarios", function (req, res) {
    usuarioController.selectFuncionarios(req, res);
});

router.post("/selectDataDia", function (req, res) {
    usuarioController.selectDataDia(req, res);
})

router.get("/selectDataSemana", function (req, res) {
    usuarioController.selectDataSemana(req, res);
})

router.post("/selectDataMes", function (req, res) {
    usuarioController.selectDataMes(req, res);
})

router.post("/selectIntervaloData", function (req, res) {
    usuarioController.selectIntervaloData(req, res);
})

router.post("/atualizarDatas", function (req, res) {
    usuarioController.atualizarDatas(req, res);
});

router.post("/selectComputadores", function (req, res) {
    usuarioController.selectComputadores(req, res);
});

router.post("/selectLocalComputador", function (req, res) {
    usuarioController.selectLocalComputador(req, res);
});

router.post("/atualizarDashboardGeral", function (req, res) {
    usuarioController.atualizarDashboardGeral(req, res);
});

router.post("/excluirFuncionario", function (req, res) {
    usuarioController.excluirFuncionario(req, res);
});

router.post("/selectAlertas", function (req, res) {
    usuarioController.selectAlertas(req, res);
});

router.post("/selectMetricas", function (req, res) {
    usuarioController.selectMetricas(req, res);
});

router.get(`/selectJanelasAbertas/:fkComputadorServer`, function (req, res) {
    usuarioController.selectJanelasAbertas(req, res);
});

router.post(`/fecharJanela`, function (req, res) {
    usuarioController.fecharJanela(req, res);
});


module.exports = router;