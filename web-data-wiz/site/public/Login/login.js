function entrar(){

    const divBotao = document.getElementsByClassName("botaoEntrar");

    var divInputs = document.querySelector(".inputsLogin");
    var inputs = divInputs.querySelectorAll("input");

    const spanErro = document.getElementById("spanErro")

    var login = inputLogin.value;
    var senha = inputSenha.value;

    sessionStorage.LOGIN = login;

    if(login == "lucas.flima@sptech.school" && senha == "12345678"){

        setTimeout(function () {
            window.location.href = '../PaginaInicial/paginainicial.html'
        }, 1000);
    } else {
            spanErro.innerHTML = "Login ou senha inválido(a)"
            spanErro.style.display = "block"

            for (let i = 0; i < divBotao.length; i++) {
                divBotao[i].style.marginTop = "1.4%";
            }

            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].value.trim() === "") {
                    inputs[i].style.boxShadow = "0px 0px 10px rgba(255, 0, 0, 0.5)"
                }
            }

            setTimeout(function () {
                spanErro.style.display = "none";

                for (let i = 0; i < divBotao.length; i++) {
                    divBotao[i].style.marginTop = "5%";
                }


                for (var i = 0; i < inputs.length; i++) {
                    if (inputs[i].value.trim() === "") {
                        inputs[i].style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)"
                    }
                }

            }, 3000);
    }

}

window.addEventListener("keyup", capturarTecla)
function capturarTecla(event) {
      if (event.key === "Enter") {
        entrar();
      }
}