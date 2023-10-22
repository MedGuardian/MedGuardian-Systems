

function validarSessao(){

    const botaoLogin = document.getElementById("botaoLogin");
    const botaoCadastro = document.getElementById("botaoCadastro");
    const divSaudacaoLogado = document.getElementById("saudacaoLogado");
    const msgSaudacao = document.getElementById("saudacao");

    if (sessionStorage.idEmpresa != null || sessionStorage.idFuncionario != null){
        botaoLogin.style.display = "none";
        botaoCadastro.style.display = "none";
        divSaudacaoLogado.style.display = "flex";
        
        if(sessionStorage.idFuncionario){
            msgSaudacao.innerHTML += sessionStorage.nomeFuncionario;
            atualizarMenuFlutuante(sessionStorage.nomeFuncionario, sessionStorage.emailFuncionario, sessionStorage.cargo)
        } else {
            msgSaudacao.innerHTML += sessionStorage.razaoSocial.split(' ')[0]
            atualizarMenuFlutuante(sessionStorage.razaoSocial, sessionStorage.emailEmpresa, "Empresa")
        }

    }
}

function voltarPaginaAnterior() {
    window.history.back();
  }

function atualizarMenuFlutuante(nome, email, cargo){
    var nomeMenuFlutuante = document.getElementById('nomeMenuFlutuante')
    var cargoMenuFlutuante = document.getElementById('cargoMenuFlutuante')
    var emailMenuFlutuante = document.getElementById('emailMenuFlutuante')

    if(sessionStorage.idFuncionario){
        var nomeFormatado = nome;
    } else {
        var nomeFormatado = nome.split(' ')[0];
    }

    nomeMenuFlutuante.innerHTML = nomeFormatado
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
    if(sessionStorage.idEmpresa==null && sessionStorage.cargo=="Analista"|| sessionStorage.cargo=="Estagiário"){
        window.location.href = '/Dashboard/GerenciarFuncionario/gerenciarfuncionario.html'
    }else if(sessionStorage.idEmpresa!=null || sessionStorage.cargo=="Gerente"|| sessionStorage.cargo=="Supervisor"){
        window.location.href = '/GerenciarConta/gerenciarconta.html'
    }
}

function fazerLogout(){
    sessionStorage.clear()
    window.location.reload()
}