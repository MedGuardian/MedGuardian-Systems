function cadastrar() {
    const spanErro = document.getElementById("spanErro")
    const divBotao = document.getElementsByClassName("botaoCadastro");

    var divInputs = document.querySelector(".inputs");
    var inputs = divInputs.querySelectorAll("input");

    var nomeEmpresa = inputNomeEmpresa.value;
    var razaoSocial = inputRazaoSocial.value;
    var CNPJ = inputCNPJ.value;
    var email = inputEmail.value;
    var contato = inputContato.value;
    var cep = inputCep.value;
    var endereco = inputEndereco.value;
    var numeroEndereco = inputNumeroEndereco.value;
    var complementoEndereco = inputComplementoEndereco.value;

    if (nomeEmpresa == "" || razaoSocial == "" || CNPJ == "" || email == "" || contato == "" || cep == "" || endereco == "" || numeroEndereco == "") {

        spanErro.innerHTML = "Por gentileza, preencha todos os campos"
        spanErro.style.display = "block"
        for (let i = 0; i < divBotao.length; i++) {
            divBotao[i].style.marginTop = "-0.6%";
        }

        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value.trim() === "") {
                inputs[i].style.boxShadow = "0px 0px 10px rgba(255, 0, 0, 0.5)"
            }
        }

        setTimeout(function () {
            spanErro.style.display = "none"
            for (let i = 0; i < divBotao.length; i++) {
                divBotao[i].style.marginTop = "5%";
            }

            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].value.trim() === "") {
                    inputs[i].style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)"
                }
            }

        }, 3000);



    } else {
        setTimeout(function () {
            window.location.href = '../PaginaInicial/paginainicial.html'
        }, 1000);
    }

}