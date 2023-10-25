function voltarIndex() {
    window.location.href = '../index.html'
}

function sairDaDashboard() {
    window.location.href = '../index.html'
}

const grafico1 = document.getElementById("grafico1")

var maximo = 100;
var atual = 91;

var emUso = (atual * 100) / (maximo);

const data_grafico1 = {
    labels: ["Em uso", "Disponível"],
    datasets: [
        {
            label: [],
            data: [emUso, (100 - emUso)],
            backgroundColor: [
                '#04AF26',
                '#006432'
            ],
            borderColor: 'rgba(0,0,0, 0.1)',
            borderWidth: 2
        }
    ]
};

// A CONSTANTE ABAIXO GUARDA OS VALORES DA TEMPERATURA E UMIDADE EM FORMATO DE VETOR, SERÁ "TRANSFORMADO" EM NÚMERO MAIS ADIANTE.
// RECEBE OS DADOS DO SETOR 6, DENTRO DO DATASETS, ACHA (FIND) NO DATASET.LABEL DA TEMPERATURA OU DA UMIDADE.

const config_grafico1 = {
    type: 'pie',
    data: data_grafico1,
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    beginAtZero: true,
                    color: '#2E2109;',
                    font: {
                        size: 0,
                        family: 'Montserrat Ace',
                        weight: 500
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
                        family: 'Montserrat Ace',
                        weight: 500
                    }
                }
            }
        },
        plugins: {
            title: {
                display: false,
                text: 'SETOR 1',
                font: {
                    size: 18,
                    color: 'black',
                    family: 'Montserrat Ace',
                    weight: 800
                }

            },
            legend: {
                labels: {
                    font: {
                        size: 12,
                        family: 'Montserrat Ace',
                        weight: 500
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        var label = context.label || '';
                        var value = context.parsed || 0;
                        return label + ': ' + value + '%';
                    }
                }
            }
        }
    }
};

const grafico_1 = new Chart(grafico1, config_grafico1);

const grafico2 = document.getElementById("grafico2")

var maximo = 100;
var atual = 64;

var emUso = (atual * 100) / (maximo);

const data_grafico2 = {
    labels: ["Em uso", "Disponível"],
    datasets: [
        {
            label: [],
            data: [emUso, (100 - emUso)],
            backgroundColor: [
                '#04AF26',
                '#006432'
            ],
            borderColor: 'rgba(0,0,0, 0.1)',
            borderWidth: 2
        }
    ]
};

// A CONSTANTE ABAIXO GUARDA OS VALORES DA TEMPERATURA E UMIDADE EM FORMATO DE VETOR, SERÁ "TRANSFORMADO" EM NÚMERO MAIS ADIANTE.
// RECEBE OS DADOS DO SETOR 6, DENTRO DO DATASETS, ACHA (FIND) NO DATASET.LABEL DA TEMPERATURA OU DA UMIDADE.

const config_grafico2 = {
    type: 'pie',
    data: data_grafico2,
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    beginAtZero: true,
                    color: '#2E2109;',
                    font: {
                        size: 0,
                        family: 'Montserrat Ace',
                        weight: 500
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
                        family: 'Montserrat Ace',
                        weight: 500
                    }
                }
            }
        },
        plugins: {
            title: {
                display: false,
                text: 'SETOR 1',
                font: {
                    size: 18,
                    color: 'black',
                    family: 'Montserrat Ace',
                    weight: 800
                }

            },
            legend: {
                labels: {
                    font: {
                        size: 12,
                        family: 'Montserrat Ace',
                        weight: 500
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        var label = context.label || '';
                        var value = context.parsed || 0;
                        return label + ': ' + value + '%';
                    }
                }
            }
        }
    }
};

const grafico_2 = new Chart(grafico2, config_grafico2);

const grafico3 = document.getElementById("grafico3")

var maximo = 100;
var atual = 9;

var emUso = (atual * 100) / (maximo);

const data_grafico3 = {
    labels: ["Em uso", "Disponível"],
    datasets: [
        {
            label: [],
            data: [emUso, (100 - emUso)],
            backgroundColor: [
                '#04AF26',
                '#006432'
            ],
            borderColor: 'rgba(0,0,0, 0.1)',
            borderWidth: 2
        }
    ]
};

// A CONSTANTE ABAIXO GUARDA OS VALORES DA TEMPERATURA E UMIDADE EM FORMATO DE VETOR, SERÁ "TRANSFORMADO" EM NÚMERO MAIS ADIANTE.
// RECEBE OS DADOS DO SETOR 6, DENTRO DO DATASETS, ACHA (FIND) NO DATASET.LABEL DA TEMPERATURA OU DA UMIDADE.

const config_grafico3 = {
    type: 'pie',
    data: data_grafico3,
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    beginAtZero: true,
                    color: '#2E2109;',
                    font: {
                        size: 0,
                        family: 'Montserrat Ace',
                        weight: 500
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
                        family: 'Montserrat Ace',
                        weight: 500
                    }
                }
            }
        },
        plugins: {
            title: {
                display: false,
                text: 'SETOR 1',
                font: {
                    size: 18,
                    color: 'black',
                    family: 'Montserrat Ace',
                    weight: 800
                }

            },
            legend: {
                labels: {
                    font: {
                        size: 12,
                        family: 'Montserrat Ace',
                        weight: 500
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        var label = context.label || '';
                        var value = context.parsed || 0;
                        return label + ': ' + value + '%';
                    }
                }
            }
        }
    }
};

const grafico_3 = new Chart(grafico3, config_grafico3);

const grafico4 = document.getElementById("grafico4")

var maximo = 100;
var atual = 38;

var emUso = (atual * 100) / (maximo);

const data_grafico4 = {
    labels: ["Em uso", "Disponível"],
    datasets: [
        {
            label: [],
            data: [emUso, (100 - emUso)],
            backgroundColor: [
                '#04AF26',
                '#006432'
            ],
            borderColor: 'rgba(0,0,0, 0.1)',
            borderWidth: 2
        }
    ]
};

// A CONSTANTE ABAIXO GUARDA OS VALORES DA TEMPERATURA E UMIDADE EM FORMATO DE VETOR, SERÁ "TRANSFORMADO" EM NÚMERO MAIS ADIANTE.
// RECEBE OS DADOS DO SETOR 6, DENTRO DO DATASETS, ACHA (FIND) NO DATASET.LABEL DA TEMPERATURA OU DA UMIDADE.

const config_grafico4 = {
    type: 'pie',
    data: data_grafico4,
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    beginAtZero: true,
                    color: '#2E2109;',
                    font: {
                        size: 0,
                        family: 'Montserrat Ace',
                        weight: 500
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
                        family: 'Montserrat Ace',
                        weight: 500
                    }
                }
            }
        },
        plugins: {
            title: {
                display: false,
                text: 'SETOR 1',
                font: {
                    size: 18,
                    color: 'black',
                    family: 'Montserrat Ace',
                    weight: 800
                }

            },
            legend: {
                labels: {
                    font: {
                        size: 12,
                        family: 'Montserrat Ace',
                        weight: 500
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        var label = context.label || '';
                        var value = context.parsed || 0;
                        return label + ': ' + value + '%';
                    }
                }
            }
        }
    }
};

const grafico_4 = new Chart(grafico4, config_grafico4);

