package Projeto;

import com.github.britooo.looca.api.core.Looca;
import okhttp3.*;

import javax.swing.*;

import java.util.*;
import java.util.List;
import java.util.Timer;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class TesteProjetoArthur {

    private static JFrame frame2;
    private static EnviarBD bancoDeDados = new EnviarBD();
    private static Looca looca = new Looca();
    static Boolean monitoramentoAtivo = false;
    static Boolean pararMonitoramento = false;
    public static void main(String[] args) {

        Componente HD = new Componente(looca.getGrupoDeDiscos().getDiscos().get(0).getModelo());
        Componente RAM = new Componente("RAM");
        Componente PROCESSADOR = new Componente(looca.getProcessador().getNome());
        Componente REDE = new Componente("REDE");
        Componente TEMPOATIVIDADE = new Componente("TEMPO DE ATIVIDADE");

        String nomeComputador = looca.getRede().getParametros().getNomeDeDominio();
        System.out.println(looca.getRede().getGrupoDeInterfaces().getInterfaces().get(1).getPacotesEnviados().doubleValue());
        Scanner scanner = new Scanner(System.in);
        Integer idComputador;
        Integer hd = 0;
        String sistemaOperacional;
        Integer idFuncionario = null;
        Boolean logado = false;

        System.out.println("Monitoramento de Dados");
        System.out.println("Digite seu Email");
        String email = scanner.nextLine();
        System.out.println("Digite sua senha");
        String senha = scanner.nextLine();

        List<Funcionario> usuarios = bancoDeDados.autenticarUsuario(email, senha);
        if (!usuarios.isEmpty()) {
            idFuncionario = (usuarios.get(0).getIdFuncionario());
            logado = true;
            System.out.println("Logado com Sucesso");
        } else {
            System.out.println("Login inválido. Tente novamente.");
        }

        Timer timer = new Timer();
        int delay = 0;
        int interval = 10000;

        ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
        do {
            if (!logado){
                break;
            } else{

            if (bancoDeDados.verificarComputadorCadastrado(nomeComputador)) {
                if (System.getProperty("os.name").toLowerCase().contains("win")) {
                    sistemaOperacional = "Windows";
                } else {
                    sistemaOperacional = "Linux";
                }

                bancoDeDados.insertComputador(nomeComputador, bancoDeDados.getFkEmpresaPorIdFuncionario(idFuncionario), sistemaOperacional);
                bancoDeDados.insertComponente(RAM.getNomeComponente());
                bancoDeDados.insertComponente(PROCESSADOR.getNomeComponente());
                bancoDeDados.insertComponente(TEMPOATIVIDADE.getNomeComponente());
                idComputador = bancoDeDados.selectIdComputador(nomeComputador);
                if (!looca.getGrupoDeDiscos().getVolumes().isEmpty()) {
                    for (int i = 0; i < looca.getGrupoDeDiscos().getQuantidadeDeDiscos(); i++) {
                        bancoDeDados.insertComponente(HD.getNomeComponente() + (i + 1));
                    }
                }
            } else {
                idComputador = bancoDeDados.selectIdComputador(nomeComputador);
            }

            System.out.println("Seleção de Componente para Monitoramento");

            System.out.println("Lista de Componentes Cadastrados:");

            ArrayList<String> componentesCadastrados = new ArrayList<>();
            try {
                List<Componente> componentes = bancoDeDados.selectComponente();
                for (Componente componente : componentes) {
                    componentesCadastrados.add(componente.getNomeComponente());
                }
            } catch (Exception e) {
                e.printStackTrace();
                System.out.println("Erro ao recuperar componentes do banco de dados.");
            }
            Integer numeroDoComponente;
            System.out.println("""
                        Digite qual o número do componente que você deseja monitorar:
                    """);
            System.out.println("""
                    ------------------------------------
                    """);
            for (int j = 0; j < componentesCadastrados.size(); j++) {
                System.out.println(String.format("""
                        | %d - %s |
                        """.formatted(j+1, componentesCadastrados.get(j))));
            }

                numeroDoComponente = scanner.nextInt();

                System.out.println("""
                    ------------------------------------
                    """);



                if (pararMonitoramento) {
                    executor.shutdown();
                    monitoramentoAtivo = false;
                    pararMonitoramento = false;
                } else {
                    executor.scheduleAtFixedRate(() -> {
                        String componenteSelecionado = componentesCadastrados.get(numeroDoComponente - 1);
                        if (componenteSelecionado.isEmpty()) {
                            System.out.println("Nenhum componente selecionado para monitoramento.");
                        } else if (componentesCadastrados.contains(componenteSelecionado)) {
                            if (!monitoramentoAtivo) {
                                monitoramentoAtivo = true;
                                iniciarMonitoramentoComponente(componenteSelecionado, looca, bancoDeDados);
                                System.out.println("Monitorando o componente: " + componenteSelecionado);
                            }
                        } else {
                            System.out.println("Componente não encontrado na lista de seleção.");
                        }
                    }, delay, interval, TimeUnit.MILLISECONDS);

                    System.out.println("Deseja parar o monitoramento? (1 - Sim, 0 - Não)");
                    int opcaoParar = scanner.nextInt();
                    if (opcaoParar == 1) {
                        pararMonitoramento = true;
                    }
                }
            }
        } while (logado);
    }

    private static void iniciarMonitoramentoComponente(String componenteMonitorado, Looca looca, EnviarBD bancoDeDados) {
        int intervaloMonitoramento = 3;

        ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
        executor.scheduleAtFixedRate(() -> {
            if (pararMonitoramento) {
                executor.shutdown();
                monitoramentoAtivo = false;
                pararMonitoramento = false;
            } else {
                monitorarComponente(componenteMonitorado, looca, bancoDeDados);
            }
        }, 0, intervaloMonitoramento, TimeUnit.SECONDS);


    }


    private static void monitorarComponente (String componenteMonitorado, Looca looca, EnviarBD bancoDeDados){
                int conversorGb = 1000000000;
        switch (componenteMonitorado) {
            case "HD":
                        // Monitoramento do HD
                        Double discoEmUso = looca.getGrupoDeDiscos().getVolumes().get(0).getDisponivel().doubleValue()
                                / conversorGb;
                        bancoDeDados.insertRegistro(discoEmUso, "Uso do HD", 1);
                        break;

                    case "RAM":
                        // Monitoramento da RAM
                        Double memoriaRamEmUso = looca.getMemoria().getEmUso().doubleValue() / conversorGb;
                        bancoDeDados.insertRegistro(memoriaRamEmUso, "Uso da RAM", 1);
                        System.out.println("AAAAAAA");
                        break;

                    case "PROCESSADOR":
                        // Monitoramento do Processador
                        Double processadorEmUso = looca.getProcessador().getUso();
                        int segundos = looca.getSistema().getTempoDeAtividade().intValue();
                        int dias = segundos / 86400;
                        segundos = segundos % 86400;
                        int horas = segundos / 3600;
                        segundos = segundos % 3600;
                        int minutos = segundos / 60;
                        segundos = segundos % 60;
                        Double numeroThreads = looca.getGrupoDeProcessos().getTotalThreads().doubleValue();
                        Double numeroProcessos = looca.getGrupoDeProcessos().getTotalProcessos().doubleValue();
                        bancoDeDados.insertRegistro(processadorEmUso, "Uso", 3);
                        bancoDeDados.insertRegistro(Double.valueOf(dias), "Dias", 3);
                        bancoDeDados.insertRegistro(Double.valueOf(horas), "Horas", 3);
                        bancoDeDados.insertRegistro(Double.valueOf(minutos), "Minutos", 3);
                        bancoDeDados.insertRegistro(Double.valueOf(segundos), "Segundos", 3);
                        bancoDeDados.insertRegistro(numeroProcessos, "Quantidade", 3);
                        bancoDeDados.insertRegistro(numeroThreads, "Quantidade", 3);
                        break;

                    case "REDE":
                        // Monitoramento da Rede
                        Integer conversorMb = 1000000;

                        Double redeAtual;
                        redeAtual = (looca.getRede().getGrupoDeInterfaces().getInterfaces().get(1).getPacotesEnviados()
                                .doubleValue()
                                + looca.getRede().getGrupoDeInterfaces().getInterfaces().get(1).getPacotesRecebidos()
                                .doubleValue())
                                / conversorMb;
                        bancoDeDados.insertRegistro(redeAtual / conversorMb, "Velocidade", 4);
                        System.out.println(redeAtual);
                        break;
                }
            }

}