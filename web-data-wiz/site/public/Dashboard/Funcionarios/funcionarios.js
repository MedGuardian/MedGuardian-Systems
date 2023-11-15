function voltar() {
    history.back();
}

function gerarDIVFuncionario() {

}


function selectFuncionarios() {
    var fkEmpresaVar = 1;

    fetch("/usuarios/a", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({

            fkEmpresaServer: fkEmpresaVar
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                console.log(resposta);
                /*
                resposta.json().then((resposta) => {
                    resposta.reverse();
                    resposta.forEach((funcionario) => {
                        funcionario.forEach((objeto) => {
                            const { fkEspecificacao, tipoCaptura, dataHoraRegistro, registro } = objeto;

                          
                        });
                    });
                });
*/
                console.log("Deu certo seu select de funcionários!")
            } else {
                throw "Houve um erro no select de funcionários(FrontEnd)!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    return false;
}