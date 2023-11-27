selectComputadores();
selectTotalComponentes();
// setInterval(selectAlertas, 3000)

var totalComponenteRam = 0;
var totalComponenteCPU = 0;
var totalComponenteDisco = 0;

function selectTotalComponentes() {
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

              if (fkComponente == 1) {
                totalComponenteCPU = totalComponente;
              } else if (fkComponente == 2) {
                totalComponenteRam = totalComponente;
              } else if (fkComponente == 3) {
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



function voltarIndex() {
  window.location.href = '../index.html'
}

function sairDaDashboard() {
  window.location.href = '../index.html'
}

function fecharModal() {
  const modalExcluirMaquina = document.getElementById("modalExcluirMaquina");
  const overlay = document.getElementById("overlay");
  const AlterarMaquina = document.getElementById("AlterarMaquina");

  AlterarMaquina.style.display = "none"
  modalExcluirMaquina.style.display = "none";
  overlay.style.display = "none";
}

var idMaquinaExcluida = null;

function abrirModalExcluirMaquina(idComputador) {

  idMaquinaExcluida = idComputador;

  const modalExcluirMaquina = document.getElementById("modalExcluirMaquina");
  const overlay = document.getElementById("overlay");

  modalExcluirMaquina.style.display = "block";
  overlay.style.display = "block";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });



}

function abrirModalAlterarMaquina() {
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

  var idComputadorVar = idMaquinaExcluida;

  // Chama selectComputador e aguarda a resolução da Promessa
  fetch("/usuarios/excluirMaquina", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      idComputadorServer: idComputadorVar
    })
  }).then(function (resposta) {
    console.log("Estou tentando excluir a máquina desejada!")
    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then(json => {
        console.log(json);
        console.log(JSON.stringify(json));
        alert("Máquina de ID: " + idComputadorVar + " excluída!")
        fecharModal();
        removerDivMaquinaExcluida(idComputadorVar);
      });
    } else {
      alert("Erro na exclusão da maquina! ")
      resposta.text().then(texto => {
        console.error(texto);
      });
    }
  }).catch(function (erro) {
    console.log(erro);
  });

  return false;
}

function removerDivMaquinaExcluida(idComputador) {
  var divRemovida = document.getElementById(`maquina${idComputador}`);

  if (divRemovida && divRemovida.parentNode) {
    divRemovida.parentNode.removeChild(divRemovida);
  } else {
    console.log("Não foi possível encontrar ou remover a div.");
  }
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

async function selectLocalComputador(idEmpresa) {
  try {
    const resposta = await fetch("/usuarios/selectLocalComputador", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fkEmpresaServer: idEmpresa,
      }),
    });

    if (resposta.ok) {
      const data = await resposta.json();
      var endereco = `${data[0].logradouro}, ${data[0].numeroEmpresa} - ${data[0].complementoEmpresa}`
      console.log("Deu certo seu select do local dos computadores!");
      return endereco;
    } else {
      throw "Houve um erro no select do local dos computadores(FrontEnd)!";
    }
  } catch (error) {
    console.log(`#ERRO: ${error}`);
    return null; // ou outra forma de lidar com o erro
  }
}

var contador = 0;
var idComputadorFinal = 0;
var idsComputadores = [];

async function selectComputadores() {
  try {
    if (sessionStorage.idEmpresa == null) {
      var idEmpresa = sessionStorage.fkEmpresa;
    } else {
      var idEmpresa = sessionStorage.idEmpresa;
    }

    const endereco = await selectLocalComputador(idEmpresa);
    console.log("Endereço retornado:", endereco);

    const resposta = await fetch("/usuarios/selectComputadores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fkEmpresaServer: idEmpresa,
      }),
    });

    if (resposta.ok) {
      idsComputadores = [];
      const data = await resposta.json();
      var contador = 0;
      data.forEach((computador, i) => {
        const { idComputador, nomeComputador, sistemaOperacional } = computador;
        idsComputadores.push(idComputador);
        if (i % 4 == 0) {
          contador++
          gerarDivPaiComputadoresCadastrados(contador)
        }
        gerarDivFilhoComputadoresCadastrados(idComputador, nomeComputador, sistemaOperacional, endereco, i, contador)
      });
      console.log("Deu certo seu select dos computadores!");
    } else {
      throw "Houve um erro no select dos computadores(FrontEnd)!";
    }
  } catch (error) {
    console.log(`#ERRO: ${error}`);
    // Trate o erro conforme necessário
  }
}

function gerarDivPaiComputadoresCadastrados(contador) {
  console.log(contador)
  var conteudoDashboardMaquinas = document.getElementById("conteudoDashboardMaquinas");
  conteudoDashboardMaquinas.innerHTML += `<div class="maquinasCadastradas" id="maquinasCadastradas${contador}"></div>`;
  console.log("Criei o bloco horizontal")
}

function gerarDivFilhoComputadoresCadastrados(idComputador, nomeComputador, sistemaOperacional, endereco, i, contador) {
  var maquinasCadastradas = document.getElementById(`maquinasCadastradas${contador}`);
  maquinasCadastradas.innerHTML += `<div id="maquina${idComputador}" class="boxMaquinaCadastrada">
  <div class="spanIconesCardDashboard">
    <div class="spansCardDashboard" onclick="abrirDashboardEspecifica(${idComputador})">
      <div class="spanNome">
        <span>Nome:</span>
        <span id="spanNome">${nomeComputador}</span>
      </div>
      <div class="spanSO">
        <span>SO:</span>
        <span id="spanSO">${sistemaOperacional}</span>
      </div>
    </div>

    <div class="iconesCardDashboard">
      <div class="iconeAtualizarMaquina" id="iconeAlterarMaquina" onclick="abrirModalAlterarMaquina()">
        <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.06 6L12 6.94L2.92 16H2V15.08L11.06 6ZM14.66 0C14.41 0 14.15 0.1 13.96 0.29L12.13 2.12L15.88 5.87L17.71 4.04C18.1 3.65 18.1 3 17.71 2.63L15.37 0.29C15.17 0.09 14.92 0 14.66 0ZM11.06 3.19L0 14.25V18H3.75L14.81 6.94L11.06 3.19Z"
            fill="black" />
        </svg>
      </div>
      <div class="iconeRemoverMaquina" id="iconeLixeira" onclick="abrirModalExcluirMaquina(${idComputador})">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 21C6.45 21 5.979 20.804 5.587 20.412C5.195 20.02 4.99933 19.5493 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.804 20.021 18.412 20.413C18.02 20.805 17.5493 21.0007 17 21H7ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
            fill="black" />
        </svg>
      </div>
    </div>
  </div>

  <div class="iconeAlertasMaquinaCadastrada" onclick="abrirDashboardEspecifica(${idComputador})">

    <div class="icone">
      <svg width="100" height="100" viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M55.25 76.5V85H72.25V93.5H29.75V85H46.75V76.5H12.716C12.1575 76.4967 11.6052 76.3831 11.0908 76.1658C10.5763 75.9485 10.1099 75.6317 9.71817 75.2337C9.32645 74.8356 9.01719 74.3642 8.80814 73.8463C8.59909 73.3285 8.49436 72.7744 8.49997 72.216V17.034C8.49997 14.6667 10.4337 12.75 12.716 12.75H89.284C91.613 12.75 93.5 14.6582 93.5 17.0297V72.216C93.5 74.5833 91.5662 76.5 89.284 76.5H55.25Z"
          fill="black" />
      </svg>
    </div>

    <div class="alertaMaquinaCadastrada" id="alertaMaquinaCadastrada${idComputador}" onclick="abrirDashboardEspecifica(${idComputador})">

    </div>

  </div>

  <div class="localMaquinaCadastrada" onclick="abrirDashboardEspecifica(${idComputador})">
    <span>Local:</span>
    <span id="localMaquinaCadastrada">${endereco}</span>
  </div>

</div>`
}

function abrirDashboardEspecifica(idComputador) {
  window.location.href = 'DashboardEspecifica/dashboardespecifica.html?parametro=' + idComputador;
}

function selectAlertas() {
  var idEmpresa;

  if (sessionStorage.idEmpresa == null) {
    idEmpresa = sessionStorage.fkEmpresa
  } else {
    idEmpresa = sessionStorage.idEmpresa
  }

  var dataHoraAtual = new Date();

  var formatoDataHoraAtual = formatarDataHora(dataHoraAtual);
  dataHoraAtual.setSeconds(dataHoraAtual.getSeconds() - 5);
  var formatoDataHoraReduzida = formatarDataHora(dataHoraAtual);
  dataHoraAtual.setHours(dataHoraAtual.getHours() + 3);
  var formatoDataHoraMais3HorasReduzida = formatarDataHora(dataHoraAtual);
  dataHoraAtual.setSeconds(dataHoraAtual.getSeconds() + 5);
  var formatoDataHoraMais3Horas = formatarDataHora(dataHoraAtual);

  function formatarDataHora(data) {
    var ano = data.getFullYear();
    var mes = padZero(data.getMonth() + 1);
    var dia = padZero(data.getDate());
    var horas = padZero(data.getHours());
    var minutos = padZero(data.getMinutes());
    var segundos = padZero(data.getSeconds());

    return `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
  }

  function padZero(numero) {
    return numero < 10 ? '0' + numero : numero;
  }

  fetch("/usuarios/selectAlertas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fkEmpresaServer: idEmpresa,
      dataHoraAtualServer: formatoDataHoraAtual,
      dataHoraReduzidaServer: formatoDataHoraReduzida,
      dataHoraMais3HorasReduzidaServer: formatoDataHoraMais3HorasReduzida,
      dataHoraMais3HorasServer: formatoDataHoraMais3Horas
    }),
  }).then(function (resposta) {
    console.log("Estou buscando dados para atualizar a dashboard geral!");

    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then((resposta) => {
        console.log(resposta)
        resposta.forEach((alerta) => {
          const { fkComputador, fkEspecificacao, tipoAlerta } = alerta;
          validarAlertasCores(fkComputador, fkEspecificacao, tipoAlerta);
        });
      });
      console.log("Consegui retornar os dados para validar os alertas das máquinas!")
    } else {
      console.log("Houve um erro ao buscar os dados para validar os alertas das máquinas!");

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

function validarAlertasCores(fkComputador, fkEspecificacao, tipoAlerta) {

  const alertaMaquinaCadastrada = document.getElementById(`alertaMaquinaCadastrada${fkComputador}`);

  for (i = 0; i < idsComputadores.length; i++) {
    const divMaquina = document.getElementById(`maquina${idsComputadores[i]}`)
    if (idsComputadores[i] != fkComputador) {
      divMaquina.style.backgroundColor = "green"
    } else {

      if (fkEspecificacao == (fkComputador * 4 - 3)) {
        if (tipoAlerta == "Crítico") {
          removerDivAlerta(fkComputador, fkEspecificacao, "Médio")
          gerarDivAlerta(fkComputador, fkEspecificacao, tipoAlerta, "#c03221", "CPU", "#fc8374", divMaquina, alertaMaquinaCadastrada)

        } else {
          removerDivAlerta(fkComputador, fkEspecificacao, "Crítico")
          gerarDivAlerta(fkComputador, fkEspecificacao, tipoAlerta, "yellow", "CPU", "#ee9663", divMaquina, alertaMaquinaCadastrada)

        }
      } else if (fkEspecificacao == (fkComputador * 4 - 2)) {
        if (tipoAlerta == "Crítico") {
          removerDivAlerta(fkComputador, fkEspecificacao, "Médio")
          gerarDivAlerta(fkComputador, fkEspecificacao, tipoAlerta, "#c03221", "RAM", "#fc8374", divMaquina, alertaMaquinaCadastrada)

        } else {
          removerDivAlerta(fkComputador, fkEspecificacao, "Crítico")
          gerarDivAlerta(fkComputador, fkEspecificacao, tipoAlerta, "yellow", "RAM", "#ee9663", divMaquina, alertaMaquinaCadastrada)

        }
      } else if (fkEspecificacao == (fkComputador * 4 - 1)){
        if (tipoAlerta == "Crítico") {
          removerDivAlerta(fkComputador, fkEspecificacao, "Médio")
          gerarDivAlerta(fkComputador, fkEspecificacao, tipoAlerta, "#c03221", "DISCO", "#fc8374", divMaquina, alertaMaquinaCadastrada)

        } else {
          removerDivAlerta(fkComputador, fkEspecificacao, "Crítico")
          gerarDivAlerta(fkComputador, fkEspecificacao, tipoAlerta, "yellow", "DISCO", "#ee9663", divMaquina, alertaMaquinaCadastrada)

        }
      }

    }
  }

  function gerarDivAlerta(fkComputador, fkEspecificacao, tipoAlerta, corIcone, componente, corDiv, div, alertaMaquinaCadastrada) {

    const divExistente = document.getElementById(`alerta_${tipoAlerta}_${fkComputador}_${fkEspecificacao}`)

    if (divExistente) {
      console.log("Já tem o alerta do tipo: " + tipoAlerta + " do componente: " + componente);
      return
    }

    alertaMaquinaCadastrada.style.marginTop = "1%"

    alertaMaquinaCadastrada.innerHTML += `<div class="alertas" id="alerta_${tipoAlerta}_${fkComputador}_${fkEspecificacao}" onclick="abrirDashboardEspecifica(${fkComputador})">

          <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.0091 3.5L26.1228 22.75C26.2252 22.9274 26.2791 23.1285 26.2791 23.3333C26.2791 23.5381 26.2252 23.7393 26.1228 23.9167C26.0204 24.094 25.8731 24.2413 25.6958 24.3437C25.5184 24.4461 25.3173 24.5 25.1125 24.5H2.88514C2.68035 24.5 2.47917 24.4461 2.30182 24.3437C2.12447 24.2413 1.97719 24.094 1.8748 23.9167C1.77241 23.7393 1.7185 23.5381 1.71851 23.3333C1.71851 23.1285 1.77241 22.9274 1.87481 22.75L12.9885 3.5C13.0909 3.32266 13.2382 3.17539 13.4155 3.07301C13.5929 2.97062 13.794 2.91672 13.9988 2.91672C14.2036 2.91672 14.4048 2.97062 14.5821 3.07301C14.7595 3.17539 14.9067 3.32266 15.0091 3.5ZM12.8321 18.6667V21H15.1655V18.6667H12.8321ZM12.8321 10.5V16.3333H15.1655V10.5H12.8321Z"
            fill="${corIcone}" />
        </svg>
        <span>${componente}</span>

      </div>
      `;

    div.style.backgroundColor = `${corDiv}`;
  }
}

function removerDivAlerta(fkComputador, fkEspecificacao, tipoAlerta) {

  var divRemover = document.getElementById(`alerta_${tipoAlerta}_${fkComputador}_${fkEspecificacao}`)

  if (divRemover) {
    divRemover.remove();
  }
}





