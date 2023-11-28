package Projeto;

import com.github.britooo.looca.api.core.Looca;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Log {

    public static void main(String[] args) {
        Log log = new Log();
        log.gravarLog();
    }

    public void gravarLog() {
        Looca looca = new Looca();

        Double processadorEmUso = looca.getProcessador().getUso();

        Integer segundos = looca.getSistema().getTempoDeAtividade().intValue();
        Integer dias = segundos / 86400;
        segundos = segundos % 86400;
        Integer horas = segundos / 3600;
        segundos = segundos % 3600;
        Integer minutos = segundos / 60;
        segundos = segundos % 60;

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd_MM_yyyy_HH_mm_ss");
        String dataHoraAtual = dateFormat.format(new Date());

        String nomeDoArquivo = dataHoraAtual;
        String caminhoDoArquivo = "C:\\Users\\lucas\\OneDrive\\Área de Trabalho\\Logs\\" + nomeDoArquivo + ".txt";

        try {
            FileWriter arq = new FileWriter(caminhoDoArquivo);
            PrintWriter gravarArq = new PrintWriter(arq);

            gravarArq.printf(dataHoraAtual + "\n");
            gravarArq.printf(dias + " dias, " + horas + " horas, " + minutos + " minutos, " + segundos + " segundos\n");

            // Informações sobre CPU
            gravarArq.printf("Uso da CPU: %.2f%%\n", processadorEmUso);

            //Informações sobre RAM
            Double memoriaRamEmUso = looca.getMemoria().getEmUso().doubleValue() / 1000000000; // Converter para GB
            gravarArq.printf("Uso de RAM: %.2f GB\n", memoriaRamEmUso);

            //Informações sobre Disco
            Double discoDisponivel = looca.getGrupoDeDiscos().getVolumes().get(0).getDisponivel().doubleValue() / 1000000000; // Converter para GB
            gravarArq.printf("Espaço disponível no Disco: %.2f GB\n", discoDisponivel);

            //Informações sobre HD
            if (!looca.getGrupoDeDiscos().getDiscos().isEmpty()) {
                gravarArq.printf("Modelo do HD: %s\n", looca.getGrupoDeDiscos().getDiscos().get(0).getModelo());
            }

            //Informações sobre Processador
            gravarArq.printf("Nome do Processador: %s\n", looca.getProcessador().getNome());

            arq.close();

            System.out.println("\nO alerta de uso foi gravado com sucesso em: " + caminhoDoArquivo);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }



    public void gravarErros() {
        try {

            SimpleDateFormat dateFormat = new SimpleDateFormat("dd_MM_yyyy_HH_mm_ss");
            String dataHoraAtual = dateFormat.format(new Date());

            String nomeDoArquivo = "Erros_" + dataHoraAtual;
            String caminhoDoArquivo = "C:\\Users\\lucas\\OneDrive\\Área de Trabalho\\Logs\\x1" + nomeDoArquivo + ".txt";

            FileWriter arq = new FileWriter(caminhoDoArquivo);
            PrintWriter gravarArq = new PrintWriter(arq);

            gravarArq.printf(dataHoraAtual + "\n");
            gravarArq.printf("ERROR!");



            System.out.println("\nErro gravado com sucesso em: " + caminhoDoArquivo);
        } catch (IOException ex) {
            // Em caso de falha ao gravar o erro, imprime no console
            ex.printStackTrace();
        }
    }


}