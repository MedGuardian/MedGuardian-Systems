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
    } else if(email==undefined){
        res.status(400).send("O email ta undefined")
    } 
    else {

        usuarioModel.cadastrarFuncionario(nome, email,senha, fkEmpresa, tipo)
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
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
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

module.exports = {
    autenticar,
    cadastrar,
    cadastrarEndereco, 
    cadastrarFuncionario,
    autenticarFuncionario,
    buscarFuncPorId,
    atualizarEmpresa,
    atualizarFuncionario
}