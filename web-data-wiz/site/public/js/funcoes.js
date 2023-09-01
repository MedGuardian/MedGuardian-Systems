function telaLogin(){
    window.location.href = '../Login/login.html'
}

function telaCadastro(){
    window.location.href = '../Cadastro/cadastro.html'
}

function validarSessao(){

    const botaoLogin = document.getElementById("botaoLogin");
    const botaoCadastro = document.getElementById("botaoCadastro");
    const divSaudacaoLogado = document.getElementById("saudacaoLogado");
    const msgSaudacao = document.getElementById("saudacao");


    if (sessionStorage.LOGIN != null){
        botaoLogin.style.display = "none";
        botaoCadastro.style.display = "none";
        divSaudacaoLogado.style.display = "flex";
        msgSaudacao.innerHTML += "Lucas";
    }
}