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

        Double processadorEmUso = looca.getProcessador().getUso();

        Integer segundos = looca.getSistema().getTempoDeAtividade().intValue();

        Integer dias = segundos / 86400;
        segundos = segundos % 86400;

        Integer horas = segundos / 3600;
        segundos = segundos % 3600;

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy_HH:mm:ss");
        String dataHoraAtual = dateFormat.format(new Date());

        FileWriter arq = new FileWriter("C:\\Users\\sarah\\OneDrive\\Área de Trabalho\\" + dataHoraAtual + ".txt");
        PrintWriter gravarArq = new PrintWriter(arq);




        gravarArq.printf(dataHoraAtual);

        gravarArq.printf( dias + "dias" + dataHoraAtual);

        arq.close();

        System.out.printf("\nO alerta de  uso foi gravado com sucesso \"C:\\Users\\sarah\\OneDrive\\Área de Trabalho\\TempoDeAtividade.txt");
    }
}

