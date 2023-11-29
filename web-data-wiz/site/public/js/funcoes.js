// Aguarde o carregamento completo da página
document.addEventListener("DOMContentLoaded", function () {
    // Agora você pode executar a lógica da sua função
    validarDashboard();
});

function validarDashboard() {
    var urlAtual = window.location.href;

    if (urlAtual.includes("Dashboard/dashboard.html")) {
        document.getElementById("spanAbrirDashboard").style.display = "none";
    }
}



function validarSessao() {

    const botaoLogin = document.getElementById("botaoLogin");
    const botaoCadastro = document.getElementById("botaoCadastro");
    const divSaudacaoLogado = document.getElementById("saudacaoLogado");
    const msgSaudacao = document.getElementById("saudacao");
    const spanCadastrarFuncionario = document.getElementById('spanCadastrarFuncionario');
    const divGerarRelatorio = document.getElementById('divGerarRelatorio')
    const botaoSair = document.getElementById('botaoSair');


    if (window.location.href.indexOf("dashboard.html") > -1) {
        if (sessionStorage.idEmpresa == null && (sessionStorage.cargo == "Analista" || sessionStorage.cargo == "Estagiário")) {
            divGerarRelatorio.style.display = 'none'
            botaoSair.style.marginTop = '80%'
        } else if (sessionStorage.idEmpresa != null || (sessionStorage.cargo == "Gerente" || sessionStorage.cargo == "Supervisor")) {
            divGerarRelatorio.style.display = 'block'
        }
    } else {
        if (sessionStorage.idEmpresa != null || sessionStorage.idFuncionario != null) {
            botaoLogin.style.display = "none";
            botaoCadastro.style.display = "none";
            divSaudacaoLogado.style.display = "flex";

            if (sessionStorage.idFuncionario) {
                msgSaudacao.innerHTML += sessionStorage.nomeFuncionario.split(' ')[0];
                atualizarMenuFlutuante(sessionStorage.nomeFuncionario.split(' ')[0], sessionStorage.emailFuncionario, sessionStorage.cargo)
            } else {
                msgSaudacao.innerHTML += sessionStorage.razaoSocial.split(' ')[0]
                atualizarMenuFlutuante(sessionStorage.razaoSocial.split(' ')[0], sessionStorage.emailEmpresa, "Empresa")
            }
        }

        if (sessionStorage.idEmpresa == null && (sessionStorage.cargo == "Analista" || sessionStorage.cargo == "Estagiário")) {
            spanCadastrarFuncionario.style.display = 'none'
        } else if (sessionStorage.idEmpresa != null || (sessionStorage.cargo == "Gerente" || sessionStorage.cargo == "Supervisor")) {
            spanCadastrarFuncionario.style.display = 'block'
        }
    }



    if (sessionStorage.idEmpresa == null && (sessionStorage.cargo == "Analista" || sessionStorage.cargo == "Estagiário")) {
        spanCadastrarFuncionario.style.display = 'none'
        divGerarRelatorio.style.backgroundColor = 'red'
    } else if (sessionStorage.idEmpresa != null || (sessionStorage.cargo == "Gerente" || sessionStorage.cargo == "Supervisor")) {
        spanCadastrarFuncionario.style.display = 'block'
        divGerarRelatorio.style.backgroundColor = 'red'
    }
}

function voltarPaginaAnterior() {
    window.history.back();
}

function atualizarMenuFlutuante(nome, email, cargo) {
    var nomeMenuFlutuante = document.getElementById('nomeMenuFlutuante')
    var cargoMenuFlutuante = document.getElementById('cargoMenuFlutuante')
    var emailMenuFlutuante = document.getElementById('emailMenuFlutuante')

    nomeMenuFlutuante.innerHTML = nome
    cargoMenuFlutuante.innerHTML = "(" + cargo + ")"
    emailMenuFlutuante.innerHTML = email
}


function abrirMenuFlutuante() {
    const menuFlutuante = document.getElementById("menuFlutuante");
    if (menuFlutuante.style.display == 'none') {
        menuFlutuante.style.display = 'flex'
    } else {
        menuFlutuante.style.display = 'none'
    }
}

function abrirDashboardMenuFlutuante() {
    window.location.href = '../Dashboard/dashboard.html'
}


function abrirAlterarFuncionario() {
    window.location.href = '../Dashboard/Funcionarios/funcionarios.html'
}

function abrirGerenciamentoMenuFlutuante() {
    if (sessionStorage.idEmpresa == null && sessionStorage.cargo == "Analista" || sessionStorage.cargo == "Estagiário") {
        window.location.href = '/Dashboard/GerenciarFuncionario/gerenciarfuncionario.html'
    } else if (sessionStorage.idEmpresa != null || sessionStorage.cargo == "Gerente" || sessionStorage.cargo == "Supervisor") {
        window.location.href = '/GerenciarConta/gerenciarconta.html'
    }
}

function fazerLogout() {
    sessionStorage.clear()
    window.location.reload()
}

function abrirCadastrarFuncionario() {
    window.location.href = '../Dashboard/CadastroFuncionario/cadastrofuncionario.html'
}

function enviarEmail() {

    const mensagemContato = document.getElementById("mensagemContato").value;
    const assuntoContato = document.getElementById("assuntoContato").value;
    const emailContato = document.getElementById("emailContato").value;


    fetch('/enviar-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailContato, assuntoContato, mensagemContato }),
    })
        .then(function (response) {
            if (response.ok) {

                console.log('E-mail enviado com sucesso!');
                alert("E-mail enviado com sucesso!")
            } else {
                console.log('Erro ao enviar o e-mail.');
            }
        })
        .catch(function (error) {
            console.log('Erro ao enviar o e-mail:', error);
        });
}