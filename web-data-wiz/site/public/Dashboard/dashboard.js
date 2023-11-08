function voltarIndex() {
    window.location.href = '../index.html'
}

function sairDaDashboard() {
    window.location.href = '../index.html'
}

function abrirDashboardEspecifica(){
    window.location.href = 'DashboardEspecifica/dashboardespecifica.html'
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

function fecharModal(){
    const modalExcluirMaquina = document.getElementById("modalExcluirMaquina");
    const overlay = document.getElementById("overlay");
    const AlterarMaquina = document.getElementById("AlterarMaquina");
  
    AlterarMaquina.style.display = "none"
    modalExcluirMaquina.style.display = "none";
    overlay.style.display = "none";
  }

  function abrirModalExcluirMaquina(){
    const modalExcluirMaquina = document.getElementById("modalExcluirMaquina");
    const overlay = document.getElementById("overlay");
  
    modalExcluirMaquina.style.display = "block";
    overlay.style.display = "block";
  
    window.scrollTo({
      top: 0,
      behavior: "smooth" 
    });
  
  }

  function abrirModalAlterarMaquina(){
    const AlterarMaquina = document.getElementById("AlterarMaquina");
    const overlay = document.getElementById("overlay");
  
    AlterarMaquina.style.display = "block";
    overlay.style.display = "block";
  
    window.scrollTo({
      top: 0,
      behavior: "smooth" 
    });
  
  }

  const iconeLixeira = document.getElementById('iconeLixeira');
const maquina1 = document.getElementById('maquina1');
const iconeAlterarMaquina = document.getElementById('iconeAlterarMaquina')

// Função associada à div exterior
function funcaoDivExterior() {
  console.log('Função da Div Exterior');
}

// Função associada à div interior
function funcaoDivInterior() {
  console.log('Função da Div Interior');
}

maquina1.addEventListener('click', (event) => {
  if (event.target === maquina1 || maquina1.contains(event.target)) {
    abrirDashboardEspecifica();
  }
});

iconeLixeira.addEventListener('click', (event) => {
  if (event.target === iconeLixeira) {
    abrirModalExcluirMaquina();
  }
});

iconeAlterarMaquina.addEventListener('click', (event) => {
    if (event.target === iconeAlterarMaquina) {
      abrirModalAlterarMaquina();
    }
  });

  function excluirMaquina() {
    
    var nomeMaquinaVar = "Notebook-Lucas";

    var idComputadorVar = 1;
    deletarTuplaPeloId(1);

    fetch("/usuarios/excluirMaquina", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeMaquinaServer: nomeMaquinaVar,
            idComputadorServer: idComputadorVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                
                alert("Máquina: Notebook-Lucas excluída")

            });

        } else {
            alert("Erro na exclusão!")

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

var idComputador;

function selectComputador() {
    
    var nomeMaquinaVar = "Notebook-Lucas";

    fetch("/usuarios/excluirMaquina", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeMaquinaServer: nomeMaquinaVar,
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                idComputador = json.idComputador
                alert("Fiz o select do computador! ID: " + idComputador)
                return idComputador;
            });

        } else {
            alert("Erro na exclusão!")

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function deletarTuplaPeloId(idComputador){

    var fkComputadorVar = idComputador;

    fetch("/usuarios/deletarTuplaPeloId", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fkComputadorServer: fkComputadorVar,
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                idComputador = json.idComputador
                alert("Deletei a tupla do spec")
                return idComputador;
            });

        } else {
            alert("Erro na exclusão!")

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}


function diario() {
    var modal = document.getElementById('data-input')
    modal.innerHTML = ' '
    var data = [];

    fetch("/usuarios/selectDataDia", {
        method: "POST"
        
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO diario()!")
        console.log(`Dados atuais do gráfico:`);
        console.log(resposta);
        
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                data.push(json);
                return data;
            });

        } else {
            alert("Erro ao captar os dados!")

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;

  }
  function semanal() {
    var modal = document.getElementById('data-input')
    modal.innerHTML = ' '
    var data = [];
    fetch("/usuarios/selectDataSemana", {
        method: "POST"
        
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO diario()!")
        console.log(`Dados atuais do gráfico:`);
        console.log(data);
        console.log(resposta);
        
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                data.push(json);
                return data;
            });

        } else {
            alert("Erro ao captar os dados!")

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;

  }
  function mensal() {
    var modal = document.getElementById('data-input')
    modal.innerHTML = ' '
    var data = [];
    fetch("/usuarios/selectDataMes", {
        method: "POST"
        
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO diario()!")
        console.log(`Dados atuais do gráfico:`);
        console.log(data);
        console.log(resposta);
        
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                data.push(json);
                return data;
            });

        } else {
            alert("Erro ao captar os dados!")

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
  }
  function personalizado() {
    var modal = document.getElementById('data-input')
    modal.innerHTML = ' '
    var data = [];

    fetch("/usuarios/selectIntervaloData", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO diario()!")
        if (resposta.ok) {
            console.log("Estou dentro do IF!")

            console.log(resposta);
            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                data = json.data
                alert("Fiz o select das Datas! Datas: " + data)
                return data;
            });

        } else {
            alert("Erro ao captar os dados!")

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
  }