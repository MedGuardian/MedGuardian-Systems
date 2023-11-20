package Projeto;

import com.github.britooo.looca.api.core.Looca;
import java.io.IOException;
import java.util.*;

public class TesteProjeto {
    public static void main(String[] args) {

        Looca looca = new Looca();
        EnviarBD bancoDeDados = new EnviarBD();

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

                if(bancoDeDados.verificarComputadorCadastrado(nomeComputador)){
                    Integer fkEmpresaDoFuncionario = bancoDeDados.getFkEmpresaPorIdFuncionario(idFuncionario);
                    bancoDeDados.insertComputador(nomeComputador, fkEmpresaDoFuncionario);
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
                                bancoDeDados.insertEspecificacao(idComputador, idComponente, 100.);

                            }
                            case 2 -> {
                                bancoDeDados.insertEspecificacao(idComputador, idComponente, looca.getMemoria().getTotal().doubleValue() / conversorGb);
                            }
                            case 3 ->
                                    bancoDeDados.insertEspecificacao(idComputador, idComponente, ((looca.getGrupoDeDiscos().getVolumes().get(0).getTotal().doubleValue() / conversorGb)) - 30);
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

        Timer timer = new Timer();
        int delay = 0; // Tempo de espera antes da primeira execução (0 significa que será executado imediatamente)
        int interval = 5000; // Intervalo entre as execuções em milissegundos (5 segundos)

        Integer finalIdComputador = idComputador;
        timer.scheduleAtFixedRate(new TimerTask() {
            public void run() {
                System.out.println("DADOS SENDO MONITORADOS...");

                Double discoDisponivel = looca.getGrupoDeDiscos().getVolumes().get(0).getDisponivel().doubleValue() / conversorGb;
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

                for(int i = 0; i < bancoDeDados.selectComponente().size(); i++){
                    Integer idComponente = bancoDeDados.selectComponente().get(i).getIdComponente();
                    String nomeComponente = bancoDeDados.selectComponente().get(i).getNomeComponente();
                    String nomeHD = HD.getNomeComponente();

                    switch (idComponente) {
                        case  1-> {
                            bancoDeDados.insertRegistro(processadorEmUso, "UsoCpu", 1);
                            bancoDeDados.insertRegistro(Double.valueOf(dias), "Dias", 1);
                            bancoDeDados.insertRegistro(Double.valueOf(horas), "Horas", 1);
                            bancoDeDados.insertRegistro(Double.valueOf(minutos), "Minutos", 1);
                            bancoDeDados.insertRegistro(Double.valueOf(segundos), "Segundos", 1);
                            bancoDeDados.insertRegistro(numeroProcessos, "QuantidadeProcessos", 1);
                            bancoDeDados.insertRegistro(numeroThreads, "QuantidadeThreads", 1);

                        }
                        case 2 -> {
                            bancoDeDados.insertRegistro(memoriaRamEmUso, "Uso", 2);
                        }
                        case 3 -> {
                            bancoDeDados.insertRegistro(discoDisponivel, "Uso", 3);
                            bancoDeDados.insertRegistro(swapDisponivel, "SwapDisponivel", 3);
                        }
                        case 4 ->
                                bancoDeDados.insertRegistro(redeAtual, "Velocidade", 4);
                    }
                }
            }
        }, delay, interval);
    }
}