var usuarioModel = require("../models/usuarioModel");


function buscarFuncPorId(req, res) {
    var idFuncionario = req.params.idFunc;
    usuarioModel.listarFuncionario(idFuncionario).then((resultado) => {
        res.status(200).json(resultado);
    });
};



function autenticar(req, res) {
    var cnpj = req.body.cnpjServer;
    var senha = req.body.senhaServer;

    if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(cnpj, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json(resultadoAutenticar[0]);
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function autenticarFuncionario(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticarFuncionario(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json(resultadoAutenticar[0]);
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function excluirMaquina(req, res) {
    var nomeMaquina = req.body.nomeMaquinaServer;

    if (nomeMaquina == undefined) {
        res.status(400).send("O nome da máquina está undefined!");
    } else {

        usuarioModel.excluirMaquina(nomeMaquina)
            .then(
                function (resultadoExclusaoMaquina) {
                    console.log(`\nResultados encontrados: ${resultadoExclusaoMaquina.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoExclusaoMaquina)}`); // transforma JSON em String

                    if (resultadoExclusaoMaquina.length == 1) {
                        console.log(resultadoExclusaoMaquina);
                        res.json(resultadoExclusaoMaquina[0]);
                    } else if (resultadoExclusaoMaquina.length == 0) {
                        res.status(403).send("Erro na exclusão da máquina!");
                    } else {
                        res.status(403).send("Duas máquinas com o mesmo nome!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar a exclusão! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function atualizarEmpresa(req, res) {

    var email = req.body.emailServer;
    var tel = req.body.telEmpresaServer;
    var cep = req.body.cepServer;
    var log = req.body.logServer;
    var num = req.body.numServer;
    var comp = req.body.compServer;
    var idEmpresa = req.body.idEmpresaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (tel == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.atualizarEmpresa(email, tel, cep, log, num, comp, idEmpresa)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json(resultadoAutenticar[0]);
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao atualizar os dados da empresa! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function atualizarFuncionario(req, res) {

    var novoEmail = req.body.novoEmailServer;
    var novaSenha = req.body.novaSenhaServer;
    var idFunc = req.params.idFunc;

    usuarioModel.atualizarFuncionario(novoEmail, novaSenha, idFunc)
        .then(
            function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                if (resultadoAutenticar.length == 1) {
                    console.log(resultadoAutenticar);
                    res.json(resultadoAutenticar[0]);
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao atualizar os dados do funcionário! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function cadastrarFuncionario(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer;
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var tipo = req.body.tipoUserServer;

    if (nome == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else if (email == undefined) {
        res.status(400).send("O email ta undefined")
    }
    else {

        usuarioModel.cadastrarFuncionario(nome, email, senha, fkEmpresa, tipo)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em Strin
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro de funcionário! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var razaoSocial = req.body.razaoServer;
    var cnpj = req.body.cnpjServer;
    var email = req.body.emailServer;
    var contato = req.body.contatoServer;
    var senha = req.body.senhaServer

    console.log(req.body)

    // Faça as validações dos valores
    if (razaoSocial == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(razaoSocial, cnpj, email, contato, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function cadastrarEndereco(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var cep = req.body.cepServer;
    var log = req.body.logServer;
    var num = req.body.numServer;
    var comp = req.body.compServer;
    console.log(req.body)

    // Faça as validações dos valores
    if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (log == undefined) {
        res.status(400).send("Seu logradouro está undefined!");
    } else if (num == undefined) {
        res.status(400).send("Seu numero está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarEnd(cep, log, num, comp)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarEndereco(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var cep = req.body.cepServer;
    var log = req.body.logServer;
    var num = req.body.numServer;
    var comp = req.body.compServer;
    console.log(req.body)

    // Faça as validações dos valores
    if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (log == undefined) {
        res.status(400).send("Seu logradouro está undefined!");
    } else if (num == undefined) {
        res.status(400).send("Seu numero está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarEnd(cep, log, num, comp)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizarGrafico(req, res) {

    var fkComputador = req.body.fkComputadorServer;

    const limite_linhas = 6;
    usuarioModel.atualizarGrafico(fkComputador, limite_linhas)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao atualizar o gráfico! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function selectTotalComponentes(req, res) {

    var fkComputador = req.body.fkComputadorServer;

    usuarioModel.selectTotalComponentes(fkComputador)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao buscar os dados totais dos componentes! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function selectMetricas(req, res) {

    var fkComputador = req.body.fkComputadorServer;
    var fkEmpresa = req.body.fkEmpresaServer;

    usuarioModel.selectMetricas(fkComputador, fkEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao buscar os dados quanto a metrica! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function atualizarIndicadores(req, res) {

    var fkComputador = req.body.fkComputadorServer

    usuarioModel.atualizarIndicadores(fkComputador)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao buscar os dados para atualizar os indicadores! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function selectComputador(req, res) {

    var nomeMaquina = req.body.nomeMaquinaServer
    usuarioModel.selectComputador(nomeMaquina)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao fazer o select do computador! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function excluirMaquina(req, res) {
    var idComputador = req.body.idComputadorServer;

    if (idComputador == undefined) {
        res.status(400).send("O nome da máquina ou o ID dela está undefined!");
    } else {

        usuarioModel.excluirMaquina(idComputador)
            .then(
                function (resultadoExclusaoMaquina) {
                    console.log(`\nResultados encontrados: ${resultadoExclusaoMaquina.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoExclusaoMaquina)}`); // transforma JSON em String

                    if (resultadoExclusaoMaquina.length == 1) {
                        console.log(resultadoExclusaoMaquina);
                        res.status(403).send("Erro na exclusão da máquina!");
                    } else if (resultadoExclusaoMaquina.length == 0) {
                        res.status(403).send("Erro na exclusão da máquina!");
                    } else {
                        res.json(resultadoExclusaoMaquina[0]);
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar a exclusão da máquina! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function selectFuncionarios(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer
    usuarioModel.selectFuncionarios(fkEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o select de Funcionários! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function selectComputadores(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer
    var filtro = req.body.filtroServer

    usuarioModel.selectComputadores(fkEmpresa, filtro)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o select dos computadores! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function selectLocalComputador(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer
    usuarioModel.selectLocalComputador(fkEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o select do local dos computadores! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function atualizarDashboardGeral(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer
    usuarioModel.atualizarDashboardGeral(fkEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o select que atualiza os gráficos da dashboard geral! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function excluirFuncionario(req, res) {
    var funcionario = req.body.idFuncionarioServer;
    usuarioModel.excluirFuncionario(funcionario)
        .then(
            function (resultado) {
                res.json(resultado)
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\n Houve um erro ao tentar excluir o Funcionário.",
                    erro.sqlMessage
                )
                res.status(500).json(erro.sqlMessage)
            }
        )
}

function selectAlertas(req, res) {

    var idEmpresa = req.body.fkEmpresaServer
    var dataHoraAtual = req.body.dataHoraAtualServer;
    var dataHoraReduzida = req.body.dataHoraReduzidaServer;
    var dataHoraMais3HorasReduzidas = req.body.dataHoraMais3HorasReduzidaServer;
    var dataHoraMais3Horas = req.body.dataHoraMais3HorasServer;


    usuarioModel.selectAlertas(idEmpresa, dataHoraAtual, dataHoraReduzida, dataHoraMais3HorasReduzidas, dataHoraMais3Horas)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao fazer o select dos alertas! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function atualizarMenuFlutuante(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer
    usuarioModel.selectFuncionarios(fkEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o select de Funcionários! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}



module.exports = {
    autenticar,
    cadastrar,
    cadastrarEndereco,
    cadastrarFuncionario,
    autenticarFuncionario,
    buscarFuncPorId,
    atualizarEmpresa,
    atualizarFuncionario,
    excluirMaquina,
    atualizarGrafico,
    selectTotalComponentes,
    atualizarIndicadores,
    selectComputador,
    selectFuncionarios,
    selectComputadores,
    selectLocalComputador,
    atualizarDashboardGeral,
    excluirFuncionario,
    selectAlertas,
    selectMetricas,
    atualizarMenuFlutuante
}