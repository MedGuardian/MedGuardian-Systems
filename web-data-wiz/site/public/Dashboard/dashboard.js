function voltarIndex() {
    window.location.href = '../index.html'
}

function sairDaDashboard() {
    window.location.href = '../index.html'
}

function abrirDashboardEspecifica(){
    window.location.href = 'DashboardEspecifica/dashboardespecifica.html'
}

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

    // Chama selectComputador e aguarda a resolução da Promessa
    selectComputador().then(idComputadorVar => {
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
            console.log("Estou tentando excluir a máquina desejada!")
            if (resposta.ok) {
                console.log(resposta);
                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    alert("Máquina: Notebook-Lucas excluída")
                    fecharModal();
                });
            } else {
                alert("Erro na exclusão da maquina!")
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        }).catch(function (erro) {
            console.log(erro);
        });
    });

    return false;
}

function selectComputador() {
    var nomeMaquinaVar = "Notebook-Lucas";

    // Retorna a Promessa
    return fetch("/usuarios/selectComputador", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeMaquinaServer: nomeMaquinaVar,
        })
    }).then(function (resposta) {
        console.log("Estou tentando fazer o select do computador!")
        if (resposta.ok) {
            return resposta.json().then(jsonArray => {
                console.log(jsonArray);

                // Retorna o idComputador da primeira entrada (se houver)
                if (jsonArray.length > 0) {
                    const primeiroComputador = jsonArray[0];
                    console.log("ID do primeiro computador:", primeiroComputador.idComputador);
                    return primeiroComputador.idComputador;
                } else {
                    console.log("Não foi encontrado nenhuma máquina com o ID e/ou Nome associado!")
                    return null;
                }
            });
        } else {
            alert("Erro ao fazer o select do computador!");
            return Promise.reject("Erro ao fazer o select do computador!");
        }
    }).catch(function (erro) {
        console.log(erro);
        return null;
    });
}

  function personalizado() {
    var modal = document.getElementById('data-input');
    modal.innerHTML = ' ';
    modal.innerHTML = ` <input type="text" name="datetimes" id="litepicker"/>`;
    let input = document.getElementById('litepicker');
    let now = new Date();
    let picker = new Litepicker({
      element: input,
      format: 'YYYY-MM-DD',
      singleMode: false,
      numberOfMonths: 2,
      numberOfColumns: 2,
      showTooltip: true,
      scrollToDate: true,
      startDate: new Date(now).setDate(now.getDate() - 1),
      endDate: new Date(now),
      setup: function (picker) {
        picker.on('selected', function (date1, date2) {
          let formattedDate1 = date1.format('YYYY-MM-DD');
          let formattedDate2 = date2.format('YYYY-MM-DD');
  
          console.log(`${formattedDate1}, ${formattedDate2}`);
          fazerRequisicao(formattedDate1, formattedDate2);
        });
      }
    });
  }
  

  function fazerRequisicao(data1, data2){
    var data = [];
    sessionStorage.setItem('Personalizado', data);

    fetch("/usuarios/selectIntervaloData", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            date1Server: data1,
            date2Server: data2,
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO intervalo()!")
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
