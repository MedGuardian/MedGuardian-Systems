package Projeto;

import com.github.britooo.looca.api.core.Looca;

import java.util.*;
import java.util.List;
import java.util.Timer;
public class TesteProjetoArthur {
    private static Looca looca = new Looca();
    static Boolean continuarMonitoramento = true;
    static Integer finalIdComputador;
    static Integer finalIdComputadorLocal;
    static Integer finalFkEmpresa;
    public static void main(String[] args) throws Exception {
        Looca looca = new Looca();
        EnviarBDAws bancoDeDadosAws = new EnviarBDAws();
        EnviarBDLocal bancoDeDados = new EnviarBDLocal();
        Scanner scanner = new Scanner(System.in);
        Componente HD = new Componente(looca.getGrupoDeDiscos().getDiscos().get(0).getModelo());
        Componente RAM = new Componente("RAM");
        Componente PROCESSADOR = new Componente(looca.getProcessador().getNome());
        Componente TEMPOATIVIDADE = new Componente("TEMPO DE ATIVIDADE");
        Slack slack = new Slack();
        Log log = new Log();
        String nomeComputador = looca.getRede().getParametros().getNomeDeDominio();
        Integer conversorGb = 1000000000;
        Boolean logado = false;
        Integer idComputador = null;
        Integer idComputadorLocal = null;
        Integer idFuncionario = null;
        Integer fkEmpresa = null;
        String sistemaOperacional = null;

        do {
            ObterMemoriaSwap.ObterMemoriaSwap();
            System.out.println("Digite o email: ");
            Scanner leitorEmail = new Scanner(System.in);
            String email = leitorEmail.nextLine();

            System.out.println("Digite a senha: ");
            Scanner leitorSenha = new Scanner(System.in);
            String senha = leitorSenha.nextLine();
            if (!bancoDeDadosAws.autenticarUsuario(email, senha).isEmpty()) {
                logado = true;
                idFuncionario = bancoDeDadosAws.autenticarUsuario(email, senha).get(0).getIdFuncionario();
                fkEmpresa = bancoDeDadosAws.getFkEmpresaPorIdFuncionario(idFuncionario);

                if (System.getProperty("os.name").toLowerCase().contains("win")) {
                    sistemaOperacional = "Windows";
                } else {
                    sistemaOperacional = "Linux";
                }

                if (bancoDeDadosAws.verificarComputadorCadastrado(nomeComputador)) {
                    bancoDeDadosAws.insertComputador(nomeComputador, fkEmpresa, sistemaOperacional);
                    idComputador = bancoDeDadosAws.selectIdComputador(nomeComputador);

                    bancoDeDadosAws.insertComponente(PROCESSADOR.getNomeComponente());
                    bancoDeDadosAws.insertComponente(RAM.getNomeComponente());


                    if (!looca.getGrupoDeDiscos().getVolumes().isEmpty()) {
                        for (int i = 0; i < looca.getGrupoDeDiscos().getQuantidadeDeDiscos(); i++) {
                            bancoDeDadosAws.insertComponente(HD.getNomeComponente() + (i + 1));
                        }
                    }
                    bancoDeDadosAws.insertComponente(TEMPOATIVIDADE.getNomeComponente());

                    for (int i = 0; i < bancoDeDadosAws.selectComponente().size(); i++) {
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


                if (bancoDeDadosAws.getFkEmpresaPorIdFuncionario(idFuncionario) != bancoDeDadosAws.getFkEmpresaDaMaquinaPeloNome(nomeComputador)) {
                    logado = false;
                    System.out.println("Você não é um funcionário registrado na empresa linkada a essa máquina!");
                    System.out.println("Solicite para que alguém libere seu acesso, se for o caso.");
                } else {
                    System.out.println("""
                            USUÁRIO %s AUTENTICADO COM SUCESSO!
                            INICIANDO A CAPTURA DE DADOS DA MÁQUINA...
                            """.formatted(bancoDeDadosAws.autenticarUsuario(email, senha).get(0).getNomeFuncionario()));
                    slack.enviarMensagemSlack("""
                            Bem vindo à MedGuardian %s!
                            Receba todas suas notificações pelo nosso slack :tada
                            """.formatted(bancoDeDadosAws.autenticarUsuario(email, senha).get(0).getNomeFuncionario()));
                }
            }
        } while (!logado);

        System.out.println("Id: " + idComputador + "Nome da máquina: " + nomeComputador);

        if (bancoDeDados.verificarComputadorCadastrado(nomeComputador)) {
            bancoDeDados.insertComputador(nomeComputador, sistemaOperacional);
            idComputadorLocal = bancoDeDados.selectIdComputador(nomeComputador);

            bancoDeDados.insertComponente(PROCESSADOR.getNomeComponente());
            bancoDeDados.insertComponente(RAM.getNomeComponente());

            if (!looca.getGrupoDeDiscos().getVolumes().isEmpty()) {
                for (int i = 0; i < looca.getGrupoDeDiscos().getQuantidadeDeDiscos(); i++) {
                    bancoDeDados.insertComponente(HD.getNomeComponente() + (i + 1));
                }
            }
            bancoDeDados.insertComponente(TEMPOATIVIDADE.getNomeComponente());

            for (int i = 0; i < bancoDeDados.selectComponente().size(); i++) {
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
            idComputador = bancoDeDados.selectIdComputador(nomeComputador);
        }


        Timer timer = new Timer();
        int delay = 0;
        int interval = 3000;

        do {
            if (!logado) {
                break;
            } else {


                System.out.println("Seleção de Componente para Monitoramento");

                System.out.println("Lista de Componentes Cadastrados:");

                ArrayList<String> componentesCadastrados = new ArrayList<>();
                try {
                    List<Componente> componentes = bancoDeDadosAws.selectComponenteFromId(idComputador);
                    for (Componente componente : componentes) {
                        componentesCadastrados.add(componente.getNomeComponente());
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    log.gravarLogErros("Erro ao recuperar componentes do banco de dados.");
                    System.out.println("Erro ao recuperar componentes do banco de dados.");
                }
                Integer numeroDoComponente;

                do {
                    System.out.println("""
                    Digite qual o número do componente que você deseja monitorar:
                    """);
                    System.out.println("""
                    ------------------------------------
                    """);
                    for (int j = 0; j < componentesCadastrados.size(); j++) {
                        System.out.println(String.format("""
                        | %d - %s |
                        """.formatted(j + 1, componentesCadastrados.get(j))));
                    }
                    numeroDoComponente = scanner.nextInt();
                    System.out.println("""
                    ------------------------------------
                    """);
                    if (numeroDoComponente < 1 || numeroDoComponente > componentesCadastrados.size()) {
                        System.out.println("Número inválido. Tente novamente.");
                    }
                } while (numeroDoComponente < 1 || numeroDoComponente > componentesCadastrados.size());

                finalIdComputador = idComputador;
                finalIdComputadorLocal = idComputadorLocal;
                finalFkEmpresa = fkEmpresa;

                Integer finalNumeroDoComponente = numeroDoComponente;
                timer.scheduleAtFixedRate(new TimerTask() {
                    public void run() {
                        if (!continuarMonitoramento) {
                            System.out.println("Monitoramento parado.\n");

                            System.out.println("Deseja voltar com o monitoramento? \n 1 - Sim \n 2 - Não");

                            Scanner voltarMonitoramento = new Scanner(System.in);
                            Integer numBack = voltarMonitoramento.nextInt();
                            if (numBack == 1) {
                                continuarMonitoramento = true;
                                System.out.println("Monitoramento reativado\n");
                            } else {
                                System.out.println("Até Mais\n");
                                System.exit(0);
                                timer.cancel();
                            }

                        } else{
                            continuarMonitoramento = true;

                            String componenteSelecionado = componentesCadastrados.get(finalNumeroDoComponente - 1);
                            if (componenteSelecionado.isEmpty()) {
                                System.out.println("Nenhum componente selecionado para monitoramento.\n");
                            } else if (componentesCadastrados.contains(componenteSelecionado)) {
                                try {
                                    slack.enviarMensagemSlack("""
                                            Estamos monitorando o componente escolhido %s
                                            Acompanhe o monitoramento pelo nosso JAR.
                                            """.formatted(componenteSelecionado));
                                } catch (Exception e) {
                                    throw new RuntimeException(e);
                                }
                                System.out.println("Monitorando o componente: " + componenteSelecionado);
                                iniciarMonitoramentoAws(finalNumeroDoComponente, looca, bancoDeDadosAws);
                            } else {
                                System.out.println("Componente não encontrado na lista de seleção.\n");
                            }
                        }
                    }
                }, delay, interval);
            }
        } while (logado);
    }
    public static void pararMonitoramento() {
        continuarMonitoramento = false;
    }
    public static void iniciarMonitoramentoAws(Integer componenteMonitorarAws, Looca looca, EnviarBDAws bancoDeDadosAws){
        Integer conversorGb = 1000000000;
        Double discoDisponivel = looca.getGrupoDeDiscos().getVolumes().get(0).getDisponivel().doubleValue() / conversorGb;
        Double memoriaRamEmUso = looca.getMemoria().getEmUso().doubleValue() / conversorGb;
        Double processadorEmUso = looca.getProcessador().getUso();
        Double swapDisponivel = ObterMemoriaSwap.ObterMemoriaSwap().get(0).doubleValue() / conversorGb;
        Double numeroThreads = looca.getGrupoDeProcessos().getTotalThreads().doubleValue();
        Double numeroProcessos = looca.getGrupoDeProcessos().getTotalProcessos().doubleValue();
        List<Metrica> metrica = bancoDeDadosAws.getMetricasPorFkEmpresa(finalFkEmpresa, finalIdComputador);

        Integer segundos = looca.getSistema().getTempoDeAtividade().intValue();


        Integer dias = segundos / 86400;
        segundos = segundos % 86400;

        Integer horas = segundos / 3600;
        segundos = segundos % 3600;

        Integer minutos = segundos / 60;
        segundos = segundos % 60;
        switch (componenteMonitorarAws){
            case 4:{
                bancoDeDadosAws.insertRegistro(memoriaRamEmUso, "UsoRam", finalIdComputador * 4 - 2);

                if (memoriaRamEmUso >= (looca.getMemoria().getTotal().doubleValue() / conversorGb) * (metrica.get(0).getGraveRam() / 100)) {
                    bancoDeDadosAws.insertAlertas("Crítico", finalIdComputador * 4 - 2, finalIdComputador);
                } else if (memoriaRamEmUso >= (looca.getMemoria().getTotal().doubleValue() / conversorGb) * (metrica.get(0).getMedioRam() / 100)) {
                    bancoDeDadosAws.insertAlertas("Médio", finalIdComputador * 4 - 2, finalIdComputador);
                }

                break;
            }
            case 1,2:{
                bancoDeDadosAws.insertRegistro(discoDisponivel, "Uso Disco", finalIdComputador * 4 - 1);
                bancoDeDadosAws.insertRegistro(swapDisponivel, "SwapDisponivel", finalIdComputador * 4 - 1);

                Double tamanhoDiscoGb = looca.getGrupoDeDiscos().getVolumes().get(0).getTotal().doubleValue() / conversorGb;
                Double porcentagemMedio = metrica.get(0).getMedioDisco() / 100;
                Double porcentagemGrave = metrica.get(0).getGraveDisco() / 100;


                if (discoDisponivel < (tamanhoDiscoGb - (tamanhoDiscoGb * porcentagemGrave))) {
                    bancoDeDadosAws.insertAlertas("Crítico", finalIdComputador * 4 - 1, finalIdComputador);
                } else if (discoDisponivel < (tamanhoDiscoGb - (tamanhoDiscoGb * porcentagemMedio))) {
                    bancoDeDadosAws.insertAlertas("Médio", finalIdComputador * 4 - 1, finalIdComputador);
                }
                break;
            }
            case 3:{
                bancoDeDadosAws.insertRegistro(processadorEmUso, "UsoCpu", finalIdComputador * 4 - 3);
                bancoDeDadosAws.insertRegistro(Double.valueOf(dias), "Dias", finalIdComputador * 4 - 3);
                bancoDeDadosAws.insertRegistro(Double.valueOf(horas), "Horas", finalIdComputador * 4 - 3);
                bancoDeDadosAws.insertRegistro(Double.valueOf(minutos), "Minutos", finalIdComputador * 4 - 3);
                bancoDeDadosAws.insertRegistro(Double.valueOf(segundos), "Segundos", finalIdComputador * 4 - 3);
                bancoDeDadosAws.insertRegistro(numeroProcessos, "QuantidadeProcessos", finalIdComputador * 4 - 3);
                bancoDeDadosAws.insertRegistro(numeroThreads, "QuantidadeThreads", finalIdComputador * 4 - 3);

                if (processadorEmUso >= metrica.get(0).getGraveCPU()) {
                    bancoDeDadosAws.insertAlertas("Crítico", finalIdComputador * 4 - 3, finalIdComputador);
                } else if (processadorEmUso >= metrica.get(0).getMedioCPU()) {
                    bancoDeDadosAws.insertAlertas("Médio", finalIdComputador * 4 - 3, finalIdComputador);
                }
                break;
            }
        }
    }
}