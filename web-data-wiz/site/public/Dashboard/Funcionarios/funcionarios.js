function voltar() {
    history.back();
}

function gerarDIVFuncionario(nome, email, cargo) {
    var div = document.getElementById("containerFuncionarios")
    div.innerHTML += `            <div class="dadosFuncionarios3">
                <div class="dadosFuncionarios2">
                <input type="checkbox">
                    <label>${nome}</label>
                    <label>${email}</label>
                    <label>${cargo}</label>
                </div>
                <label class="tracoSeparacao"></label>
            </div>`
}


function selectFuncionarios() {
    var idEmpresa;
    if (sessionStorage.idEmpresa == null) {
      idEmpresa = sessionStorage.fkEmpresa;
    } else {
      idEmpresa = sessionStorage.idEmpresa;
    }

    fetch("/usuarios/selectFuncionarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({

            fkEmpresaServer: idEmpresa
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then((resposta) => {
                    resposta.forEach((funcionario) => {
                        const { nomeFuncionario, emailFuncionario, tipoAcesso } = funcionario;
                        nome = nomeFuncionario;
                        email = emailFuncionario;
                        cargo = tipoAcesso;
                        gerarDIVFuncionario(nome, email, cargo);
                    });

                });
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
var nome = "";
var email = "";
var cargo = "";