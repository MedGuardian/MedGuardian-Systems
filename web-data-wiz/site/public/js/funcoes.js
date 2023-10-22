

function validarSessao(){

    const botaoLogin = document.getElementById("botaoLogin");
    const botaoCadastro = document.getElementById("botaoCadastro");
    const divSaudacaoLogado = document.getElementById("saudacaoLogado");
    const msgSaudacao = document.getElementById("saudacao");


    if (sessionStorage.idEmpresa != null || sessionStorage.idFuncionario != null || sessionStorage.fkEmpresa){
        botaoLogin.style.display = "none";
        botaoCadastro.style.display = "none";
        divSaudacaoLogado.style.display = "flex";
        
        var razaoSocial = sessionStorage.razaoSocial;
        var primeiroNomeEmpresa = razaoSocial.split(' ')
        msgSaudacao.innerHTML += primeiroNomeEmpresa[0];

        atualizarMenuFlutuante()
    }
}

function atualizarMenuFlutuante(){
    var nomeMenuFlutuante = document.getElementById('nomeMenuFlutuante')
    var cargoMenuFlutuante = document.getElementById('cargoMenuFlutuante')
    var emailMenuFlutuante = document.getElementById('emailMenuFlutuante')

    var nome = sessionStorage.razaoSocial.split(' ')
    var cargo = "Empresa";
    var email = sessionStorage.emailEmpresa

    nomeMenuFlutuante.innerHTML = nome[0]
    cargoMenuFlutuante.innerHTML = "(" + cargo + ")"
    emailMenuFlutuante.innerHTML = email

}

const menuFlutuante = document.getElementById("menuFlutuante");

function abrirMenuFlutuante(){
    if(menuFlutuante.style.display == 'none'){
        menuFlutuante.style.display = 'flex'
    } else {
        menuFlutuante.style.display = 'none'
    }
}

function abrirDashboardMenuFlutuante(){
    window.location.href = './Dashboard/dashboard.html'
}

function abrirGerenciamentoMenuFlutuante(){
    if(sessionStorage.idEmpresa==null && sessionStorage.cargo=="Analista"|| sessionStorage.cargo=="Estagiario"){
        window.location.href = '/Dashboard/GerenciarFuncionario/gerenciarfuncionario.html'
    }else if(sessionStorage.idEmpresa!=null || sessionStorage.cargo=="Gerente"|| sessionStorage.cargo=="Supervisor"){
        window.location.href = '/GerenciarConta/gerenciarconta.html'
    }
}

function fazerLogout(){
    sessionStorage.clear()
    window.location.reload()
}