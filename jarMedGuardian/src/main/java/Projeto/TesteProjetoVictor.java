package Projeto;

import com.github.britooo.looca.api.core.Looca;

import java.io.IOException;
import java.util.*;

public class TesteProjetoVictor {
    public static void main(String[] args) {

        Looca looca = new Looca();
        EnviarBDLocal bancoDeDados = new EnviarBDLocal();

        Componente HD = new Componente(looca.getGrupoDeDiscos().getDiscos().get(0).getModelo());
        Componente RAM = new Componente("RAM");
        Componente PROCESSADOR = new Componente(looca.getProcessador().getNome());
        Componente REDE = new Componente("REDE");
        Componente TEMPOATIVIDADE = new Componente("TEMPO DE ATIVIDADE");

        String nomeComputador = looca.getRede().getParametros().getNomeDeDominio();
        Integer conversorGb = 1000000000;
        Integer conversorMb = 1000000;
        Boolean logado = false;
        Integer idComputador = null;
        Integer idFuncionario = null;
        Integer hd = 0;
        String sistemaOperacional;
        int pid;

        do {
            ObterMemoriaSwap.ObterMemoriaSwap();
            System.out.println("Digite o email: ");
            Scanner leitorEmail = new Scanner(System.in);
            String email = leitorEmail.nextLine();

            System.out.println("Digite a senha: ");
            Scanner leitorSenha = new Scanner(System.in);
            String senha = leitorSenha.nextLine();
            if(!bancoDeDados.autenticarUsuario(email, senha).isEmpty()){
                logado = true;
                idFuncionario = bancoDeDados.autenticarUsuario(email, senha).get(0).getIdFuncionario();
                if(System.getProperty("os.name").toLowerCase().contains("win")){
                    sistemaOperacional = "Windows";
                } else {
                    sistemaOperacional = "Linux";
                }

                if(bancoDeDados.verificarComputadorCadastrado(nomeComputador)){
                    Integer fkEmpresaDoFuncionario = bancoDeDados.getFkEmpresaPorIdFuncionario(idFuncionario);
                    bancoDeDados.insertComputador(nomeComputador, sistemaOperacional);
                    idComputador = bancoDeDados.selectIdComputador(nomeComputador);

                    bancoDeDados.insertComponente(PROCESSADOR.getNomeComponente());
                    bancoDeDados.insertComponente(RAM.getNomeComponente());
                    if(!looca.getGrupoDeDiscos().getVolumes().isEmpty()){
                        for(int i = 0; i < looca.getGrupoDeDiscos().getQuantidadeDeDiscos(); i++) {
                            bancoDeDados.insertComponente(HD.getNomeComponente() + (i + 1));
                            hd++;
                        }
                    }
                    bancoDeDados.insertComponente(REDE.getNomeComponente());
                    bancoDeDados.insertComponente(TEMPOATIVIDADE.getNomeComponente());

                    for(int i = 0; i < bancoDeDados.selectComponente().size(); i++){
                        Integer idComponente = bancoDeDados.selectComponente().get(i).getIdComponente();

                        switch (idComponente) {
                            case 1 -> {
                                bancoDeDados.insertEspecificacao(idComputador, idComponente, looca.getGrupoDeDiscos().getDiscos().get(0).getTamanho().doubleValue() / conversorGb);
                                bancoDeDados.insertEspecificacao(idComputador, idComponente, looca.getGrupoDeDiscos().getDiscos().get(1).getTamanho().doubleValue() / conversorGb);
                            }
                            case 2 -> {
                                bancoDeDados.insertEspecificacao(idComputador, idComponente, looca.getMemoria().getTotal().doubleValue() / conversorGb);
                            }
                            case 3 -> {
                                bancoDeDados.insertEspecificacao(idComputador, idComponente, 100.);
                            }
                            case 4, 5 ->
                                    bancoDeDados.insertEspecificacao(idComputador, idComponente, null);
                        }
                    }
                } else {
                    idComputador = bancoDeDados.selectIdComputador(nomeComputador);
                }

                if(bancoDeDados.getFkEmpresaPorIdFuncionario(idFuncionario) != bancoDeDados.getFkEmpresaDaMaquinaPeloNome(nomeComputador)){
                    logado = false;
                    System.out.println("Você não é um funcionário registrado na empresa linkada a essa máquina!");
                    System.out.println("Solicite para que alguém libere seu acesso, se for o caso.");
                } else {
                    System.out.println("""
                USUÁRIO %s AUTENTICADO COM SUCESSO!
                INICIANDO A CAPTURA DE DADOS DA MÁQUINA...
                """.formatted(bancoDeDados.autenticarUsuario(email, senha).get(0).getNomeFuncionario()));
                }
            }
        } while (!logado);

<<<<<<< HEAD
        if(bancoDeDados.verificarComputadorCadastrado(nomeComputador)){
            if(System.getProperty("os.name").toLowerCase().contains("win")){
                sistemaOperacional = "Windows";
            } else {
                sistemaOperacional = "Linux";
            }
            bancoDeDados.insertComputador(nomeComputador, sistemaOperacional);
            idComputador = bancoDeDados.selectIdComputador(nomeComputador);
            if(!looca.getGrupoDeDiscos().getVolumes().isEmpty()){
                for(int i = 0; i < looca.getGrupoDeDiscos().getQuantidadeDeDiscos(); i++) {
                    bancoDeDados.insertComponente(HD.getNomeComponente() + (i + 1));
                    hd++;
                }
            }
            bancoDeDados.insertComponente(RAM.getNomeComponente());
            bancoDeDados.insertComponente(PROCESSADOR.getNomeComponente());
            bancoDeDados.insertComponente(REDE.getNomeComponente());
            bancoDeDados.insertComponente(TEMPOATIVIDADE.getNomeComponente());

            for(int i = 0; i < bancoDeDados.selectComponente().size(); i++){
                String nomeComponente = bancoDeDados.selectComponente().get(i).getNomeComponente();
                Integer idComponente = bancoDeDados.selectComponente().get(i).getIdComponente();

                switch (nomeComponente) {
                    case "HD1" -> {
                        bancoDeDados.insertEspecificacao(idComputador, idComponente, looca.getGrupoDeDiscos().getDiscos().get(0).getTamanho().doubleValue() / conversorGb);
                    }
                    case "RAM" -> {
                        bancoDeDados.insertEspecificacao(idComputador, idComponente, looca.getMemoria().getTotal().doubleValue() / conversorGb);
                    }
                    case "PROCESSADOR" ->
                            bancoDeDados.insertEspecificacao(idComputador, idComponente, 100.);
                    case "REDE", "TEMPO DE ATIVIDADE" ->
                            bancoDeDados.insertEspecificacao(idComputador, idComponente, null);
                }
            }
        } else {
            idComputador = bancoDeDados.selectIdComputador(nomeComputador);
        }

=======
>>>>>>> 701ae3186a38fd48e279b955bef5a51a99036d12
        Timer timer = new Timer();
        int delay = 0; // Tempo de espera antes da primeira execução (0 significa que será executado imediatamente)
        int interval = 5000; // Intervalo entre as execuções em milissegundos (5 segundos)

        Integer finalIdComputador = idComputador;
        timer.scheduleAtFixedRate(new TimerTask() {
            public void run() {
                System.out.println("DADOS SENDO MONITORADOS...");

                Double discoDisponivel1 = looca.getGrupoDeDiscos().getVolumes().get(0).getDisponivel().doubleValue() / conversorGb;
                Double discoDisponivel2 = looca.getGrupoDeDiscos().getVolumes().get(1).getDisponivel().doubleValue() / conversorGb;
                Double memoriaRamEmUso = looca.getMemoria().getEmUso().doubleValue() / conversorGb;
                Double processadorEmUso = looca.getProcessador().getUso();
                Double swapDisponivel = ObterMemoriaSwap.ObterMemoriaSwap().get(0).doubleValue() / conversorGb;
                Double numeroThreads = looca.getGrupoDeProcessos().getTotalThreads().doubleValue();
                Double numeroProcessos = looca.getGrupoDeProcessos().getTotalProcessos().doubleValue();
                Double redeAtual = 0.;
                Integer segundos = looca.getSistema().getTempoDeAtividade().intValue();

                Integer dias = segundos / 86400;
                segundos = segundos % 86400;

                Integer horas = segundos / 3600;
                segundos = segundos % 3600;

                Integer minutos = segundos / 60;
                segundos = segundos % 60;

                if((looca.getRede().getGrupoDeInterfaces().getInterfaces().get(0).getBytesEnviados().doubleValue() / conversorMb) > 100000){
                    redeAtual = (looca.getRede().getGrupoDeInterfaces().getInterfaces().get(0).getPacotesEnviados().doubleValue() + looca.getRede().getGrupoDeInterfaces().getInterfaces().get(0).getPacotesRecebidos().doubleValue()) / conversorMb;
                } else if((looca.getRede().getGrupoDeInterfaces().getInterfaces().get(1).getBytesEnviados().doubleValue() / conversorMb) > 100000){
                    redeAtual = (looca.getRede().getGrupoDeInterfaces().getInterfaces().get(1).getPacotesEnviados().doubleValue() + looca.getRede().getGrupoDeInterfaces().getInterfaces().get(1).getPacotesRecebidos().doubleValue()) / conversorMb;
                } else if((looca.getRede().getGrupoDeInterfaces().getInterfaces().get(2).getBytesEnviados().doubleValue() / conversorMb) > 100000){
                    redeAtual = (looca.getRede().getGrupoDeInterfaces().getInterfaces().get(2).getPacotesEnviados().doubleValue() + looca.getRede().getGrupoDeInterfaces().getInterfaces().get(2).getPacotesRecebidos().doubleValue()) / conversorMb;
                } else if((looca.getRede().getGrupoDeInterfaces().getInterfaces().get(3).getBytesEnviados().doubleValue() / conversorMb) > 100000){
                    redeAtual = (looca.getRede().getGrupoDeInterfaces().getInterfaces().get(3).getPacotesEnviados().doubleValue() + looca.getRede().getGrupoDeInterfaces().getInterfaces().get(3).getPacotesRecebidos().doubleValue()) / conversorMb;
                }

                Boolean parar = false;
                do{
                    System.out.println("""
                       *-----------------------*       
                       | O que quer monitorar: |
                       | 1 - HD'S              |
                       | 2 - RAM               |
                       | 3 - PROCESSADOR       |
                       | 4 - REDE              |
                       | 5 - Sair              |
                       *-----------------------*
                        """);
                    Scanner leitorOpcao = new Scanner(System.in);
                    Integer opcao = leitorOpcao.nextInt();

                    switch (opcao){
                        case 1:
                            bancoDeDados.insertRegistro(discoDisponivel1, "Uso", 1);
                            bancoDeDados.insertRegistro(discoDisponivel2, "Uso", 2);
                            System.out.println("Disco sendo usado: " + discoDisponivel1);
                            System.out.println("Disco sendo usado: " + discoDisponivel2);
                            break;
                        case 2:
                            bancoDeDados.insertRegistro(memoriaRamEmUso, "Uso", 3);
                            System.out.println("Memoria RAM sendo usada: " + memoriaRamEmUso);
                            break;
                        case 3:
                            bancoDeDados.insertRegistro(processadorEmUso, "Uso", 4);
                            bancoDeDados.insertRegistro(Double.valueOf(dias), "Dias", 4);
                            bancoDeDados.insertRegistro(Double.valueOf(horas), "Horas", 4);
                            bancoDeDados.insertRegistro(Double.valueOf(minutos), "Minutos", 4);
                            bancoDeDados.insertRegistro(Double.valueOf(segundos), "Segundos", 4);
                            bancoDeDados.insertRegistro(numeroProcessos, "Quantidade", 4);
                            bancoDeDados.insertRegistro(numeroThreads, "Quantidade", 4);
                            System.out.println("Processador em uso: " + processadorEmUso);
                            System.out.println("Dias em uso: " + Double.valueOf(dias));
                            System.out.println("Horas :" + Double.valueOf(horas));
                            System.out.println("Minutos: " + Double.valueOf(minutos));
                            System.out.println("Segundos: " + Double.valueOf(segundos));
                            System.out.println("Quantidade de processos: " + numeroProcessos);
                            System.out.println("Therads: " + numeroThreads);

                            break;
                        case 4:
                            bancoDeDados.insertRegistro(redeAtual, "Velocidade", 5);
                            System.out.println("Rede atual: " + redeAtual);
                            break;
                        case 5:
                            System.out.println("Até logo!");
                            parar = true;
                            break;
                    }

                }while(!parar);
            }
        }, delay, interval);
    }
}