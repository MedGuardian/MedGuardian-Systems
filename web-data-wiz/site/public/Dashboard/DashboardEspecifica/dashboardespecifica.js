function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

var fkComputador = parseInt(getQueryParam("parametro"), 10)

selectTotalComponentes();
selectMetricas();
validarMostrarJanelas();

const spanUsuarioDashEspecifica = document.getElementById("spanUsuarioDashEspecifica");
if (sessionStorage.idFuncionario == null) {
    spanUsuarioDashEspecifica.innerHTML = sessionStorage.razaoSocial
} else {
    spanUsuarioDashEspecifica.innerHTML = sessionStorage.nomeFuncionario
}

function voltarDashboardGeral() {
    window.location.href = '../dashboard.html'
}

function abrirListaJanelas() {
    const modalListaJanelas = document.getElementById("modalListaJanelas");
    const sombreamento = document.getElementById("sombreamento");
    modalListaJanelas.style.display = "flex"
    sombreamento.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function fecharModalListarJanelas() {
    const modalListaJanelas = document.getElementById("modalListaJanelas");
    const sombreamento = document.getElementById("sombreamento");

    modalListaJanelas.style.display = "none"
    sombreamento.style.display = "none";
}

var divValorBoxLateralCpu = document.getElementById('divValorBoxLateralCpu');
var divValorBoxLateralDisco = document.getElementById('divValorBoxLateralDisco');
var divValorBoxLateralRam = document.getElementById('divValorBoxLateralRam');

var spanValorBoxLateralCpu = document.getElementById('spanValorBoxLateralCpu');
var spanValorBoxLateralDisco = document.getElementById('spanValorBoxLateralDisco');
var spanValorBoxLateralRam = document.getElementById('spanValorBoxLateralRam');
var spanTotalComponenteRam = document.getElementById("spanTotalComponenteRam")

var spanDias = document.getElementById("valorCronometroDias")
var spanHoras = document.getElementById("valorCronometroHoras")
var spanMinutos = document.getElementById("valorCronometroMinutos")
var spanSegundos = document.getElementById("valorCronometroSegundos")
var spanUtilizacaoCPU = document.getElementById("spanUtilizacaoCPU")
var spanSwapDisponivel = document.getElementById("spanSwapDisponivel")
var spanProcessos = document.getElementById("spanProcessos")
var spanThreads = document.getElementById("spanThreads")

var maquinaSelecionada = document.getElementById("maquinaSelecionada")
maquinaSelecionada.innerHTML = "Máquina " + fkComputador;

var velocidadeCpu = 0;
var discoDisponivel = 0;
var usoRamAtual = 0;

var valoresCards = [velocidadeCpu, discoDisponivel, usoRamAtual];

function atualizarSpanIndicadores() {
    spanDias.innerHTML = Math.trunc(tempo_atividade_dias);
    spanHoras.innerHTML = Math.trunc(tempo_atividade_horas);
    spanMinutos.innerHTML = Math.trunc(tempo_atividade_minutos);
    spanSegundos.innerHTML = Math.trunc(tempo_atividade_segundos);
    spanUtilizacaoCPU.innerHTML = (valoresCards[0] / 1).toFixed(1) + "%";
    spanSwapDisponivel.innerHTML = swapDisponivel + "GB";
    spanProcessos.innerHTML = Math.trunc(processos);
    spanThreads.innerHTML = Math.trunc(threads);
}

function atualizarValoresCardsLaterais() {
    spanValorBoxLateralCpu.innerHTML = valoresCards[0];
    spanValorBoxLateralDisco.innerHTML = valoresCards[1];
    spanValorBoxLateralRam.innerHTML = (valoresCards[2] / 1).toFixed(1);
    spanTotalComponenteRam.innerHTML = (totalComponenteRam / 1).toFixed(1);
}

function atualizarCoresCardsLaterais() {
    console.log(metricaGraveCpu)
    console.log(metricaGraveDisco)
    console.log(metricaGraveRam)
    console.log(valoresCards[0])
    console.log(valoresCards[1])
    console.log(valoresCards[2])

    if (valoresCards[0] > metricaGraveCpu) {
        divValorBoxLateralCpu.style.backgroundColor = 'rgba(255,0,0,.5)'
    } else if (valoresCards[0] > metricaMedioCpu) {
        divValorBoxLateralCpu.style.backgroundColor = 'yellow'
    } else {
        divValorBoxLateralCpu.style.backgroundColor = '#718672'
    }

    var porcentagemUsoDisco = (valoresCards[1] * 100 / totalComponenteDisco)

    if ((100 - porcentagemUsoDisco) > metricaGraveDisco) {
        divValorBoxLateralDisco.style.backgroundColor = 'rgba(255,0,0,.5)'
    } else if ((100 - porcentagemUsoDisco) > metricaMedioDisco) {
        divValorBoxLateralDisco.style.backgroundColor = 'yellow'
    } else {
        divValorBoxLateralDisco.style.backgroundColor = '#718672'
    }

    var porcentagemUsoRam = (valoresCards[2] * 100) / totalComponenteRam;

    if (porcentagemUsoRam > metricaGraveRam) {
        divValorBoxLateralRam.style.backgroundColor = 'rgba(255,0,0,.5)'
    } else if (porcentagemUsoRam > metricaMedioRam) {
        divValorBoxLateralRam.style.backgroundColor = 'yellow'
    } else {
        divValorBoxLateralRam.style.backgroundColor = '#718672'
    }
}

function atualizarIndicadores() {

    fetch("/usuarios/atualizarIndicadores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fkComputadorServer: fkComputador
        })
    }).then(function (resposta) {
        console.log("Estou buscando dados para atualizar os indicadores!");

        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then((resposta) => {
                resposta.reverse();
                resposta.forEach((especificacao) => {
                    especificacao.forEach((objeto) => {
                        const { fkEspecificacao, tipoCaptura, registro } = objeto;

                        if (fkEspecificacao == (fkComputador * 4 - 3)) {
                            if (tipoCaptura == "UsoCpu") {
                                valoresCards[0] = registro;
                            } else if (tipoCaptura == "QuantidadeThreads") {
                                threads = registro;
                            } else if (tipoCaptura == "QuantidadeProcessos") {
                                processos = registro;
                            } else {
                                if (tipoCaptura == "Dias") {
                                    tempo_atividade_dias = registro;
                                } else if (tipoCaptura == "Horas") {
                                    tempo_atividade_horas = registro;
                                } else if (tipoCaptura == "Minutos") {
                                    tempo_atividade_minutos = registro;
                                } else if (tipoCaptura == "Segundos") {
                                    tempo_atividade_segundos = registro;
                                }
                            }
                        } else if (fkEspecificacao == (fkComputador * 4 - 2)) {
                            valoresCards[2] = registro;
                        } else if (fkEspecificacao == (fkComputador * 4 - 1)) {
                            if (tipoCaptura == "Uso") {
                                valoresCards[1] = registro;
                            }
                        }
                    });
                });
            });
            console.log("Consegui retornar os dados para atualizar os indicadores")
            atualizarSpanIndicadores();
            atualizarCoresCardsLaterais();
            atualizarValoresCardsLaterais();
        } else {
            console.log("Houve um erro ao buscar os dados para atualizar os indicadores!");

            resposta.text().then((texto) => {
                console.error(texto);
            });
        }
    })
        .catch(function (erro) {
            console.log(erro);
        });

    return false;
}

setInterval(atualizarIndicadores, 5000)

const graficoDesempenho = document.getElementById("graficoDesempenho")

var labelsGrafico = [];
const data_graficoDesempenho = {
    labels: dataHoraLabelsDisco,
    datasets: [
        {
            label: "Desempenho",
            data: [],
            backgroundColor: 'rgba(0, 189, 6, .15)',
            borderColor: 'rgba(0, 189, 6, 1)',
            pointBackgroundColor: '#090909',
            pointBorderColor: 'rgba(255,255,255,.8',
            pointRadius: 5,
            borderWidth: 1,
            fill: true
        }
    ]
};

const config_graficoDesempenho = {
    type: 'line',
    data: data_graficoDesempenho,
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                max: 0,
                min: 0,
                grid: {
                    display: true
                },
                ticks: {
                    beginAtZero: true,
                    color: '#2E2109;',
                    font: {
                        size: 10,
                        family: 'Poppins',
                        weight: 600
                    }
                },
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    display: true,
                    color: '#2E2109;',
                    font: {
                        size: 10,
                        family: 'Poppins',
                        weight: 600
                    }
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Desempenho da CPU',
                color: 'black',
                font: {
                    size: 10,
                    color: 'black',
                    family: 'Poppins',
                    weight: 600
                }

            },
            legend: {
                display: false,
                labels: {
                    font: {
                        size: 10,
                        color: 'white',
                        family: 'Poppins',
                        weight: 600,
                    }
                }
            }
        }
    }
};

const graficoEmUso = new Chart(graficoDesempenho, config_graficoDesempenho);

var uso_cpu = [];
var uso_ram = [];
var uso_disco = [];
var dataHoraLabelsCPU = [];
var dataHoraLabelsDisco = [];
var dataHoraLabelsRAM = [];
var threads = 0;
var processos = 0
var tempo_atividade_segundos = 0;
var tempo_atividade_minutos = 0;
var tempo_atividade_horas = 0;
var tempo_atividade_dias = 0;
var velocidade_processador = 0;
var swapDisponivel = 0;

function atualizarGrafico() {

    fetch("/usuarios/atualizarGrafico", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fkComputadorServer: fkComputador
        })
    }).then(function (resposta) {
        console.log("Estou buscando dados para popular o gráfico!");

        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then((resposta) => {
                resposta.reverse();
                resposta.forEach((especificacao) => {
                    especificacao.forEach((objeto) => {
                        const { fkEspecificacao, tipoCaptura, dataHoraRegistro, registro } = objeto;

                        const hora = dataHoraRegistro.substring(11, 13);    // Extrai a hora da dataHora
                        const minuto = dataHoraRegistro.substring(14, 16);  // Extrai o minuto da dataHora
                        const segundo = dataHoraRegistro.substring(17, 19); // Extrai o segundo da dataHora

                        if (fkEspecificacao == (fkComputador * 4 - 3)) {
                            if (uso_cpu.length >= 6) {
                                uso_cpu.shift();
                            }
                            uso_cpu.push(registro);
                            if (dataHoraLabelsCPU.length >= 6) {
                                dataHoraLabelsCPU.shift()
                            }
                            dataHoraLabelsCPU.push(`${hora}:${minuto}:${segundo}`)
                        } else if (fkEspecificacao == (fkComputador * 4 - 2)) {
                            if (uso_ram.length >= 6) {
                                uso_ram.shift();
                            }
                            var porcentagemUsoRam = registro * 100 / totalComponenteRam;
                            uso_ram.push(porcentagemUsoRam);

                            if (dataHoraLabelsRAM.length >= 6) {
                                dataHoraLabelsRAM.shift()
                            }
                            dataHoraLabelsRAM.push(`${hora}:${minuto}:${segundo}`)
                        } else if (fkEspecificacao == (fkComputador * 4 - 1)) {

                            if (tipoCaptura == "SwapDisponivel") {
                                swapDisponivel = registro;
                            } else {
                                valoresCards[1] = registro;
                                if (uso_disco.length >= 6) {
                                    uso_disco.shift();
                                }
                                var porcentagemUsoDisco = 100 - (registro * 100 / totalComponenteDisco);
                                uso_disco.push(porcentagemUsoDisco)
                                if (dataHoraLabelsDisco.length >= 6) {
                                    dataHoraLabelsDisco.shift()
                                }
                                dataHoraLabelsDisco.push(`${hora}:${minuto}:${segundo}`)
                            }
                        }
                    });
                });
                plotarGrafico(valorN);
            });

            console.log("Consegui retornar os dados para atualizar o gráfico!")
        } else {
            console.log("Houve um erro ao buscar os dados para popular o gráfico!");

            resposta.text().then((texto) => {
                console.error(texto);
            });
        }
    })
        .catch(function (erro) {
            console.log(erro);
        });

    return false;
}


setInterval(atualizarGrafico, 5000)

var totalComponenteRam = 0;
var totalComponenteCPU = 0;
var totalComponenteDisco = 0;

function selectTotalComponentes() {
    fetch("/usuarios/selectTotalComponentes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fkComputadorServer: fkComputador
        })
    }).then(function (resposta) {
        console.log("Estou buscando dados referente a capacidade total dos componentes!");

        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then((resposta) => {
                resposta.forEach((especificacao) => {
                    especificacao.forEach((objeto) => {
                        const { idEspecificacao, totalComponente } = objeto;

                        if (idEspecificacao == (fkComputador * 4 - 3)) {
                            totalComponenteCPU = totalComponente;
                        } else if (idEspecificacao == (fkComputador * 4 - 2)) {
                            totalComponenteRam = totalComponente;
                        } else if (idEspecificacao == (fkComputador * 4 - 1)) {
                            totalComponenteDisco = totalComponente;
                        }
                    });
                });

            });
            console.log("Consegui buscar o total dos componentes!")

        } else {
            console.log("Houve um erro ao fazer o select do total dos componentes!");

            resposta.text().then((texto) => {
                console.error(texto);
            });
        }
    })
        .catch(function (erro) {
            console.log(erro);
        });

    return false;
}

var valorN = 1;



function unchekedTodos() {
    ['cpu', 'Disco', 'ram'].forEach((container) => document.getElementById(container).classList.remove("animacaoBorda"));
}

function escolherGrafico(n, container) {
    unchekedTodos();
    var boxSelecionada = document.getElementById(container);
    boxSelecionada.classList.add("animacaoBorda");

    valorN = n;
    plotarGrafico(valorN);
}


function plotarGrafico(n) {
    atualizarComponenteEscolhido(n)

    if (!funcaoAlterarEscalaMinAtivada) {
        config_graficoDesempenho.options.scales.y.min = 0;
    }

    if (!funcaoAlterarEscalaMaxAtivada) {
        config_graficoDesempenho.options.scales.y.max = 100;
    }

    switch (n) {
        case 1:
            uso_cpu.reverse();
            dataHoraLabelsCPU.reverse();
            data_graficoDesempenho.datasets[0].data = uso_cpu.slice(0, 6);
            config_graficoDesempenho.options.plugins.title.text = 'Desempenho CPU'
            data_graficoDesempenho.labels = dataHoraLabelsCPU.slice(0, 6);
            break;
        case 2:
            uso_disco.reverse();
            dataHoraLabelsDisco.reverse();
            data_graficoDesempenho.datasets[0].data = uso_disco.slice(0, 6);
            config_graficoDesempenho.options.plugins.title.text = 'Uso do disco'
            data_graficoDesempenho.labels = dataHoraLabelsDisco.slice(0, 6);
            break;
        case 3:
            uso_ram.reverse();
            dataHoraLabelsRAM.reverse();
            data_graficoDesempenho.datasets[0].data = uso_ram.slice(0, 6);
            config_graficoDesempenho.options.plugins.title.text = 'Uso da RAM';
            config_graficoDesempenho.options.scales.y.max = 100;
            data_graficoDesempenho.labels = dataHoraLabelsRAM.slice(0, 6);
            break;
    }
    graficoEmUso.update();
}

var funcaoAlterarEscalaMinAtivada = false;
var funcaoAlterarEscalaMaxAtivada = false;

document.addEventListener('keydown', function (event) {
    if (event.key === 'p') {
        alterarEscalaGraficoMin();
    }
    if (event.key === 'o') {
        alterarEscalaGraficoMax();
    }
});

function alterarEscalaGraficoMin() {
    if (config_graficoDesempenho.options.scales.y.min == 0) {
        config_graficoDesempenho.options.scales.y.min = 80;
    } else {
        config_graficoDesempenho.options.scales.y.min = 0;
    }
    graficoEmUso.update()
    funcaoAlterarEscalaMinAtivada = true;
}

function alterarEscalaGraficoMax() {
    if (config_graficoDesempenho.options.scales.y.max == 100) {
        config_graficoDesempenho.options.scales.y.max = 25;
    } else {
        config_graficoDesempenho.options.scales.y.max = 100;
    }
    graficoEmUso.update()
    funcaoAlterarEscalaMaxAtivada = true;
}

function atualizarComponenteEscolhido(n) {
    var componenteSelecionado = document.getElementById('componenteSelecionado');
    var tipoValorComponenteSelecionado = document.getElementById('tipoValorComponenteSelecionado')
    var nomeComponente = document.getElementById('nomeComponente')

    graficoDesempenho.style.paddingRight = "-2%"

    switch (n) {
        case 1:
            componenteSelecionado.innerHTML = "CPU"
            tipoValorComponenteSelecionado.innerHTML = "% de utilização"
            nomeComponente.innerHTML = "13th Gen Intel(R) Core(TM) i5-13450HX"
            break;
        case 2:
            componenteSelecionado.innerHTML = "DISCO"
            tipoValorComponenteSelecionado.innerHTML = "% utilizado"
            nomeComponente.innerHTML = "NVMe KBG50ZNS512G NVMe KIOXIA 512GB"
            break;
        case 3:
            componenteSelecionado.innerHTML = "RAM"
            tipoValorComponenteSelecionado.innerHTML = "% de utilização"
            nomeComponente.innerHTML = "";
            break;
    }
}

var metricaMedioRam;
var metricaGraveRam;
var metricaMedioCpu;
var metricaGraveCpu;
var metricaMedioDisco;
var metricaGraveDisco;

function selectMetricas() {

    if (sessionStorage.idEmpresa == null) {
        var fkEmpresa = sessionStorage.fkEmpresa
    } else {
        var fkEmpresa = sessionStorage.idEmpresa
    }
    fetch("/usuarios/selectMetricas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fkComputadorServer: fkComputador,
            fkEmpresaServer: fkEmpresa
        })
    }).then(function (resposta) {
        console.log("Estou buscando dados referente a métrica dos alertas!");

        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then((resposta) => {
                resposta.forEach((objeto) => {
                    const { medioRam, graveRam, medioCPU, graveCPU, medioDisco, graveDisco } = objeto;

                    metricaMedioRam = medioRam;
                    metricaGraveRam = graveRam;
                    metricaMedioCpu = medioCPU;
                    metricaGraveCpu = graveCPU;
                    metricaMedioDisco = medioDisco;
                    metricaGraveDisco = graveDisco;

                });
            });
            console.log("Consegui buscar a métrica dos alertas!")

        } else {
            console.log("Houve um erro ao fazer o select da métrica dos alertas!");

            resposta.text().then((texto) => {
                console.error(texto);
            });
        }
    })
        .catch(function (erro) {
            console.log(erro);
        });

    return false;
}

function selectJanelasAbertas() {

    fetch(`/usuarios/selectJanelasAbertas/${fkComputador}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(function (resposta) {
        console.log("Estou buscando dados referente as janelas abertas!");

        if (resposta.ok) {
            resposta.json().then((resposta) => {
                console.log(resposta);
                const idsJanelasNoSelect = resposta.map(objeto => objeto.idJanela);

                // Remover divs que não estão presentes no resultado do select
                listaIdsJanelas.forEach(id => {
                    if (!idsJanelasNoSelect.includes(id)) {
                        removerDivJanela(id);
                    }
                });

                resposta.forEach((objeto) => {
                    const { idJanela, titulo, comando, matar } = objeto;
                    listaIdsJanelas.push(idJanela);
                    gerarDivJanelas(idJanela, titulo, comando, matar);
                });

                console.log("Consegui buscar as janelas abertas!");

            });
        } else {
            console.log("Houve um erro ao fazer o select das janelas abertas (frontend)!");

            resposta.text().then((texto) => {
                console.error(texto);
            });
        }
    })
        .catch(function (erro) {
            console.log(erro);
        });

    return false;
}

setInterval(selectJanelasAbertas, 3000)

function removerDivJanela(idJanela) {
    var divJanela = document.getElementById(`janela${idJanela}`);
    if (divJanela) {
        divJanela.remove();
    }
}

function gerarDivJanelas(idJanela, titulo) {
    
    var divExiste = document.getElementById(`janela${idJanela}`);

    if (divExiste) {
        return;
    } else {
        titulo = removerAposQuintoEspaco(titulo);

        var janelasAbertas = document.getElementById("janelasAbertas");
    
        janelasAbertas.innerHTML += `<div class="janelaAberta" id="janela${idJanela}">
            <div class="bloquinhoEsquerdaJanelaAberta" id="bloquinhoEsquerdaJanelaAberta${idJanela}" onclick="fecharJanela(${idJanela})"></div>
            <div class="nomeJanelaAberta">
                <span>${titulo}</span>
            </div>
        </div>`;
    }
}

function removerAposQuintoEspaco(titulo) {
    let partes = titulo.split(" ");

    let primeirasCincoPartes = partes.slice(0, 4);
    return primeirasCincoPartes.join(" ");
}

var listaIdsJanelas = [];

function fecharJanela(idJanela) {
    var bloquinhoEsquerdaJanelaAberta = document.getElementById(`bloquinhoEsquerdaJanelaAberta${idJanela}`);

    bloquinhoEsquerdaJanelaAberta.style.backgroundColor = "yellow"

    fetch(`/usuarios/fecharJanela`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idJanelaServer: idJanela,
        })
    }).then(function (resposta) {
        console.log("Estou tentando matar a janela!");

        if (resposta.ok) {
            mostrarMensagemFechando();
            setTimeout(function() {
                limparMensagemFechando();
            }, 4999);
            setTimeout(function() {
                limparMensagemFechando();
                mostrarMensagemConfirmacaoJanelaFechada();
                selectJanelasAbertas();
            }, 5000);
            setTimeout(function() {
                limparMensagemConfirmacaoJanelaFechada();
            }, 7000);
            console.log("Consegui matar a janela!");
        } else {
            console.log("Houve um erro ao tentar matar a janela (frontend)!");

            resposta.text().then((texto) => {
                console.error(texto);
            });
        }
    })
        .catch(function (erro) {
            console.log(erro);
        });

    return false;
}

function mostrarMensagemConfirmacaoJanelaFechada(){
    var spanAvisoFechado = document.getElementById("spanAvisoFechado");

    spanAvisoFechado.style.display = "flex"
}

function limparMensagemConfirmacaoJanelaFechada(){
    var spanAvisoFechado = document.getElementById("spanAvisoFechado");

    spanAvisoFechado.style.display = "none"
}

function mostrarMensagemFechando(){
    var spanAvisoFechando = document.getElementById("spanAvisoFechando");

    spanAvisoFechando.style.display = "flex"
}

function limparMensagemFechando(){
    var spanAvisoFechando = document.getElementById("spanAvisoFechando");

    spanAvisoFechando.style.display = "none"
}

function validarMostrarJanelas(){
    var botaoListarJanelas = document.getElementById("botaoListarJanelas");

    if(fkComputador != 1){
        botaoListarJanelas.style.display = "none"
    } else {
        botaoListarJanelas.style.display = "flex"
    }
}
