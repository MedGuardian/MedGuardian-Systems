import com.github.britooo.looca.api.core.Looca;

import java.sql.SQLOutput;
import java.util.*;

public class testeProjeto {

    public static void main(String[] args) {

        Looca looca = new Looca();
        EnviarBD bancoDeDados = new EnviarBD();

        String nomeComputador = looca.getRede().getParametros().getNomeDeDominio();
        Integer conversorGb = 1000000000;
        Integer conversorMb = 1000000;
        Boolean logado = false;
        Integer idComputador;
        Integer hd = 0;

        if(bancoDeDados.verificarComputadorCadastrado(nomeComputador)){
            bancoDeDados.insertComputador(nomeComputador);
            idComputador = bancoDeDados.selectIdComputador(nomeComputador);
            if(!looca.getGrupoDeDiscos().getVolumes().isEmpty()){
                for(int i = 0; i < looca.getGrupoDeDiscos().getQuantidadeDeDiscos(); i++) {
                    bancoDeDados.insertComponente("HD" + (i + 1), idComputador);
                    hd++;
                }
            }
            bancoDeDados.insertComponente("RAM", idComputador);
            bancoDeDados.insertComponente("PROCESSADOR", idComputador);
            bancoDeDados.insertComponente("REDE", idComputador);
        } else {
            idComputador = bancoDeDados.selectIdComputador(nomeComputador);
        }

        do {
//            System.out.println(looca.getGrupoDeJanelas().getJanelasVisiveis());
//            String nomeApp = "";
//            for(int i = 0; i < looca.getGrupoDeJanelas().getJanelasVisiveis().size(); i++){
//                if(!looca.getGrupoDeJanelas().getJanelasVisiveis().get(i).getTitulo().isEmpty()){
//                    if(looca.getGrupoDeJanelas().getJanelasVisiveis().get(i).getTitulo().contains("WhatsApp")){
//                        nomeApp = "Whatsapp";
//                    }
//                }
//            }
//            System.out.println(nomeApp);

            System.out.println("Digite o email: ");
            Scanner leitorEmail = new Scanner(System.in);
            String email = leitorEmail.nextLine();

            System.out.println("Digite a senha: ");
            Scanner leitorSenha = new Scanner(System.in);
            String senha = leitorSenha.nextLine();
            if(!bancoDeDados.autenticarUsuarioComputador(email, senha, idComputador).isEmpty()){
                logado = true;
            }
        } while (!logado);

        Timer timer = new Timer();
        int delay = 0; // Tempo de espera antes da primeira execução (0 significa que será executado imediatamente)
        int interval = 3000; // Intervalo entre as execuções em milissegundos (5 segundos)

        Integer finalIdComputador = idComputador;
        timer.scheduleAtFixedRate(new TimerTask() {
            public void run() {
                System.out.println("DADOS SENDO MONITORADOS...");

                Double discoEmUso = looca.getGrupoDeDiscos().getVolumes().get(0).getTotal().doubleValue() / conversorGb;
                Double discoDisponivel = looca.getGrupoDeDiscos().getVolumes().get(0).getDisponivel().doubleValue() / conversorGb;
                Double memoriaRamEmUso = looca.getMemoria().getEmUso().doubleValue() / conversorGb;
                Double memoriaRamDisponivel = looca.getMemoria().getDisponivel().doubleValue() / conversorGb;
                Double processadorEmUso = looca.getProcessador().getUso();
                Double redeAtual;
                
                if((looca.getRede().getGrupoDeInterfaces().getInterfaces().get(4).getBytesEnviados().doubleValue() / conversorMb) > 0){
                    redeAtual = (looca.getRede().getGrupoDeInterfaces().getInterfaces().get(4).getPacotesEnviados().doubleValue() + looca.getRede().getGrupoDeInterfaces().getInterfaces().get(4).getPacotesRecebidos().doubleValue()) / conversorMb;
                } else {
                    redeAtual = (looca.getRede().getGrupoDeInterfaces().getInterfaces().get(3).getPacotesEnviados().doubleValue() + looca.getRede().getGrupoDeInterfaces().getInterfaces().get(3).getPacotesRecebidos().doubleValue()) / conversorMb;
                }


                for(int i = 0; i < bancoDeDados.selectComponente(finalIdComputador).size(); i++){
                    Integer idComponente = bancoDeDados.selectComponente(finalIdComputador).get(i).getIdComponente();
                    String nomeComponente = bancoDeDados.selectComponente(finalIdComputador).get(i).getNomeComponente();

                    switch (nomeComponente) {
                        case "HD1" -> {
                            bancoDeDados.insertRegistro(discoEmUso, "Uso", finalIdComputador, idComponente);
                            bancoDeDados.insertRegistro(discoDisponivel, "Disponível", finalIdComputador, idComponente);
                        }
                        case "RAM" -> {
                            bancoDeDados.insertRegistro(memoriaRamEmUso, "Uso", finalIdComputador, idComponente);
                            bancoDeDados.insertRegistro(memoriaRamDisponivel, "Disponível", finalIdComputador, idComponente);
                        }
                        case "PROCESSADOR" ->
                                bancoDeDados.insertRegistro(processadorEmUso, "Uso", finalIdComputador, idComponente);
                        case "REDE" ->
                                bancoDeDados.insertRegistro(redeAtual, "Velocidade", finalIdComputador, idComponente);
                    }
                }
            }
        }, delay, interval);
    }

    }
