selectTotalComponentes();

function voltarDashboardGeral() {
    window.location.href = '../dashboard.html'
}

const graficoDesempenho = document.getElementById("graficoDesempenho")

var labelsGrafico = [];
const data_graficoDesempenho = {
    labels: dataHoraLabels,
    datasets: [
        {
            label: "Desempenho",
            data: [],
            backgroundColor: 'rgba(0, 189, 6, .15)',
            borderColor: 'rgba(0, 189, 6, 1)',
            pointBackgroundColor: '#164018',
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
                max: 100,
                grid: {
                    display: true
                },
                ticks: {
                    beginAtZero: true,
                    color: '#2E2109;',
                    font: {
                        size: 20,
                        family: 'LeagueSpartan',
                        weight: 400
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
                        size: 12,
                        family: 'LeagueSpartan',
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
                    size: 25,
                    color: 'black',
                    family: 'LeagueSpartan',
                    weight: 600
                }

            },
            legend: {
                display: false,
                labels: {
                    font: {
                        size: 20,
                        color: 'white',
                        family: 'LeagueSpartan',
                        weight: 600,
                        padding: 20
                    }
                }
            }
        }
    }
};

const graficoEmUso = new Chart(graficoDesempenho, config_graficoDesempenho);

const uso_cpu = [];
const uso_ram = [];
const uso_disco = [];
var dataHoraLabels = [];
const threads = 0;
const processos = 0;
const velocidade_de_rede = 0;
const tempo_atividade_segundos = 0;
const tempo_atividade_minutos = 0;
const tempo_atividade_horas = 0;
const tempo_atividade_dias = 0;
const velocidade_processador = 0;


function atualizarGrafico() {

    fetch("/usuarios/atualizarGrafico", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(function (resposta) {
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

                            if(fkEspecificacao == 2){
                                if (uso_ram.length >= 6) {
                                    uso_ram.shift();
                                    uso_cpu.shift();
                                    uso_disco.shift();
                                    dataHoraLabels.shift();
                                }
                                var porcentagemUsoRam = registro * 100 / totalComponenteRam;
                                uso_ram.push(porcentagemUsoRam);
                                dataHoraLabels.push(`${hora}:${minuto}:${segundo}`)
                            }                            
                        });
                    });

                });

                plotarGrafico(1);
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


setInterval(atualizarGrafico, 3000)

var totalComponenteRam = 0;
var totalComponenteCPU = 0;
var totalComponenteDisco = 0;

function selectTotalComponentes(){
    fetch("/usuarios/selectTotalComponentes", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(function (resposta) {
            console.log("Estou buscando dados referente a capacidade total dos componentes!");

            if (resposta.ok) {
                console.log(resposta);
                resposta.json().then((resposta) => {
                    resposta.forEach((especificacao) => {
                        especificacao.forEach((objeto) => {
                            const { fkComponente, totalComponente } = objeto;

                            if(fkComponente == 2){
                                totalComponenteRam = totalComponente;
                            }                 
                            console.log(totalComponenteRam)       
                        });
                    });
                    
                });

                
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

function escolherGrafico(n) {
    plotarGrafico(n)
}

function plotarGrafico(n) {
    atualizarComponenteEscolhido(n)
    switch (n) {
        case 1:
            uso_ram.reverse();
            dataHoraLabels.reverse();
            data_graficoDesempenho.datasets[0].data = uso_ram.slice(0,6);
            config_graficoDesempenho.options.plugins.title.text = 'Desempenho CPU'
            data_graficoDesempenho.labels = dataHoraLabels.slice(0,6);
            break;
        case 2:
            data_graficoDesempenho.datasets[0].data = uso_ram.slice(0,6)
            config_graficoDesempenho.options.plugins.title.text = 'Uso Disco'
            break;
        case 3:
            data_graficoDesempenho.datasets[0].data = uso_ram.slice(0,6)
            config_graficoDesempenho.options.plugins.title.text = 'Uso Memória RAM'
            break;
    }

    graficoEmUso.update();
}

function atualizarComponenteEscolhido(n){
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

var dias = 0;
var horas = 23;
var minutos = 59;
var segundos = 55;

function atualizarTempoAtividade() {
    const valorCronometroDias = document.getElementById('valorCronometroDias');
    const valorCronometroHoras = document.getElementById('valorCronometroHoras');
    const valorCronometroMinutos = document.getElementById('valorCronometroMinutos');
    const valorCronometroSegundos = document.getElementById('valorCronometroSegundos');

    segundos++
    
    if (segundos == 60) {
        segundos = 0
        minutos++
    }

    if (minutos == 60) {
        minutos = 0
        horas++
    }

    if (horas == 24) {
        horas = 0
        dias++
    }

    valorCronometroDias.innerHTML = dias;
    valorCronometroHoras.innerHTML = horas;
    valorCronometroMinutos.innerHTML = minutos;
    valorCronometroSegundos.innerHTML = segundos;
}

setInterval(atualizarTempoAtividade, 1000);

function atualizarCoresCardsLaterais(){
    var divValorBoxLateralCpu = document.getElementById('divValorBoxLateralCpu');
    var divValorBoxLateralDisco = document.getElementById('divValorBoxLateralDisco');
    var divValorBoxLateralRam = document.getElementById('divValorBoxLateralRam');

    var spanValorBoxLateralCpu = document.getElementById('spanValorBoxLateralCpu');
    var spanValorBoxLateralDisco = document.getElementById('spanValorBoxLateralDisco');
    var spanValorBoxLateralRam = document.getElementById('spanValorBoxLateralRam');

    var vetorValores = atualizarValoresCardsLaterais();

    spanValorBoxLateralCpu.innerHTML = vetorValores[0];
    spanValorBoxLateralDisco.innerHTML = vetorValores[1];
    spanValorBoxLateralRam.innerHTML = vetorValores[2];

    if(vetorValores[0] > 80){
        divValorBoxLateralCpu.style.backgroundColor = 'rgba(255,0,0,.5)'
    } else if (vetorValores[0] > 70){
        divValorBoxLateralCpu.style.backgroundColor = 'yellow'
    } else {
        divValorBoxLateralCpu.style.backgroundColor = '#718672'
    }

    if(vetorValores[1] > 80){
        divValorBoxLateralDisco.style.backgroundColor = 'rgba(255,0,0,.5)'
    } else if (vetorValores[1] > 70){
        divValorBoxLateralDisco.style.backgroundColor = 'yellow'
    } else {
        divValorBoxLateralDisco.style.backgroundColor = '#718672'
    }

    var porcentagemUsoRam = (vetorValores[2] * 100) / 7.8;

    if(porcentagemUsoRam > 90){
        divValorBoxLateralRam.style.backgroundColor = 'rgba(255,0,0,.5)'
    } else if (porcentagemUsoRam > 80){
        divValorBoxLateralRam.style.backgroundColor = 'yellow'
    } else {
        divValorBoxLateralRam.style.backgroundColor = '#718672'
    }
}

function atualizarValoresCardsLaterais(){
    var numeroAleatorioCpu = Math.floor(Math.random() * 101);
    var numeroAleatorioDisco = Math.floor(Math.random() * 101);
    var numeroAleatorioRam = (Math.random() * 7.8).toFixed(1);;

    return [numeroAleatorioCpu, numeroAleatorioDisco, parseFloat(numeroAleatorioRam)]
}

setInterval(atualizarCoresCardsLaterais, 3000)



