package Projeto;

import com.github.britooo.looca.api.core.Looca;

import javax.swing.*;
import java.awt.*;
import java.util.*;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;

public class TesteProjetoArthur {
    private static JFrame frame2;
    private static EnviarBD bancoDeDados = new EnviarBD();
    private static Looca looca = new Looca();
    private static boolean monitoramentoAtivo = false;

    public static void main(String[] args) {

        Componente HD = new Componente(looca.getGrupoDeDiscos().getDiscos().get(0).getModelo());
        Componente RAM = new Componente("RAM");
        Componente PROCESSADOR = new Componente(looca.getProcessador().getNome());
        Componente REDE = new Componente("REDE");
        Componente TEMPOATIVIDADE = new Componente("TEMPO DE ATIVIDADE");

        String nomeComputador = looca.getRede().getParametros().getNomeDeDominio();
        System.out.println(looca.getRede().getGrupoDeInterfaces().getInterfaces().get(1).getPacotesEnviados().doubleValue());

        int idComputador;
        int hd = 0;
        AtomicReference<Integer> idFuncionario = new AtomicReference<>(0);
        final boolean[] logado = {false};

        JFrame frame = new JFrame("Monitoramento de Dados");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLayout(new GridBagLayout());

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(5, 5, 5, 5);

        JTextField emailField = new JTextField(20);
        JPasswordField senhaField = new JPasswordField(20);
        JButton loginButton = new JButton("Login");

        gbc.gridx = 0;
        gbc.gridy = 0;
        frame.add(new JLabel("Email:"), gbc);
        gbc.gridy = 1;
        frame.add(emailField, gbc);
        gbc.gridy = 2;
        frame.add(new JLabel("Senha:"), gbc);
        gbc.gridy = 3;
        frame.add(senhaField, gbc);
        gbc.gridy = 4;
        frame.add(loginButton, gbc);

        frame.pack();
        frame.setLocationRelativeTo(null);

        frame.setVisible(true);
        loginButton.addActionListener(e -> {
            String email = emailField.getText();
            String senha = new String(senhaField.getPassword());

            List<Funcionario> usuarios = bancoDeDados.autenticarUsuario(email, senha);
            if (!usuarios.isEmpty()) {
                idFuncionario.set(usuarios.get(0).getIdFuncionario());
                logado[0] = true;

                // Feche a janela de login
                frame.dispose();
            } else {
                JOptionPane.showMessageDialog(frame, "Login inválido. Tente novamente.");
            }
        });

        while (!logado[0]) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();

        if(bancoDeDados.verificarComputadorCadastrado(nomeComputador)){
            if(System.getProperty("os.name").toLowerCase().contains("win")){
                sistemaOperacional = "Windows";
            } else {
                sistemaOperacional = "Linux";
            }

            bancoDeDados.insertComputador(nomeComputador, bancoDeDados.getFkEmpresaPorIdFuncionario(idFuncionario), sistemaOperacional);
            bancoDeDados.insertComponente(RAM.getNomeComponente());
            bancoDeDados.insertComponente(PROCESSADOR.getNomeComponente());
            bancoDeDados.insertComponente(REDE.getNomeComponente());
            bancoDeDados.insertComponente(TEMPOATIVIDADE.getNomeComponente());
            idComputador = bancoDeDados.selectIdComputador(nomeComputador);
            if(!looca.getGrupoDeDiscos().getVolumes().isEmpty()){
                for(int i = 0; i < looca.getGrupoDeDiscos().getQuantidadeDeDiscos(); i++) {
                    bancoDeDados.insertComponente(HD.getNomeComponente() + (i + 1));
                }
            }
       } else {
                        idComputador = bancoDeDados.selectIdComputador(nomeComputador);
                    }

                    frame2 = new JFrame("Seleção de Componente para Monitoramento");
                    frame2.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    frame2.setLayout(new GridBagLayout());

                    GridBagConstraints gbc2 = new GridBagConstraints();
                    gbc2.fill = GridBagConstraints.HORIZONTAL;
                    gbc2.insets = new Insets(5, 5, 5, 5);

                    JLabel labelListaComponentes = new JLabel("Lista de Componentes Cadastrados:");
                    gbc2.gridx = 0;
                    gbc2.gridy = 0;
                    frame2.add(labelListaComponentes, gbc2);

                    ArrayList<String> componentesCadastrados = new ArrayList<>();
                    try {
                        List<Componente> componentes = bancoDeDados.selectComponente();
                        for (Componente componente : componentes) {
                            componentesCadastrados.add(componente.getNomeComponente());
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                        JOptionPane.showMessageDialog(frame2, "Erro ao recuperar componentes do banco de dados.");
                    }
                    for (int j = 0; j < componentesCadastrados.size(); j++) {
                        JLabel labelComponente = new JLabel(j + 1 + ". " + componentesCadastrados.get(j));
                        gbc2.gridx = 0;
                        gbc2.gridy = j + 1;
                        frame2.add(labelComponente, gbc2);
                    }

                    JTextField componenteField = new JTextField(20);
                    JButton adicionarComponenteButton = new JButton("Adicionar Componente");

                    gbc2.gridx = 0;
                    gbc2.gridy = componentesCadastrados.size() + 1;
                    frame2.add(new JLabel("Digite o número do componente que você deseja monitorar:"), gbc2);
                    gbc2.gridy = componentesCadastrados.size() + 2;
                    frame2.add(componenteField, gbc2);
                    gbc2.gridy = componentesCadastrados.size() + 3;
                    frame2.add(adicionarComponenteButton, gbc2);

                    frame2.pack();
                    frame2.setLocationRelativeTo(null);
                    frame2.setVisible(true);

                    JButton monitorarButton = new JButton("Monitorar");
                    gbc2.gridy = componentesCadastrados.size() + 4;
                    frame2.add(monitorarButton, gbc2);

                    JButton pararMonitoramentoButton = new JButton("Parar Monitoramento");
                    gbc2.gridy = componentesCadastrados.size() + 5;
                    frame2.add(pararMonitoramentoButton, gbc2);

                    Timer timer = new Timer();
                    int delay = 0;
                    int interval = 10000;

                    timer.scheduleAtFixedRate(new TimerTask() {
                        public void run() {
                            List<String> componentesSelecionados = new ArrayList<>();

                            final boolean[] componenteAdicionado = {false};
                            ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);

                            adicionarComponenteButton.addActionListener(e -> {
                                if (!componenteAdicionado[0]) {
                                    String componenteSelecionado = componentesCadastrados.get(Integer.parseInt(componenteField.getText()) - 1);

                                    componentesSelecionados.add(componenteSelecionado);
                                    componenteAdicionado[0] = true;
                                    JOptionPane.showMessageDialog(frame2, "Componente adicionado: " + componenteSelecionado);
                                } else {
                                    JOptionPane.showMessageDialog(frame2, "Componente já adicionado.");
                                }
                            });

                            monitorarButton.addActionListener(e2 -> {
                                if (!monitoramentoAtivo) {
                                    String componenteSelecionado = componentesCadastrados.get(Integer.parseInt(componenteField.getText()) - 1);

                                    if (componentesSelecionados.isEmpty()) {
                                        JOptionPane.showMessageDialog(frame2, "Nenhum componente selecionado para monitoramento.");
                                    } else if (componentesSelecionados.contains(componenteSelecionado)) {
                                        if (!monitoramentoAtivo) {
                                            monitoramentoAtivo = true;
                                            iniciarMonitoramentoComponente(componenteSelecionado, looca, bancoDeDados);
                                            JOptionPane.showMessageDialog(frame2, "Monitorando o componente: " + componenteSelecionado);
                                        }
                                    } else {
                                        JOptionPane.showMessageDialog(frame2, "Componente não encontrado na lista de seleção.");
                                    }
                                }
                            });

                            pararMonitoramentoButton.addActionListener(e3 -> {
                                monitoramentoAtivo = false;
                                executor.shutdown(); // Pare o agendamento das tarefas
                                JOptionPane.showMessageDialog(frame2, "Monitoramento interrompido.");
                            });

                        }
                    }, delay, interval);

                }

    private static void iniciarMonitoramentoComponente(String componenteMonitorado, Looca looca,
            EnviarBD bancoDeDados) {
        int intervaloMonitoramento = 3;

        ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
        executor.scheduleAtFixedRate(() -> monitorarComponente(componenteMonitorado, looca, bancoDeDados), 0,
                intervaloMonitoramento, TimeUnit.SECONDS);
    }

    private static void monitorarComponente(String componenteMonitorado, Looca looca, EnviarBD bancoDeDados) {
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
