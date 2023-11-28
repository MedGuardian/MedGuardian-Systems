package Projeto;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.janelas.Janela;

import java.io.IOException;
import java.util.*;

public class TesteProjetoPedro {
    public static void main(String[] args) {

        Looca looca = new Looca();
        EnviarBDAws bancoDeDadosAws = new EnviarBDAws();
        EnviarBDLocal bancoDeDados = new EnviarBDLocal();

        Componente HD = new Componente(looca.getGrupoDeDiscos().getDiscos().get(0).getModelo());
        Componente RAM = new Componente("RAM");
        Componente PROCESSADOR = new Componente(looca.getProcessador().getNome());
        Componente TEMPOATIVIDADE = new Componente("TEMPO DE ATIVIDADE");

        String nomeComputador = looca.getRede().getParametros().getNomeDeDominio();
        Integer conversorGb = 1000000000;
        Boolean logado = false;
        Integer idComputador = null;
        Integer idComputadorAws = null;
        Integer idComputadorLocal = null;
        Integer idFuncionario = null;
        Integer fkEmpresa = null;
        String sistemaOperacional = null;
        Double graveRam;
        Double medioRam;
        Double graveCPU;
        Double medioCPU;
        Double graveDisco;
        Double medioDisco;

        do {
            ObterMemoriaSwap.ObterMemoriaSwap();
            System.out.println("Digite o email: ");
            Scanner leitorEmail = new Scanner(System.in);
            String email = leitorEmail.nextLine();

            System.out.println("Digite a senha: ");
            Scanner leitorSenha = new Scanner(System.in);
            String senha = leitorSenha.nextLine();
            if(!bancoDeDadosAws.autenticarUsuario(email, senha).isEmpty()){
                logado = true;
                idFuncionario = bancoDeDadosAws.autenticarUsuario(email, senha).get(0).getIdFuncionario();
                fkEmpresa = bancoDeDadosAws.getFkEmpresaPorIdFuncionario(idFuncionario);

                if(System.getProperty("os.name").toLowerCase().contains("win")){
                    sistemaOperacional = "Windows";
                } else {
                    sistemaOperacional = "Linux";
                }

                if(bancoDeDadosAws.verificarComputadorCadastrado(nomeComputador) || bancoDeDados.verificarComputadorCadastrado(nomeComputador)){
                    bancoDeDadosAws.insertComputador(nomeComputador, fkEmpresa, sistemaOperacional);
                    System.out.println("cadastrei");
                    bancoDeDados.insertComputador(nomeComputador, fkEmpresa, sistemaOperacional);
                    idComputador = bancoDeDados.selectIdComputador(nomeComputador);
                    bancoDeDadosAws.insertComputador(nomeComputador, fkEmpresa, sistemaOperacional);
                    idComputadorAws = bancoDeDadosAws.selectIdComputador(nomeComputador);

                    if(!looca.getGrupoDeDiscos().getVolumes().isEmpty()){
                        for(int i = 0; i < looca.getGrupoDeDiscos().getQuantidadeDeDiscos(); i++) {
                            bancoDeDados.insertComponente(HD.getNomeComponente() + (i + 1));
                            bancoDeDadosAws.insertComponente(HD.getNomeComponente() + (i + 1));
                        }
                    }

                    List<String> requisitados = new ArrayList<String>();
            Scanner in = new Scanner(System.in);
            Integer escolha;
            //    bancoDeDados.insertComponente(PROCESSADOR.getNomeComponente());
            // bancoDeDados.insertComponente(RAM.getNomeComponente());
            // bancoDeDados.insertComponente(TEMPOATIVIDADE.getNomeComponente());
            do{
                System.out.println("""
                        Insira quais componentes deseja monitorar
                        1- HD
                        2- RAM
                        3- Processador
                        4- Tempo de atividade
                        0- Sair
                        """);
                     escolha = in.nextInt();
                    if(escolha.equals(1)){
                        requisitados.add("HD1");
                    }else if(escolha.equals(2)){
                        requisitados.add("RAM");
                    }else if(escolha.equals(3)){
                        requisitados.add("PROCESSADOR");
                    }else if(escolha.equals(4)){
                        requisitados.add("TEMPOATIVIDADE");
                    }else{
                        System.out.println("Até logo :)");
                    }
            }while (escolha!=0);

             for (int i = 0; i < requisitados.size(); i++) {
                    bancoDeDados.insertComponente(requisitados.get(i));
            }


                    for(int i = 0; i < bancoDeDados.selectComponente().size(); i++){
                        Integer idComponente = bancoDeDados.selectComponente().get(i).getIdComponente();

                        switch (idComponente) {
                            case 1 -> {
                                bancoDeDados.insertEspecificacao(idComputador, idComponente, 100.);
                                bancoDeDadosAws.insertEspecificacao(idComputador, idComponente, 100.);
                            }
                            case 2 -> {
                                bancoDeDados.insertEspecificacao(idComputador, idComponente, looca.getMemoria().getTotal().doubleValue() / conversorGb);
                                bancoDeDadosAws.insertEspecificacao(idComputador, idComponente, looca.getMemoria().getTotal().doubleValue() / conversorGb);
                            }
                            case 3 -> {
                                bancoDeDados.insertEspecificacao(idComputador, idComponente, ((looca.getGrupoDeDiscos().getVolumes().get(0).getTotal().doubleValue() / conversorGb)) - 30);
                                bancoDeDadosAws.insertEspecificacao(idComputador, idComponente, ((looca.getGrupoDeDiscos().getVolumes().get(0).getTotal().doubleValue() / conversorGb)) - 30);
                            }
                            case 4 -> {
                                bancoDeDados.insertEspecificacao(idComputador, idComponente, null);
                                bancoDeDadosAws.insertEspecificacao(idComputador, idComponente, null);
                            }
                        }
                    }
                } else {
                    idComputador = bancoDeDadosAws.selectIdComputador(nomeComputador);
                }


                if(bancoDeDadosAws.getFkEmpresaPorIdFuncionario(idFuncionario) != bancoDeDadosAws.getFkEmpresaDaMaquinaPeloNome(nomeComputador)){
                    logado = false;
                    System.out.println("Você não é um funcionário registrado na empresa linkada a essa máquina!");
                    System.out.println("Solicite para que alguém libere seu acesso, se for o caso.");
                } else {
                    System.out.println("""
                USUÁRIO %s AUTENTICADO COM SUCESSO!
                INICIANDO A CAPTURA DE DADOS DA MÁQUINA...
                """.formatted(bancoDeDadosAws.autenticarUsuario(email, senha).get(0).getNomeFuncionario()));
                }
            }
        } while (!logado);

        System.out.println("Id: " + idComputador + "Nome da máquina: " + nomeComputador);

        if(bancoDeDadosAws.verificarComputadorCadastrado(nomeComputador)){
            System.out.println("cadastrei computador");
            bancoDeDados.insertComputador(nomeComputador, fkEmpresa, sistemaOperacional);
            bancoDeDadosAws.insertComputador(nomeComputador, fkEmpresa, sistemaOperacional);
            idComputadorLocal = bancoDeDadosAws.selectIdComputador(nomeComputador);

            if(!looca.getGrupoDeDiscos().getVolumes().isEmpty()){
                for(int i = 0; i < looca.getGrupoDeDiscos().getQuantidadeDeDiscos(); i++) {
                    bancoDeDadosAws.insertComponente(HD.getNomeComponente() + (i + 1));
                }
            }
            
            for(int i = 0; i < bancoDeDados.selectComponente().size(); i++){
                Integer idComponente = bancoDeDados.selectComponente().get(i).getIdComponente();

                switch (idComponente) {
                    case 1 -> {
                        bancoDeDados.insertEspecificacao(idComputadorLocal, idComponente, 100.);
                        bancoDeDadosAws.insertEspecificacao(idComputadorLocal, idComponente, 100.);
                    }
                    case 2 -> {
                        bancoDeDados.insertEspecificacao(idComputadorLocal, idComponente, looca.getMemoria().getTotal().doubleValue() / conversorGb);
                        bancoDeDadosAws.insertEspecificacao(idComputadorLocal, idComponente, looca.getMemoria().getTotal().doubleValue() / conversorGb);
                    }
                    case 3 -> {
                        bancoDeDados.insertEspecificacao(idComputadorLocal, idComponente, ((looca.getGrupoDeDiscos().getVolumes().get(0).getTotal().doubleValue() / conversorGb)));
                        bancoDeDadosAws.insertEspecificacao(idComputadorLocal, idComponente, ((looca.getGrupoDeDiscos().getVolumes().get(0).getTotal().doubleValue() / conversorGb)));
                    }
                    case 4 -> {
                        bancoDeDados.insertEspecificacao(idComputadorLocal, idComponente, null);
                        bancoDeDadosAws.insertEspecificacao(idComputadorLocal, idComponente, null);
                    }
                }
            }
        } else {
            idComputadorLocal = bancoDeDados.selectIdComputador(nomeComputador);
        }


        Timer timer = new Timer();
        int delay = 0; // Tempo de espera antes da primeira execução (0 significa que será executado imediatamente)
        int interval = 5000; // Intervalo entre as execuções em milissegundos (5 segundos)

        Integer finalIdComputador = idComputador;
        Integer finalIdComputadorLocal = idComputadorLocal;
        Integer finalFkEmpresa = fkEmpresa;

        timer.scheduleAtFixedRate(new TimerTask() {
            public void run() {
                System.out.println("DADOS SENDO MONITORADOS...");

                Double discoDisponivel = looca.getGrupoDeDiscos().getVolumes().get(0).getDisponivel().doubleValue() / conversorGb;
                Double memoriaRamEmUso = looca.getMemoria().getEmUso().doubleValue() / conversorGb;
                Double processadorEmUso = looca.getProcessador().getUso();
                Double swapDisponivel = ObterMemoriaSwap.ObterMemoriaSwap().get(0).doubleValue() / conversorGb;
                Double numeroThreads = looca.getGrupoDeProcessos().getTotalThreads().doubleValue();
                Double numeroProcessos = looca.getGrupoDeProcessos().getTotalProcessos().doubleValue();
                Integer segundos = looca.getSistema().getTempoDeAtividade().intValue();
                List<Metrica> metrica = bancoDeDadosAws.getMetricasPorFkEmpresa(finalFkEmpresa, finalIdComputador);

                Integer dias = segundos / 86400;
                segundos = segundos % 86400;

                Integer horas = segundos / 3600;
                segundos = segundos % 3600;

                Integer minutos = segundos / 60;
                segundos = segundos % 60;

                for(int i = 0; i < bancoDeDados.selectComponente().size(); i++){
                    String NomeComponenteAws = bancoDeDados.selectComponente().get(i).getNomeComponente();

                    switch (NomeComponenteAws) {
                        case  "PROCESSADOR"-> {
                            bancoDeDados.insertRegistro(processadorEmUso, "UsoCpu", finalIdComputador * 4 - 3);
                            bancoDeDadosAws.insertRegistro(processadorEmUso, "UsoCpu", finalIdComputador * 4 - 3);
                            bancoDeDados.insertRegistro(Double.valueOf(dias), "Dias", finalIdComputador * 4 - 3);
                            bancoDeDadosAws.insertRegistro(Double.valueOf(dias), "Dias", finalIdComputador * 4 - 3);
                            bancoDeDados.insertRegistro(Double.valueOf(horas), "Horas", finalIdComputador * 4 - 3);
                            bancoDeDadosAws.insertRegistro(Double.valueOf(horas), "Horas", finalIdComputador * 4 - 3);
                            bancoDeDados.insertRegistro(Double.valueOf(minutos), "Minutos", finalIdComputador * 4 - 3);
                            bancoDeDadosAws.insertRegistro(Double.valueOf(minutos), "Minutos", finalIdComputador * 4 - 3);
                            bancoDeDados.insertRegistro(Double.valueOf(segundos), "Segundos", finalIdComputador * 4 - 3);
                            bancoDeDadosAws.insertRegistro(Double.valueOf(segundos), "Segundos", finalIdComputador * 4 - 3);
                            bancoDeDados.insertRegistro(numeroProcessos, "QuantidadeProcessos", finalIdComputador * 4 - 3);
                            bancoDeDadosAws.insertRegistro(numeroProcessos, "QuantidadeProcessos", finalIdComputador * 4 - 3);
                            bancoDeDados.insertRegistro(numeroThreads, "QuantidadeThreads", finalIdComputador * 4 - 3);
                            bancoDeDadosAws.insertRegistro(numeroThreads, "QuantidadeThreads", finalIdComputador * 4 - 3);

                            if(processadorEmUso >= metrica.get(0).getGraveCPU()){
                                bancoDeDados.insertAlertas("Crítico",finalIdComputador * 4 - 3, finalIdComputador);
                                bancoDeDadosAws.insertAlertas("Crítico",finalIdComputador * 4 - 3, finalIdComputador);
                            } else if(processadorEmUso >= metrica.get(0).getMedioCPU()){
                                bancoDeDados.insertAlertas("Médio", finalIdComputador * 4 - 3, finalIdComputador);
                                bancoDeDadosAws.insertAlertas("Médio", finalIdComputador * 4 - 3, finalIdComputador);
                            }
                        }
                        case "RAM" -> {
                            bancoDeDados.insertRegistro(memoriaRamEmUso, "Uso", finalIdComputador * 4 - 2);
                            bancoDeDadosAws.insertRegistro(memoriaRamEmUso, "Uso", finalIdComputador * 4 - 2);

                            if(memoriaRamEmUso >= (looca.getMemoria().getTotal().doubleValue() / conversorGb) * (metrica.get(0).getGraveRam() / 100)){
                                bancoDeDados.insertAlertas("Crítico", finalIdComputador * 4 - 2, finalIdComputador);
                                bancoDeDadosAws.insertAlertas("Crítico", finalIdComputador * 4 - 2, finalIdComputador);
                            } else if(memoriaRamEmUso >= (looca.getMemoria().getTotal().doubleValue() / conversorGb) * (metrica.get(0).getMedioRam() / 100)){
                                bancoDeDados.insertAlertas("Médio", finalIdComputador * 4 - 2, finalIdComputador);
                                bancoDeDadosAws.insertAlertas("Médio", finalIdComputador * 4 - 2, finalIdComputador);
                            }
                        }
                        case "SWAP" -> {
                            bancoDeDados.insertRegistro(discoDisponivel, "Uso", finalIdComputador * 4 - 1);
                            bancoDeDadosAws.insertRegistro(discoDisponivel, "Uso", finalIdComputador * 4 - 1);
                            bancoDeDados.insertRegistro(swapDisponivel, "SwapDisponivel", finalIdComputador * 4 - 1);
                            bancoDeDadosAws.insertRegistro(swapDisponivel, "SwapDisponivel", finalIdComputador * 4 - 1);

                            Double tamanhoDiscoGb = looca.getGrupoDeDiscos().getVolumes().get(0).getTotal().doubleValue() / conversorGb;
                            Double porcentagemMedio = metrica.get(0).getMedioDisco() / 100;
                            Double porcentagemGrave = metrica.get(0).getGraveDisco() / 100;


                            if(discoDisponivel < (tamanhoDiscoGb - (tamanhoDiscoGb * porcentagemGrave))){
                                bancoDeDados.insertAlertas("Crítico", finalIdComputador * 4 - 1, finalIdComputador);
                                bancoDeDadosAws.insertAlertas("Crítico", finalIdComputador * 4 - 1, finalIdComputador);
                            } else if(discoDisponivel < (tamanhoDiscoGb - (tamanhoDiscoGb * porcentagemMedio))){
                                bancoDeDados.insertAlertas("Médio", finalIdComputador * 4 - 1, finalIdComputador);
                                bancoDeDadosAws.insertAlertas("Médio", finalIdComputador * 4 - 1, finalIdComputador);
                            }
                        }
                    }
                }

                for(int i = 0; i < bancoDeDados.selectComponente().size() - 1; i++){

                    String nomeComponenteLocal = bancoDeDados.selectComponente().get(i).getNomeComponente();

                    switch (nomeComponenteLocal) {
                        case  "PROCESSADOR"-> {
                            bancoDeDados.insertRegistro(processadorEmUso, "UsoCpu", finalIdComputadorLocal * 4 - 3);
                            bancoDeDadosAws.insertRegistro(processadorEmUso, "UsoCpu", finalIdComputadorLocal * 4 - 3);
                            bancoDeDados.insertRegistro(Double.valueOf(dias), "Dias", finalIdComputadorLocal * 4 - 3);
                            bancoDeDadosAws.insertRegistro(Double.valueOf(dias), "Dias", finalIdComputadorLocal * 4 - 3);
                            bancoDeDados.insertRegistro(Double.valueOf(horas), "Horas", finalIdComputadorLocal * 4 - 3);
                            bancoDeDadosAws.insertRegistro(Double.valueOf(horas), "Horas", finalIdComputadorLocal * 4 - 3);
                            bancoDeDados.insertRegistro(Double.valueOf(minutos), "Minutos", finalIdComputadorLocal * 4 - 3);
                            bancoDeDadosAws.insertRegistro(Double.valueOf(minutos), "Minutos", finalIdComputadorLocal * 4 - 3);
                            bancoDeDados.insertRegistro(Double.valueOf(segundos), "Segundos", finalIdComputadorLocal * 4 - 3);
                            bancoDeDadosAws.insertRegistro(Double.valueOf(segundos), "Segundos", finalIdComputadorLocal * 4 - 3);
                            bancoDeDados.insertRegistro(numeroProcessos, "QuantidadeProcessos", finalIdComputadorLocal * 4 - 3);
                            bancoDeDadosAws.insertRegistro(numeroProcessos, "QuantidadeProcessos", finalIdComputadorLocal * 4 - 3);
                            bancoDeDados.insertRegistro(numeroThreads, "QuantidadeThreads", finalIdComputadorLocal * 4 - 3);
                            bancoDeDadosAws.insertRegistro(numeroThreads, "QuantidadeThreads", finalIdComputadorLocal * 4 - 3);
                        }
                        case "RAM" -> {
                            bancoDeDados.insertRegistro(memoriaRamEmUso, "Uso", finalIdComputadorLocal * 4 - 2);
                            bancoDeDadosAws.insertRegistro(memoriaRamEmUso, "Uso", finalIdComputadorLocal * 4 - 2);
                        }
                        case "SWAP" -> {
                            bancoDeDados.insertRegistro(discoDisponivel, "Uso", finalIdComputadorLocal * 4 - 1);
                            bancoDeDadosAws.insertRegistro(discoDisponivel, "Uso", finalIdComputadorLocal * 4 - 1);
                            bancoDeDados.insertRegistro(swapDisponivel, "SwapDisponivel", finalIdComputadorLocal * 4 - 1);
                            bancoDeDadosAws.insertRegistro(swapDisponivel, "SwapDisponivel", finalIdComputadorLocal * 4 - 1);
                        }
                    }
                }
            }
        }, delay, interval);

    }
}