package Projeto;

import com.github.britooo.looca.api.core.Looca;
import okhttp3.*;

import javax.swing.*;
import com.github.britooo.looca.api.group.janelas.Janela;

import java.io.IOException;
import java.util.*;
import java.util.List;
import java.util.Timer;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class TesteProjetoArthur {

    private static JFrame frame2;
    private static Looca looca = new Looca();
    static Boolean monitoramentoAtivo = false;
    static Boolean pararMonitoramento = false;
    public static void main(String[] args) {
        Looca looca = new Looca();
        EnviarBDAws bancoDeDadosAws = new EnviarBDAws();
        EnviarBDLocal bancoDeDados = new EnviarBDLocal();
        Scanner scanner = new Scanner(System.in);
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
        List<Integer> listaPIDNaoMatar = new ArrayList<>();
        Integer pid;
        Double graveRam;
        Double medioRam;
        Double graveCPU;
        Double medioCPU;
        Double graveDisco;
        Double medioDisco;

        do {

            List<Janela> listaJanelas = new ArrayList<>();

            for(int i = 0; i< looca.getGrupoDeJanelas().getJanelasVisiveis().size(); i++){
                if(!looca.getGrupoDeJanelas().getJanelasVisiveis().get(i).getTitulo().isEmpty()){
                    listaJanelas.add(looca.getGrupoDeJanelas().getJanelasVisiveis().get(i));
                }
                System.out.println(listaJanelas);
            }

            for(int i = 0; i < listaJanelas.size(); i++){
                for(int j = 0; j < looca.getGrupoDeJanelas().getJanelasVisiveis().size(); j++){
                    if(listaJanelas.get(i).getComando() != looca.getGrupoDeJanelas().getJanelasVisiveis().get(j).getComando()){
                        System.out.println("Não tem na lista");
                    } else {
                        System.out.println("Tem na lista");
                    }
                }
            }

            for(int i = 0; i < looca.getGrupoDeJanelas().getJanelasVisiveis().size(); i++){
                System.out.println(looca.getGrupoDeJanelas().getJanelasVisiveis());
                if(!looca.getGrupoDeJanelas().getJanelasVisiveis().get(i).getTitulo().isEmpty()){
                    if(looca.getGrupoDeJanelas().getJanelasVisiveis().get(i).getTitulo().contains("Realtek") || looca.getGrupoDeJanelas().getJanelasVisiveis().get(i).getTitulo().contains("Configurações") || looca.getGrupoDeJanelas().getJanelasVisiveis().get(i).getTitulo().contains("Experiência de entrada do Windows") || looca.getGrupoDeJanelas().getJanelasVisiveis().get(i).getTitulo().contains("Program Manager") || looca.getGrupoDeJanelas().getJanelasVisiveis().get(i).getTitulo().contains("Restaurar páginas")){
                        listaPIDNaoMatar.add(looca.getGrupoDeJanelas().getJanelasVisiveis().get(i).getPid().intValue());
                    }
                }
            }

            for(int i = 0; i < listaPIDNaoMatar.size(); i++) {
                for (int j = 1; j < looca.getGrupoDeProcessos().getProcessos().size(); j++) {
                    if (listaPIDNaoMatar.get(i) != looca.getGrupoDeProcessos().getProcessos().get(j).getPid()) {
                        pid = looca.getGrupoDeProcessos().getProcessos().get(j).getPid();
                        if (System.getProperty("os.name").toLowerCase().contains("win")) {
                            // Se estiver em um sistema Windows
                            try {
                                Process process = Runtime.getRuntime().exec("taskkill /F /PID " + pid);
                                process.waitFor();
                                System.out.println("O processo com PID " + pid + " foi encerrado.");
                            } catch (IOException | InterruptedException e) {
                                e.printStackTrace();
                            }
                        } else {
                            try {
                                Process process = Runtime.getRuntime().exec("kill " + pid);
                                process.waitFor();
                                System.out.println("O processo com PID " + pid + " foi encerrado.");
                            } catch (IOException | InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                    }
                }
            }

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
                    bancoDeDados.insertComputador(nomeComputador, fkEmpresa, sistemaOperacional);
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
                """.formatted(bancoDeDadosAws.autenticarUsuario(email, senha).get(0).getNomeFuncionario()));
                }
            }
        } while (!logado);

        System.out.println("Id: " + idComputador + "Nome da máquina: " + nomeComputador);

        if(bancoDeDados.verificarComputadorCadastrado(nomeComputador)){
            bancoDeDados.insertComputador(nomeComputador, fkEmpresa, sistemaOperacional);
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
        int delay = 0;
        int interval = 10000;

        ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
        do {
            if (!logado){
                break;
            } else{


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

                for(int i = 0; i < bancoDeDadosAws.selectComponente().size(); i++){
                    Integer idComponenteAws = bancoDeDadosAws.selectComponente().get(i).getIdComponente();

                    switch (idComponenteAws) {
                        case  1-> {
                            bancoDeDados.insertRegistro(processadorEmUso, "UsoCpu", finalIdComputador * 4 - 3);
                            bancoDeDados.insertRegistro(Double.valueOf(dias), "Dias", finalIdComputador * 4 - 3);
                            bancoDeDados.insertRegistro(Double.valueOf(horas), "Horas", finalIdComputador * 4 - 3);
                            bancoDeDados.insertRegistro(Double.valueOf(minutos), "Minutos", finalIdComputador * 4 - 3);
                            bancoDeDados.insertRegistro(Double.valueOf(segundos), "Segundos", finalIdComputador * 4 - 3);
                            bancoDeDados.insertRegistro(numeroProcessos, "QuantidadeProcessos", finalIdComputador * 4 - 3);
                            bancoDeDados.insertRegistro(numeroThreads, "QuantidadeThreads", finalIdComputador * 4 - 3);

                            if(processadorEmUso >= metrica.get(0).getGraveCPU()){
                                bancoDeDados.insertAlertas("Crítico",finalIdComputador * 4 - 3, finalIdComputador);
                            } else if(processadorEmUso >= metrica.get(0).getMedioCPU()){
                                bancoDeDados.insertAlertas("Médio", finalIdComputador * 4 - 3, finalIdComputador);
                            }
                        }
                        case 2 -> {
                            bancoDeDados.insertRegistro(memoriaRamEmUso, "Uso", finalIdComputador * 4 - 2);

                            if(memoriaRamEmUso >= (looca.getMemoria().getTotal().doubleValue() / conversorGb) * (metrica.get(0).getGraveRam() / 100)){
                                bancoDeDados.insertAlertas("Crítico", finalIdComputador * 4 - 2, finalIdComputador);
                            } else if(memoriaRamEmUso >= (looca.getMemoria().getTotal().doubleValue() / conversorGb) * (metrica.get(0).getMedioRam() / 100)){
                                bancoDeDados.insertAlertas("Médio", finalIdComputador * 4 - 2, finalIdComputador);
                            }
                        }
                        case 3 -> {
                            bancoDeDados.insertRegistro(discoDisponivel, "Uso", finalIdComputador * 4 - 1);
                            bancoDeDados.insertRegistro(swapDisponivel, "SwapDisponivel", finalIdComputador * 4 - 1);

                            Double tamanhoDiscoGb = looca.getGrupoDeDiscos().getVolumes().get(0).getTotal().doubleValue() / conversorGb;
                            Double porcentagemMedio = metrica.get(0).getMedioDisco() / 100;
                            Double porcentagemGrave = metrica.get(0).getGraveDisco() / 100;


                            if(discoDisponivel < (tamanhoDiscoGb - (tamanhoDiscoGb * porcentagemGrave))){
                                bancoDeDados.insertAlertas("Crítico", finalIdComputador * 4 - 1, finalIdComputador);
                            } else if(discoDisponivel < (tamanhoDiscoGb - (tamanhoDiscoGb * porcentagemMedio))){
                                bancoDeDados.insertAlertas("Médio", finalIdComputador * 4 - 1, finalIdComputador);
                            }
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

    private static void iniciarMonitoramentoComponente(String componenteMonitorado, Looca looca, EnviarBDLocal bancoDeDados) {
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


    private static void monitorarComponente (String componenteMonitorado, Looca looca, EnviarBDLocal bancoDeDados){
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