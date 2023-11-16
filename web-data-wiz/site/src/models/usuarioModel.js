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

function excluirMaquina(nomeMaquina) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirMaquina():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `DELETE FROM computador WHERE nomeComputador = '${nomeMaquina}';`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function selectComputador(nomeMaquina){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirMaquina():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `SELECT FROM computador WHERE nomeComputador = '${nomeMaquina}';`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarTuplaPeloId(idComputador){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirMaquina():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `DELETE FROM especificacao WHERE idComputador = ${idComputador};`;

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

function selectTotalComponentes(){
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
    selectComputador,
    deletarTuplaPeloId,
    atualizarGrafico,
    selectTotalComponentes,
    atualizarIndicadores
};
