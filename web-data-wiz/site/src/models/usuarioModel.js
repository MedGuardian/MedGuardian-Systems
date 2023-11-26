var database = require("../database/config")

function autenticar(cnpj, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucao = `
        SELECT * FROM empresa WHERE cnpjEmpresa = '${cnpj}' AND senhaEmpresa = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function listarFuncionario(idFuncionario) {
    console.log("ACESSEI O USUARIO MODEL")
    var instrucao = `
        SELECT * FROM funcionario WHERE idFuncionario = ${idFuncionario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function autenticarFuncionario(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucao = `
      SELECT * FROM funcionario WHERE emailFuncionario = '${email}' AND senhaFuncionario ='${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(razaoSocial, cnpj, email, contato, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO empresa (razaoSocial, cnpjEmpresa, emailEmpresa, contatoEmpresa, senhaEmpresa) 
        VALUES ('${razaoSocial}', '${cnpj}', '${email}', '${contato}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function cadastrarFuncionario(nome, email, senha, fkEmpresa, tipo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO funcionario (nomeFuncionario, fkEmpresa, emailFuncionario, senhaFuncionario, tipoAcesso) 
        VALUES ('${nome}', ${fkEmpresa}, '${email}', '${senha}', '${tipo}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarEnd(cep, log, num, comp) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO endereco (cep, logradouro, numeroEmpresa, complementoEmpresa, fkEmpresa) VALUES
        ('${cep}', '${log}', '${num}', '${comp}', (SELECT MAX(idEmpresa)FROM empresa));
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarEmpresa(email, tel, cep, log, num, comp, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    UPDATE empresa SET emailEmpresa = '${email}', contatoEmpresa = '${tel}' WHERE idEmpresa = ${idEmpresa};
`;

    var instrucao2 = `UPDATE endereco SET cep = ${cep}, logradouro = '${log}', numeroEmpresa = ${num}, complementoEmpresa = '${comp}' WHERE fkEmpresa = ${idEmpresa}`
    console.log("Executando a instrução SQL: \n" + instrucao);
    database.executar(instrucao).then(result1 => {
        console.log("Resultado 1:", result1);

        // After the first query is executed, you can execute the second one
        database.executar(instrucao2).then(result2 => {
            console.log("Resultado 2:", result2);
        }).catch(error => {
            console.error("Erro executando a instrução 2: ", error);
        });
    }).catch(error => {
        console.error("Deu ruim: ", error);
    });
}

function atualizarFuncionario(novoEmail, novaSenha, idFunc) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `UPDATE funcionario SET emailFuncionario = '${novoEmail}', senhaFuncionario = '${novaSenha}' WHERE idFuncionario = ${idFunc};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluirMaquina(idComputador) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirMaquina():");

var instrucao1 = `DELETE FROM alertas WHERE fkComputador = '${idComputador}';`;
var instrucao2 = `DELETE FROM especificacao WHERE fkComputador = '${idComputador}';`;
var instrucao3 = `DELETE FROM computador WHERE idComputador = '${idComputador}';`;

console.log("Executando a instrução SQL 1: \n" + instrucao1);

// Executa a instrução1
return database.executar(instrucao1)
    .then(() => {
        console.log("Instrução SQL 1 concluída com sucesso. Executando instrução SQL 2: \n" + instrucao2);

        // Executa a instrução2
        return database.executar(instrucao2);
    })
    .then(() => {
        console.log("Instrução SQL 2 concluída com sucesso. Executando instrução SQL 3: \n" + instrucao3);

        // Executa a instrução3
        return database.executar(instrucao3);
    })
    .then(() => {
        console.log("Instrução SQL 3 concluída com sucesso.");
        return "Instruções SQL concluídas com sucesso.";
    })
    .catch((erro) => {
        console.error("Erro durante a execução das instruções SQL:", erro);
        throw erro; // Propaga o erro para o bloco catch final
    });

}

function selectComputador(nomeMaquina) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirMaquina():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `SELECT * FROM computador WHERE nomeComputador = '${nomeMaquina}';`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarGrafico(limite_linhas) {

    return new Promise(function (resolve, reject) {
        var instrucao1 = `SELECT TOP ${limite_linhas} dataHoraRegistro, registro, tipoCaptura, fkEspecificacao FROM registro WHERE fkEspecificacao = 1 AND tipoCaptura = 'UsoCPU' ORDER BY idRegistro DESC;`;
        var instrucao2 = `SELECT TOP ${limite_linhas} dataHoraRegistro, registro, tipoCaptura, fkEspecificacao FROM registro WHERE fkEspecificacao = 2 ORDER BY idRegistro DESC;`;
        var instrucao3 = `SELECT TOP ${limite_linhas} dataHoraRegistro, registro, tipoCaptura, fkEspecificacao FROM registro WHERE fkEspecificacao = 3 ORDER BY idRegistro DESC;`;
        var instrucao4 = `SELECT TOP ${limite_linhas} dataHoraRegistro, registro, tipoCaptura, fkEspecificacao FROM registro WHERE fkEspecificacao = 4 ORDER BY idRegistro DESC;`;

        console.log("Executando as instruções SQL...");
        var selects = [];

        selects.push(database.executar(instrucao1));
        selects.push(database.executar(instrucao2));
        selects.push(database.executar(instrucao3));
        selects.push(database.executar(instrucao4))

        Promise.all(selects)
            .then(function (res) {
                resolve(res);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

function selectTotalComponentes() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirMaquina():");

    return new Promise(function (resolve, reject) {
        var instrucao1 = `SELECT fkComponente, totalComponente FROM especificacao WHERE fkComponente = 1;`;
        var instrucao2 = `SELECT fkComponente, totalComponente FROM especificacao WHERE fkComponente = 2;`;
        var instrucao3 = `SELECT fkComponente, totalComponente FROM especificacao WHERE fkComponente = 3;`;

        console.log("Executando as instruções SQL...");
        var selects = [];

        selects.push(database.executar(instrucao1));
        selects.push(database.executar(instrucao2));
        selects.push(database.executar(instrucao3));

        Promise.all(selects)
            .then(function (res) {
                resolve(res);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

function atualizarIndicadores() {

    return new Promise(function (resolve, reject) {
        var instrucao1 = `SELECT TOP 7 registro, tipoCaptura, fkEspecificacao FROM registro WHERE fkEspecificacao = 1 ORDER BY idRegistro DESC;`;
        var instrucao2 = `SELECT TOP 1 registro, tipoCaptura, fkEspecificacao FROM registro WHERE fkEspecificacao = 2 ORDER BY idRegistro DESC`;
        var instrucao3 = `SELECT TOP 1 registro, tipoCaptura, fkEspecificacao FROM registro WHERE fkEspecificacao = 3 ORDER BY idRegistro DESC`;
        var instrucao4 = `SELECT TOP 1 registro, tipoCaptura, fkEspecificacao FROM registro WHERE fkEspecificacao = 4 ORDER BY idRegistro DESC`;

        console.log("Executando as instruções SQL...");
        var selects = [];

        selects.push(database.executar(instrucao1));
        selects.push(database.executar(instrucao2));
        selects.push(database.executar(instrucao3));
        selects.push(database.executar(instrucao4));

        Promise.all(selects)
            .then(function (res) {
                resolve(res);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

function selectFuncionarios(fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucao = `
      SELECT * FROM funcionario WHERE fkEmpresa = '${fkEmpresa}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function selectComputadores(fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucao = `
      SELECT * FROM computador WHERE fkEmpresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function selectLocalComputador(fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucao = `
      SELECT logradouro, numeroEmpresa, complementoEmpresa FROM endereco WHERE fkEmpresa = '${fkEmpresa}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarDashboardGeral(fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")

    return new Promise(function (resolve, reject) {
        var instrucao1 = `
        select top 6 * from registro join especificacao on idEspecificacao = fkEspecificacao 
        join computador on idComputador = fkComputador join empresa on fkEmpresa = idEmpresa where fkEmpresa = ${fkEmpresa} and fkEspecificacao = 1 and tipoCaptura = 'UsoCpu'
        order by idRegistro desc;`;
        var instrucao2 = `
    select top 6 * from registro join especificacao on idEspecificacao = fkEspecificacao 
join computador on idComputador = fkComputador join empresa on fkEmpresa = idEmpresa where fkEmpresa = ${fkEmpresa} and fkEspecificacao = 2
order by idRegistro desc;`;
        var instrucao3 = `
    select top 6 * from registro join especificacao on idEspecificacao = fkEspecificacao 
join computador on idComputador = fkComputador join empresa on fkEmpresa = idEmpresa where fkEmpresa = ${fkEmpresa} and fkEspecificacao = 3 and tipoCaptura = 'Uso'
order by idRegistro desc;`;

        console.log("Executando as instruções SQL...");
        var selects = [];

        selects.push(database.executar(instrucao1));
        selects.push(database.executar(instrucao2));
        selects.push(database.executar(instrucao3));

        Promise.all(selects)
            .then(function (res) {
                resolve(res);
            })
            .catch(function (error) {
                reject(error);
            });
    });

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluirFuncionario(idFuncionario){
    console.log("ACESSEI O USUARIO MODEL");

    var instrucao = `
        DELETE FROM funcionario WHERE idFuncionario = ${idFuncionario};
    `;

    return database.executar(instrucao)
        .then(() => {
            console.log("Instrução SQL 1 concluída com sucesso. Executando instrução SQL: \n" + instrucao);
            return database.executar(instrucao);
        })
        .catch((erro) => {
            console.error("Erro durante a execução das instruções SQL:", erro);
            throw erro;
        });
}

function selectAlertas(idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirMaquina():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `WITH AlertasNumerados AS (
        SELECT
          a.*,
          c.nomeComputador,
          DENSE_RANK() OVER (PARTITION BY a.fkEspecificacao ORDER BY a.dataHoraAlerta DESC) AS NumeroLinha
        FROM
          alertas a
          JOIN computador c ON a.fkComputador = c.idComputador
        WHERE
          c.fkEmpresa = 1
          AND (
            (c.nomeComputador LIKE 'ip%' AND a.dataHoraAlerta BETWEEN '2023-11-24 21:25:00' AND '2023-11-24 21:30:00')
            OR
            (NOT c.nomeComputador LIKE 'ip%' AND a.dataHoraAlerta BETWEEN '2023-11-24 18:25:00' AND '2023-11-24 18:30:00')
          )
      )
      SELECT *
      FROM AlertasNumerados
      WHERE NumeroLinha = 1;`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarGrafico(limite_linhas) {

    return new Promise(function (resolve, reject) {
        var instrucao1 = `SELECT dataHoraRegistro, registro, tipoCaptura, fkEspecificacao FROM registro WHERE fkEspecificacao = 1 AND tipoCaptura = "UsoCPU" ORDER BY idRegistro DESC LIMIT ${limite_linhas};`;
        var instrucao2 = `SELECT dataHoraRegistro, registro, tipoCaptura, fkEspecificacao FROM registro WHERE fkEspecificacao = 2 ORDER BY idRegistro DESC LIMIT ${limite_linhas};`;
        var instrucao3 = `SELECT dataHoraRegistro, registro, tipoCaptura, fkEspecificacao FROM registro WHERE fkEspecificacao = 3 ORDER BY idRegistro DESC LIMIT ${limite_linhas};`;
        var instrucao4 = `SELECT dataHoraRegistro, registro, tipoCaptura, fkEspecificacao FROM registro WHERE fkEspecificacao = 4 ORDER BY idRegistro DESC LIMIT ${limite_linhas};`;

        console.log("Executando as instruções SQL...");
        var selects = [];

        selects.push(database.executar(instrucao1));
        selects.push(database.executar(instrucao2));
        selects.push(database.executar(instrucao3));
        selects.push(database.executar(instrucao4));

        Promise.all(selects)
            .then(function (res) {
                resolve(res);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

function selectTotalComponentes() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirMaquina():");

    return new Promise(function (resolve, reject) {
        var instrucao1 = `SELECT fkComponente, totalComponente FROM especificacao WHERE fkComponente = 1;`;
        var instrucao2 = `SELECT fkComponente, totalComponente FROM especificacao WHERE fkComponente = 2;`;
        var instrucao3 = `SELECT fkComponente, totalComponente FROM especificacao WHERE fkComponente = 3;`;

        console.log("Executando as instruções SQL...");
        var selects = [];

        selects.push(database.executar(instrucao1));
        selects.push(database.executar(instrucao2));
        selects.push(database.executar(instrucao3));

        Promise.all(selects)
            .then(function (res) {
                resolve(res);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

function atualizarIndicadores() {

    return new Promise(function (resolve, reject) {
        var instrucao1 = `SELECT registro, tipoCaptura, fkEspecificacao FROM registro WHERE fkEspecificacao = 1 ORDER BY idRegistro DESC LIMIT 7;`;
        var instrucao2 = `SELECT registro, tipoCaptura, fkEspecificacao FROM registro WHERE fkEspecificacao = 2 ORDER BY idRegistro DESC LIMIT 1`;
        var instrucao3 = `SELECT registro, tipoCaptura, fkEspecificacao FROM registro WHERE fkEspecificacao = 3 ORDER BY idRegistro DESC LIMIT 1`;
        var instrucao4 = `SELECT registro, tipoCaptura, fkEspecificacao FROM registro WHERE fkEspecificacao = 4 ORDER BY idRegistro DESC LIMIT 1`;

        console.log("Executando as instruções SQL...");
        var selects = [];

        selects.push(database.executar(instrucao1));
        selects.push(database.executar(instrucao2));
        selects.push(database.executar(instrucao3));
        selects.push(database.executar(instrucao4));

        Promise.all(selects)
            .then(function (res) {
                resolve(res);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

function selectFuncionarios(fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucao = `
      SELECT * FROM funcionario WHERE fkEmpresa = '${fkEmpresa}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarDatas(selecaoData) {
    var selects = [];
    return new Promise(function (resolve, reject) {
        switch (selecaoData) {
            case 1: {
                console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")

                var instrucao = `SELECT registro, tipoCaptura, dataHoraRegistro, fkEspecificacao FROM registro WHERE dataHoraRegistro >= CURDATE() limit 7;`;
                console.log("Executando a instrução SQL: \n" + instrucao);
                selects.push(database.executar(instrucao));

            }
            case 2: {
                console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")

                var instrucao = `SELECT registro, tipoCaptura, dataHoraRegistro, fkEspecificacao FROM registro WHERE dataHoraRegistro >= SUBDATE(CURDATE(),7) limit 7;`;
                console.log("Executando a instrução SQL: \n" + instrucao);
                selects.push(database.executar(instrucao));

            }
            case 3: {
                console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")

                var instrucao = `SELECT registro, tipoCaptura, dataHoraRegistro, fkEspecificacao FROM registro WHERE dataHoraRegistro >= SUBDATE(CURDATE(),30) limit 30;`;
                console.log("Executando a instrução SQL: \n" + instrucao);
                selects.push(database.executar(instrucao));

            }
            default: {
                console.log('Não há datas específicas')
            }
        }
        Promise.all(selects)
            .then(function (res) {
                resolve(res);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}
// function selectDataDia() {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function selectDataDia():");

//     // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
//     //  e na ordem de inserção dos dados.
//     var instrucao = `SELECT registro FROM registro WHERE dataHoraRegistro >= CURDATE() limit 5;`;

//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

// function selectDataSemana() {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirMaquina():");

//     // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
//     //  e na ordem de inserção dos dados.
//     var instrucao = `SELECT registro FROM registro WHERE dataHoraRegistro >= SUBDATE(CURDATE(),7) limit 7;`;

//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

// function selectDataMes() {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirMaquina():");

//     // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
//     //  e na ordem de inserção dos dados.
//     var instrucao = `SELECT registro FROM registro WHERE dataHoraRegistro >= SUBDATE(CURDATE(),30) limit 30;`;

//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

function selectIntervaloData(dataComeco, dataFim) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirMaquina():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `SELECT registro FROM registro WHERE dataHoraRegistro between '${dataComeco}' AND '${dataFim} limit 6';`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    autenticar,
    cadastrar,
    cadastrarEnd,
    cadastrarFuncionario,
    autenticarFuncionario,
    listarFuncionario,
    atualizarEmpresa,
    atualizarFuncionario,
    excluirMaquina,
    atualizarGrafico,
    selectTotalComponentes,
    atualizarIndicadores,
    selectComputador,
    selectFuncionarios,
    selectIntervaloData,
    atualizarDatas,
    selectComputadores,
    selectLocalComputador,
    atualizarDashboardGeral,
    excluirFuncionario,
    selectAlertas
};
