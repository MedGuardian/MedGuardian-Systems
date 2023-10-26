function voltarDashboardGeral() {
    window.location.href = '../dashboard.html'
}


const graficoDesempenho = document.getElementById("graficoDesempenho")
var atual = [91, 12, 62, 73, 14, 73];

const data_graficoDesempenho = {
    labels: ['10:53:13','10:53:16','10:53:19','10:53:22','10:53:25','10:53:29'],
    datasets: [
        {
            label: "Desempenho",
            data: atual,
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
                    color: '#2E2109;',
                    font: {
                        size: 0,
                        family: 'LeagueSpartan',
                        weight: 800
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

function escolherGrafico(n) {
    atualizarGrafico(n)
}

function atualizarGrafico(n) {
    atualizarComponenteEscolhido(n)
    switch (n) {
        case 1:
            data_graficoDesempenho.datasets[0].data = [62, 74, 13, 75, 12, 64]
            config_graficoDesempenho.options.plugins.title.text = 'Desempenho CPU'

            break;
        case 2:
            data_graficoDesempenho.datasets[0].data = [93, 26, 31, 65, 36, 14]
            config_graficoDesempenho.options.plugins.title.text = 'Uso Disco'
            break;
        case 3:
            data_graficoDesempenho.datasets[0].data = [78, 23, 16, 53, 14, 75]
            config_graficoDesempenho.options.plugins.title.text = 'Uso Memória RAM'
            break;
    }

    graficoEmUso.update();
}

function atualizarComponenteEscolhido(n){
    var componenteSelecionado = document.getElementById('componenteSelecionado');
    var tipoValorComponenteSelecionado = document.getElementById('tipoValorComponenteSelecionado')
    var nomeComponente = document.getElementById('nomeComponente')

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

