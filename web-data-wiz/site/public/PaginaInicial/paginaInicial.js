
  // Função para verificar a largura da janela e atualizar o texto da div com base na resolução
  function atualizarTextoComBaseNaResolucao() {
    const spanConteudoSuperiorEsquerdaSobreNos = document.getElementById('conteudoSuperiorEsquerdaSobreNos');
    const spanConteudoMeioEsquerdaSobreNos = document.getElementById("conteudoMeioEsquerdaSobreNos");
    const spanConteudoInferiorEsquerdaSobreNos = document.getElementById('conteudoInferiorEsquerdaSobreNos');
    const spanConteudoSuperiorDireitaSobreNos = document.getElementById("conteudoSuperiorDireitaSobreNos");
    const spanConteudoMeioDireitaSobreNos = document.getElementById('conteudoMeioDireitaSobreNos');
    const spanConteudoInferiorDireitaSobreNos = document.getElementById("conteudoInferiorDireitaSobreNos");
    
    const spanTextoMissao = document.getElementById("textoMissao");
    const spanTextoVisao = document.getElementById("textoVisao");
    const spanTextoValores = document.getElementById("textoValores");


    const larguraJanela = window.innerWidth;

    if (larguraJanela < 768) { // Por exemplo, mude para a largura desejada
      spanConteudoSuperiorEsquerdaSobreNos.innerHTML = 'Acesso rápido a informações relevantes sobre os pacientes.';
      spanConteudoMeioEsquerdaSobreNos.innerHTML = 'Dados centralizados para analize de tendencias, surtos e doenças  para pevenção populacional';
      spanConteudoInferiorEsquerdaSobreNos.innerHTML = 'As informações armazenadas podem ser usadas para apoiar decisões estratégicas e desenvolvimento de políticas de saúde.';
      spanConteudoSuperiorDireitaSobreNos.innerHTML = ' Sistema permitirá que os  profissionais de saúde compartilhem informações de forma rápida e eficaz.';
      spanConteudoMeioDireitaSobreNos.innerHTML = 'Dados precisos e atualizados em tempo real, os erros podem ser minimizados, aumentando a segurança do paciente.';
      spanConteudoInferiorDireitaSobreNos.innerHTML = 'Pacientes podem acessar seus próprios registros médicos de forma segura.';

      spanTextoMissao.innerHTML = 'Capacitar e monitorar os sistema e garantir a segurança e eficiência e de seus dados por meio da monitoração avançada de computadores.';
      spanTextoVisao.innerHTML = 'Ser reconhecidos como o parceiros de confiança quando se trata de gerenciar o desempenho de computadores e coleta de dados.';
      spanTextoValores.innerHTML = 'Inovação. Excelência. Colaboração. Entender necessidades. Responsabilidade. Sustentabilidade.';
    } else {
      spanConteudoSuperiorEsquerdaSobreNos.innerHTML = 'Ao ter acesso rápido a informações relevantes sobre os pacientes, os profissionais de saúde podem tomar decisões mais informadas, proporcionando um atendimento mais preciso e personalizado.';
      spanConteudoMeioEsquerdaSobreNos.innerHTML = 'Ao centralizar os dados de pacientes, será possível realizar análises de tendências de saúde, identificar surtos de doenças e tomar medidas preventivas em nível populacional.';
      spanConteudoInferiorEsquerdaSobreNos.innerHTML = 'As informações armazenadas podem ser usadas para apoiar decisões estratégicas relacionadas à alocação de recursos, planejamento de atendimento e desenvolvimento de políticas de saúde.';
      spanConteudoSuperiorDireitaSobreNos.innerHTML = 'Com dados precisos e atualizados disponíveis eletronicamente, os erros relacionados àadministração incorreta de medicamentos, alergias e histórico médico podem ser minimizados, aumentando a segurança do paciente.';
      spanConteudoMeioDireitaSobreNos.innerHTML = 'O sistema permitirá que os médicos, enfermeiros e outros profissionais de saúdecompartilhem informações de forma rápida e eficaz, melhorando a colaboração e a coordenação no cuidado do paciente.';
      spanConteudoInferiorDireitaSobreNos.innerHTML = 'O sistema permitirá que pacientes acessem seus próprios registros médicos de forma segura, incentivando a participação ativa na gestão de sua saúde.';

      spanTextoMissao.innerHTML = 'Nossa missão é capacitar e monitorar os sistemas para garantir a segurança, a eficiência e a integridade de seus dados por meio da monitoração avançada de computadores. Através do nosso sistema de monitoramento de coleta e armazenamento de dados, estamos comprometidos em oferecer soluções de monitoramento inteligentes, permitindo que nossos clientes tomem decisões informadas, protejam suas informações sensíveis e otimizem o desempenho de suas operações.'
      spanTextoVisao.innerHTML = 'Nossa visão é liderar a indústria de monitoramento de computadores, sendo reconhecidos como o parceiro de confiança quando se trata de gerenciar o desempenho de computadores que coletam dado. Planejamos alcançar isso expandindo nossa presença global, desenvolvendo constantemente tecnologias inovadoras e oferecendo um serviço excepcional.'
      spanTextoValores.innerHTML = ' Estamos comprometidos com a constante busca por inovação e excelência. Acreditamos no poder da colaboração. Trabalhamos em estreita parceria com nossos clientes para entender suas necessidades.Reconhecemos nossa responsabilidade em contribuir positivamente para a sociedade. Promovemos práticas sustentáveis, respeitamos normas legais e éticas e buscamos oportunidades de impacto social positivo através de nossa tecnologia.'
    }
  }

  // Chame a função uma vez para configurar o texto inicial com base na resolução atual
  setInterval (atualizarTextoComBaseNaResolucao, 1)

function telaContato(){
  const modalContato = document.getElementById("modalContato");
  const overlay = document.getElementById("overlay");

  modalContato.style.display = "block";
  overlay.style.display = "block";

  window.scrollTo({
    top: 0,
    behavior: "smooth" 
  });

}

function fecharModal(){
  const modalContato = document.getElementById("modalContato");
  const overlay = document.getElementById("overlay");

  modalContato.style.display = "none";
  overlay.style.display = "none";
}

  
  
