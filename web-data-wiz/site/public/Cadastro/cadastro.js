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

function transformarCnpj(){
    var cnpj = inputCNPJ.value.replace(/[^\d]/g, '');

            let cnpjFormatado = '';

                cnpjFormatado = `${cnpj.substr(0, 2)}.${cnpj.substr(2, 3)}.${cnpj.substr(5, 3)}/${cnpj.substr(8, 4)}-${cnpj.substr(12)}`;

            inputCNPJ.value = cnpjFormatado;
}

function validaCNPJ(){
    cnpj=inputCNPJ.value
    numerosVerificacao = cnpj.replaceAll(/\D/g,"");
    
    if(numerosVerificacao.length != 14){
        inputCNPJ.style.borderColor = 'red';
        return false;
    }else{
        var digitosVerificadores = numerosVerificacao[numerosVerificacao.length-2] + numerosVerificacao[numerosVerificacao.length-1];
        var numerosVerificacao = numerosVerificacao.slice(0, numerosVerificacao.length-2);
        var digitos = gerarDigitos(numerosVerificacao);
        if(digitos == digitosVerificadores){
            inputCNPJ.style.color = 'black';
            return true;
        }else{
            inputCNPJ.style.color = 'red';
            return false;
        }
    }
}

function gerarDigitos(numerosVerificacao){
    var soma = 0;
    var peso = 2;
    for(var i = numerosVerificacao.length-1; i >= 0; i--){
        soma += numerosVerificacao[i] * peso;

        if(peso == 9){
            peso = 2;
        }else{
            peso++;
        }
    }
    
    var modulo = soma % 11;
    var digitoVerificador = 0;

    if(modulo >= 2){
        digitoVerificador = 11 - modulo;
    }

    if(numerosVerificacao.length < 13){
        digitoVerificador += `${gerarDigitos(numerosVerificacao + digitoVerificador)}`;
    }

    return digitoVerificador;
}
