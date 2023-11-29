function voltarIndex() {
    history.back()
}

function gerarDIVFuncionario(nome, email, cargo) {
    var div = document.getElementById('containerFuncionarios')
    div.innerHTML += `<div class="dadosFuncionarios3">
                <div class="dadosFuncionarios2">
                <input type="checkbox" class="checkboxFuncionario">
                    <label>${nome}</label>
                    <label>${email}</label>
                    <label>${cargo}</label>
                </div>
                <label class="tracoSeparacao"></label>
            </div>`
}



var nome = "";
var email = "";
var cargo = "";
var id = [];
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
                        const { idFuncionario, nomeFuncionario, emailFuncionario, tipoAcesso } = funcionario;
                        id.push(idFuncionario);
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



function selecionarTodos() {
    var checkboxSelecionarTodos = document.getElementById('checkboxSelecionarTodos');
    var checkboxUsuario = document.querySelectorAll('.checkboxFuncionario');

    checkboxUsuario.forEach(function (checkbox) {
        checkbox.checked = checkboxSelecionarTodos.checked;
    });
}



var listaFuncionariosExcluir = [];

function excluirFuncionario() {
    var checkboxFuncionario = document.querySelectorAll('.checkboxFuncionario');

    checkboxFuncionario.forEach(function (checkbox) {
        if (checkbox.checked) {
            console.log(id)
            for (var i = 0; i < id.length; i++) {
                listaFuncionariosExcluir.push(id[i]);
            }
            console.log(listaFuncionariosExcluir.length)
            for (var j = 0; j < listaFuncionariosExcluir.length; j++) {
                console.log(listaFuncionariosExcluir[j])
                fetch("/usuarios/excluirFuncionario", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        idFuncionarioServer: listaFuncionariosExcluir[j]
                    }),
                })
                    .then(function (resposta) {
                        console.log("resposta: ", resposta);
                        if (resposta.ok) {
                            console.log(resposta);
                            console.log("Deu certo seu exclud de funcionários!")
                            location.reload()
                        } else {
                            throw "Houve um erro na exclusão de funcionários(FrontEnd)!";
                        }
                    })
                    .catch(function (resposta) {
                        console.log(`#ERRO: ${resposta}`);
                    });
            }
        }
    });
    return false;


}