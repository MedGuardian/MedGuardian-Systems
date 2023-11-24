package Projeto;

import com.github.britooo.looca.api.core.Looca;

import java.util.*;

public class TesteProjeto {
    public static void main(String[] args) {

        Looca looca = new Looca();
        EnviarBDAws bancoDeDadosAws = new EnviarBDAws();

        Componente HD = new Componente(looca.getGrupoDeDiscos().getDiscos().get(0).getModelo());
        Componente RAM = new Componente("RAM");
        Componente PROCESSADOR = new Componente(looca.getProcessador().getNome());
        Componente TEMPOATIVIDADE = new Componente("TEMPO DE ATIVIDADE");

        String nomeComputador = looca.getRede().getParametros().getNomeDeDominio();
        Integer conversorGb = 1000000000;
        Boolean logado = false;
        Integer idComputador = null;
        Integer idFuncionario = null;
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

                if(System.getProperty("os.name").toLowerCase().contains("win")){
                    sistemaOperacional = "Windows";
                } else {
                    sistemaOperacional = "Linux";
                }

                if(bancoDeDadosAws.verificarComputadorCadastrado(nomeComputador)){
                    Integer fkEmpresaDoFuncionario = bancoDeDadosAws.getFkEmpresaPorIdFuncionario(idFuncionario);
                    bancoDeDadosAws.insertComputador(nomeComputador, fkEmpresaDoFuncionario, sistemaOperacional);
                    idComputador = bancoDeDadosAws.selectIdComputador(nomeComputador);

                    bancoDeDadosAws.insertComponente(PROCESSADOR.getNomeComponente());
                    bancoDeDadosAws.insertComponente(RAM.getNomeComponente());

                    if(!looca.getGrupoDeDiscos().getVolumes().isEmpty()){
                        for(int i = 0; i < looca.getGrupoDeDiscos().getQuantidadeDeDiscos(); i++) {
                            bancoDeDadosAws.insertComponente(HD.getNomeComponente() + (i + 1));
                        }
                    }
                    bancoDeDadosAws.insertComponente(TEMPOATIVIDADE.getNomeComponente());

                    for(int i = 0; i < bancoDeDadosAws.selectComponente().size(); i++){
                        Integer idComponente = bancoDeDadosAws.selectComponente().get(i).getIdComponente();

                        switch (idComponente) {
                            case 1 -> {
                                bancoDeDadosAws.insertEspecificacao(idComputador, idComponente, 100.);
                            }
                            case 2 -> {
                                bancoDeDadosAws.insertEspecificacao(idComputador, idComponente, looca.getMemoria().getTotal().doubleValue() / conversorGb);
                            }
                            case 3 -> {
                                bancoDeDadosAws.insertEspecificacao(idComputador, idComponente, ((looca.getGrupoDeDiscos().getVolumes().get(0).getTotal().doubleValue() / conversorGb)) - 30);
                            }
                            case 4 -> {
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


        EnviarBDLocal bancoDeDados = new EnviarBDLocal();

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

        Timer timer = new Timer();
        int delay = 0; // Tempo de espera antes da primeira execução (0 significa que será executado imediatamente)
        int interval = 5000; // Intervalo entre as execuções em milissegundos (5 segundos)

        Integer finalIdComputador = idComputador;
        Integer finalIdFuncionario = idFuncionario;
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
                List<Metrica> metrica = bancoDeDadosAws.getMetricasPorFkEmpresa(bancoDeDados.getFkEmpresaPorIdFuncionario(finalIdFuncionario), finalIdComputador);

                Integer dias = segundos / 86400;
                segundos = segundos % 86400;

                Integer horas = segundos / 3600;
                segundos = segundos % 3600;

                Integer minutos = segundos / 60;
                segundos = segundos % 60;

                for(int i = 0; i < bancoDeDadosAws.selectComponente().size(); i++){
                    Integer idComponente = bancoDeDadosAws.selectComponente().get(i).getIdComponente();

                    switch (idComponente) {
                        case  1-> {
                            bancoDeDadosAws.insertRegistro(processadorEmUso, "UsoCpu", 1);
                            bancoDeDadosAws.insertRegistro(Double.valueOf(dias), "Dias", 1);
                            bancoDeDadosAws.insertRegistro(Double.valueOf(horas), "Horas", 1);
                            bancoDeDadosAws.insertRegistro(Double.valueOf(minutos), "Minutos", 1);
                            bancoDeDadosAws.insertRegistro(Double.valueOf(segundos), "Segundos", 1);
                            bancoDeDadosAws.insertRegistro(numeroProcessos, "QuantidadeProcessos", 1);
                            bancoDeDadosAws.insertRegistro(numeroThreads, "QuantidadeThreads", 1);

                            bancoDeDados.insertRegistro(processadorEmUso, "UsoCpu", 1);
                            bancoDeDados.insertRegistro(Double.valueOf(dias), "Dias", 1);
                            bancoDeDados.insertRegistro(Double.valueOf(horas), "Horas", 1);
                            bancoDeDados.insertRegistro(Double.valueOf(minutos), "Minutos", 1);
                            bancoDeDados.insertRegistro(Double.valueOf(segundos), "Segundos", 1);
                            bancoDeDados.insertRegistro(numeroProcessos, "QuantidadeProcessos", 1);
                            bancoDeDados.insertRegistro(numeroThreads, "QuantidadeThreads", 1);

                            if(processadorEmUso >= metrica.get(0).getMedioCPU()){
                                bancoDeDadosAws.insertAlertas("Médio", 1, finalIdComputador);
                            } else if(processadorEmUso >= metrica.get(0).getGraveCPU()){
                                bancoDeDadosAws.insertAlertas("Crítico", 1, finalIdComputador);
                            }
                        }
                        case 2 -> {
                            bancoDeDados.insertRegistro(memoriaRamEmUso, "Uso", 2);
                            bancoDeDadosAws.insertRegistro(memoriaRamEmUso, "Uso", 2);

                            if(memoriaRamEmUso >= metrica.get(0).getMedioRam()){
                                bancoDeDadosAws.insertAlertas("Médio", 2, finalIdComputador);
                            } else if(memoriaRamEmUso >= metrica.get(0).getGraveRam()){
                                bancoDeDadosAws.insertAlertas("Crítico", 2, finalIdComputador);
                            }
                        }
                        case 3 -> {
                            bancoDeDados.insertRegistro(discoDisponivel, "Uso", 3);
                            bancoDeDados.insertRegistro(swapDisponivel, "SwapDisponivel", 3);

                            bancoDeDadosAws.insertRegistro(discoDisponivel, "Uso", 3);
                            bancoDeDadosAws.insertRegistro(swapDisponivel, "SwapDisponivel", 3);

                            if(discoDisponivel >= metrica.get(0).getMedioDisco()){
                                bancoDeDadosAws.insertAlertas("Médio", 3, finalIdComputador);
                            } else if(discoDisponivel >= metrica.get(0).getGraveDisco()){
                                bancoDeDadosAws.insertAlertas("Crítico", 3, finalIdComputador);
                            }
                        }
                    }
                }
            }
        }, delay, interval);

    }
}