function voltarDashboardGeral(){
    window.location.href = '../dashboard.html'
}

document.addEventListener("DOMContentLoaded", function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="componente"]');
    
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener("change", function() {
            if (this.checked) {
                // Desmarcar os outros checkboxes no mesmo grupo
                checkboxes.forEach(function(otherCheckbox) {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const graficoUso = document.getElementById("graficoUso")
var maximo = 100;
var atual = 91;

var emUso = (atual * 100) / (maximo);

const data_graficoUso = {
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
            borderWidth: 1
        }
    ]
};

const config_graficoUso = {
    type: 'pie',
    data: data_graficoUso,
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
                        family: 'LeagueSpartan',
                        weight: 800
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
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        var label = context.label || '';
                        var value = context.parsed || 0;
                        return label + ': ' + value + '%';
                    }
                }
            }
        }
    }
};

const graficoEmUso = new Chart(graficoUso, config_graficoUso);
});

document.addEventListener('DOMContentLoaded', function() {
    const graficoDesempenho = document.getElementById("graficoDesempenho")
var emUso = [100, 100, 100, 100, 100, 100];
var atual = [91,12,62,73,14,73];

const data_graficoDesempenho = {
    labels: ["a", "b", "c", "d", "e", "f"],
    datasets: [
        {
            label: "Desempenho",
            data: atual,
            backgroundColor: '#04AF263f',
            borderColor: 'rgba(0,0,0, 0.1)',
            borderWidth: 1,
            fill: true
        },
        {
            label: "Em uso",
            data: emUso,
            backgroundColor: '#006432',
            borderColor: 'rgba(0,0,0, 0.1)',
            borderWidth: 1
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
                        size: 0,
                        family: 'LeagueSpartan',
                        weight: 800
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
                font: {
                    size: 20,
                    color: 'black',
                    family: 'LeagueSpartan',
                    weight: 800
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
});

