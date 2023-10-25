function voltarDashboardGeral() {
    window.location.href = '../dashboard.html'
}


const graficoDesempenho = document.getElementById("graficoDesempenho")
var atual = [91, 12, 62, 73, 14, 73];

const data_graficoDesempenho = {
    labels: ["a", "b", "c", "d", "e", "f"],
    datasets: [
        {
            label: "Desempenho",
            data: atual,
            backgroundColor: 'rgba(0, 189, 6, .1)',
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



var dias = 0;
var horas = 0;
var minutos = 0;
var segundos = 0;

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
