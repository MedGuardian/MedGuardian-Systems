package Projeto;

import com.github.britooo.looca.api.core.Looca;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

import oshi.SystemInfo;
import oshi.hardware.HWDiskStore;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.*;

public class Log {

    public static void main(String[] args) throws IOException {

        Looca looca = new Looca();
        Slack slack = new Slack();
        Double processadorEmUso = looca.getProcessador().getUso();

        Integer segundos = looca.getSistema().getTempoDeAtividade().intValue();

        Integer dias = segundos / 86400;
        segundos = segundos % 86400;

        Integer horas = segundos / 3600;
        segundos = segundos % 3600;

        FileWriter arq = new FileWriter("C:\\Users\\Aluno\\Downloads\\TempoDeAtividade.txt");
        PrintWriter gravarArq = new PrintWriter(arq);

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd_HHmmss");
        String dataHoraAtual = dateFormat.format(new Date());


        gravarArq.printf("+--Tempo atividade--+%n");

        gravarArq.printf( dias + "dias" + dataHoraAtual);

        arq.close();

        System.out.printf("\nO alerta de  uso foi gravado com sucesso \"C:\\Users\\sarah\\OneDrive\\Área de Trabalho\\TempoDeAtividade.txt \n");
        slack.enviarArquivoSlack("Log", "C:\\Users\\Aluno\\Downloads\\TempoDeAtividade.txt", "Aqui está o log");
    }
}

