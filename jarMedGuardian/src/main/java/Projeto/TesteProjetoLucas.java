package Projeto;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.janelas.Janela;
import com.github.britooo.looca.api.group.processos.Processo;

import java.io.IOException;
import java.util.*;

public class TesteProjetoLucas {
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
        Integer idComputadorLocal = null;
        Integer idFuncionario = null;
        Integer fkEmpresa = null;
        String sistemaOperacional = null;
        Integer pid;
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
            if(!bancoDeDados.autenticarUsuario(email, senha).isEmpty()){
                logado = true;
                idFuncionario = bancoDeDados.autenticarUsuario(email, senha).get(0).getIdFuncionario();
                fkEmpresa = bancoDeDados.getFkEmpresaPorIdFuncionario(idFuncionario);

                if(System.getProperty("os.name").toLowerCase().contains("win")){
                    sistemaOperacional = "Windows";
                } else {
                    sistemaOperacional = "Linux";
                }

                if(bancoDeDados.verificarComputadorCadastrado(nomeComputador)){
                    bancoDeDados.insertComputador(nomeComputador, sistemaOperacional);
                    idComputador = bancoDeDados.selectIdComputador(nomeComputador);

                    bancoDeDados.insertComponente(PROCESSADOR.getNomeComponente());
                    bancoDeDados.insertComponente(RAM.getNomeComponente());


                    if(!looca.getGrupoDeDiscos().getVolumes().isEmpty()){
                        for(int i = 0; i < looca.getGrupoDeDiscos().getQuantidadeDeDiscos(); i++) {
                            bancoDeDados.insertComponente(HD.getNomeComponente() + (i + 1));
                        }
                    }
                    bancoDeDados.insertComponente(TEMPOATIVIDADE.getNomeComponente());

                    for(int i = 0; i < bancoDeDados.selectComponente().size(); i++){
                        Integer idComponente = bancoDeDados.selectComponente().get(i).getIdComponente();

                        switch (idComponente) {
                            case 1 -> {
                                bancoDeDados.insertEspecificacao(idComputador, idComponente, 100.);
                            }
                            case 2 -> {
                                bancoDeDados.insertEspecificacao(idComputador, idComponente, looca.getMemoria().getTotal().doubleValue() / conversorGb);
                            }
                            case 3 -> {
                                bancoDeDados.insertEspecificacao(idComputador, idComponente, ((looca.getGrupoDeDiscos().getVolumes().get(0).getTotal().doubleValue() / conversorGb)) - 30);
                            }
                            case 4 -> {
                                bancoDeDados.insertEspecificacao(idComputador, idComponente, null);
                            }
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

        System.out.println("Id: " + idComputador + "Nome da máquina: " + nomeComputador);

        if(bancoDeDados.verificarComputadorCadastrado(nomeComputador)){
            bancoDeDados.insertComputador(nomeComputador, sistemaOperacional);
            idComputadorLocal = bancoDeDados.selectIdComputador(nomeComputador);

            bancoDeDados.insertComponente(PROCESSADOR.getNomeComponente());
            bancoDeDados.insertComponente(RAM.getNomeComponente());

            if(!looca.getGrupoDeDiscos().getVolumes().isEmpty()){
                for(int i = 0; i < looca.getGrupoDeDiscos().getQuantidadeDeDiscos(); i++) {
                    bancoDeDados.insertComponente(HD.getNomeComponente() + (i + 1));
                }
            }
            bancoDeDados.insertComponente(TEMPOATIVIDADE.getNomeComponente());

            for(int i = 0; i < bancoDeDados.selectComponente().size(); i++){
                Integer idComponente = bancoDeDados.selectComponente().get(i).getIdComponente();

                switch (idComponente) {
                    case 1 -> {
                        bancoDeDados.insertEspecificacao(idComputadorLocal, idComponente, 100.);
                    }
                    case 2 -> {
                        bancoDeDados.insertEspecificacao(idComputadorLocal, idComponente, looca.getMemoria().getTotal().doubleValue() / conversorGb);
                    }
                    case 3 -> {
                        bancoDeDados.insertEspecificacao(idComputadorLocal, idComponente, ((looca.getGrupoDeDiscos().getVolumes().get(0).getTotal().doubleValue() / conversorGb)));
                    }
                    case 4 -> {
                        bancoDeDados.insertEspecificacao(idComputadorLocal, idComponente, null);
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
//                List<Metrica> metrica = bancoDeDadosAws.getMetricasPorFkEmpresa(finalFkEmpresa, finalIdComputador);

                Integer dias = segundos / 86400;
                segundos = segundos % 86400;

                Integer horas = segundos / 3600;
                segundos = segundos % 3600;

                Integer minutos = segundos / 60;
                segundos = segundos % 60;

                for(int i = 0; i < bancoDeDados.selectComponente().size(); i++){
                    Integer idComponenteAws = bancoDeDados.selectComponente().get(i).getIdComponente();

                    switch (idComponenteAws) {
                        case  1-> {
                            bancoDeDados.insertRegistro(processadorEmUso, "UsoCpu", finalIdComputador * 4 - 3);
                            bancoDeDados.insertRegistro(Double.valueOf(dias), "Dias", finalIdComputador * 4 - 3);
                            bancoDeDados.insertRegistro(Double.valueOf(horas), "Horas", finalIdComputador * 4 - 3);
                            bancoDeDados.insertRegistro(Double.valueOf(minutos), "Minutos", finalIdComputador * 4 - 3);
                            bancoDeDados.insertRegistro(Double.valueOf(segundos), "Segundos", finalIdComputador * 4 - 3);
                            bancoDeDados.insertRegistro(numeroProcessos, "QuantidadeProcessos", finalIdComputador * 4 - 3);
                            bancoDeDados.insertRegistro(numeroThreads, "QuantidadeThreads", finalIdComputador * 4 - 3);
//
//                            if(processadorEmUso >= metrica.get(0).getGraveCPU()){
//                                bancoDeDados.insertAlertas("Crítico",finalIdComputador * 4 - 3, finalIdComputador);
//                            } else if(processadorEmUso >= metrica.get(0).getMedioCPU()){
//                                bancoDeDados.insertAlertas("Médio", finalIdComputador * 4 - 3, finalIdComputador);
//                            }
                        }
                        case 2 -> {
                            bancoDeDados.insertRegistro(memoriaRamEmUso, "Uso", finalIdComputador * 4 - 2);
//
//                            if(memoriaRamEmUso >= (looca.getMemoria().getTotal().doubleValue() / conversorGb) * (metrica.get(0).getGraveRam() / 100)){
//                                bancoDeDados.insertAlertas("Crítico", finalIdComputador * 4 - 2, finalIdComputador);
//                            } else if(memoriaRamEmUso >= (looca.getMemoria().getTotal().doubleValue() / conversorGb) * (metrica.get(0).getMedioRam() / 100)){
//                                bancoDeDados.insertAlertas("Médio", finalIdComputador * 4 - 2, finalIdComputador);
//                            }
                        }
                        case 3 -> {
                            bancoDeDados.insertRegistro(discoDisponivel, "Uso", finalIdComputador * 4 - 1);
                            bancoDeDados.insertRegistro(swapDisponivel, "SwapDisponivel", finalIdComputador * 4 - 1);
//
//                            Double tamanhoDiscoGb = looca.getGrupoDeDiscos().getVolumes().get(0).getTotal().doubleValue() / conversorGb;
//                            Double porcentagemMedio = metrica.get(0).getMedioDisco() / 100;
//                            Double porcentagemGrave = metrica.get(0).getGraveDisco() / 100;
//
//
//                            if(discoDisponivel < (tamanhoDiscoGb - (tamanhoDiscoGb * porcentagemGrave))){
//                                bancoDeDados.insertAlertas("Crítico", finalIdComputador * 4 - 1, finalIdComputador);
//                            } else if(discoDisponivel < (tamanhoDiscoGb - (tamanhoDiscoGb * porcentagemMedio))){
//                                bancoDeDados.insertAlertas("Médio", finalIdComputador * 4 - 1, finalIdComputador);
//                            }
                        }
                    }

                    List<Janelas> listaJanelasSelect = bancoDeDados.selectJanelas(finalIdComputador);
                    List<Janela> listaJanelasLooca = new ArrayList<>();
                    MatarProcesso matarProcesso = new MatarProcesso();

                    for(int k = 0; k < listaJanelasSelect.size(); k++){
                        if(listaJanelasSelect.get(k).getMatar().equals(true)){
                            String nomeProcesso = matarProcesso.pegarNomeProcessoPeloComando(listaJanelasSelect.get(k).getComando());
                            matarProcesso.matarProcessoPorNome(nomeProcesso);
                        }
                    }

                    for (int j = 0; j < looca.getGrupoDeJanelas().getJanelasVisiveis().size(); j++) {
                        Janela janelaLooca = looca.getGrupoDeJanelas().getJanelasVisiveis().get(j);
                        if (!janelaLooca.getTitulo().isEmpty() && !janelaLooca.getComando().toLowerCase().contains("C:\\Windows".toLowerCase())) {
                            listaJanelasLooca.add(janelaLooca);
                        }
                    }

// Remover janelas que não estão mais abertas
                    for (Janelas janelaSelect : listaJanelasSelect) {
                        boolean janelaEncontrada = false;

                        for (Janela janelaLooca : listaJanelasLooca) {
                            if (janelaSelect.getComando().equals(janelaLooca.getComando())) {
                                janelaEncontrada = true;
                                break;
                            }
                        }

                        if (!janelaEncontrada) {
                            bancoDeDados.excluirJanela(janelaSelect.getComando(), finalIdComputador);
                        }
                    }

// Inserir janelas novas
                    for (Janela janelaLooca : listaJanelasLooca) {
                        boolean janelaExistente = false;

                        for (Janelas janelaSelect : listaJanelasSelect) {
                            if (janelaSelect.getComando().equals(janelaLooca.getComando())) {
                                janelaExistente = true;
                                break;
                            }
                        }

                        if (!janelaExistente) {
                            bancoDeDados.insertJanelas(janelaLooca.getTitulo(), janelaLooca.getComando(), finalIdComputador, false);
                        }
                    }
                }

                for(int i = 0; i < bancoDeDados.selectComponente().size() - 1; i++){

                    Integer idComponenteLocal = bancoDeDados.selectComponente().get(i).getIdComponente();

                    switch (idComponenteLocal) {
                        case  1-> {
                            bancoDeDados.insertRegistro(processadorEmUso, "UsoCpu", finalIdComputadorLocal * 4 - 3);
                            bancoDeDados.insertRegistro(Double.valueOf(dias), "Dias", finalIdComputadorLocal * 4 - 3);
                            bancoDeDados.insertRegistro(Double.valueOf(horas), "Horas", finalIdComputadorLocal * 4 - 3);
                            bancoDeDados.insertRegistro(Double.valueOf(minutos), "Minutos", finalIdComputadorLocal * 4 - 3);
                            bancoDeDados.insertRegistro(Double.valueOf(segundos), "Segundos", finalIdComputadorLocal * 4 - 3);
                            bancoDeDados.insertRegistro(numeroProcessos, "QuantidadeProcessos", finalIdComputadorLocal * 4 - 3);
                            bancoDeDados.insertRegistro(numeroThreads, "QuantidadeThreads", finalIdComputadorLocal * 4 - 3);
                        }
                        case 2 -> {
                            bancoDeDados.insertRegistro(memoriaRamEmUso, "Uso", finalIdComputadorLocal * 4 - 2);
                        }
                        case 3 -> {
                            bancoDeDados.insertRegistro(discoDisponivel, "Uso", finalIdComputadorLocal * 4 - 1);
                            bancoDeDados.insertRegistro(swapDisponivel, "SwapDisponivel", finalIdComputadorLocal * 4 - 1);
                        }
                    }
                }
            }
        }, delay, interval);

    }
}