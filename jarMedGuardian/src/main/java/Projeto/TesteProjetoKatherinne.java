package Projeto;

import com.github.britooo.looca.api.core.Looca;
import java.io.IOException;
import java.util.Scanner;
import java.util.Timer;
import java.util.TimerTask;

import java.util.*;

public class TesteProjetoKatherinne {
    public static void main(String[] args) {
        KatherinneTimer timer = new KatherinneTimer();
        System.out.println("""
                _______________________________________
                |        Escolha uma das opções:      |
                |   1 - Para pausar o monitoramento;  |
                |   2 - Para Retomar o monitoramento; |
                |   3 - Sair;                         |
                |_____________________________________|
                """);
        Scanner menu = new Scanner(System.in);

        timer.executar();

        while (true) {
            Integer opcao = menu.nextInt();

            switch(opcao){
                case 1:
                    System.out.println("""
                            Monitoramento Pausado! Agora você pode realizar a manutenção desta maquina!
                            Digite "2" quando acabar, para retonar o monitoramento!
                            """);
                    timer.zerarTimer();
                    break;
                case 2:
                    System.out.println("""
                            Monitoramento Retomado! Confirme seus dados para retomar o monitoramento!
                            Digite "0" para sair!
                            """);
                    timer.resetar();
                    break;
                case 0:
                    System.out.println("""
                            Monitore agora pela sua DashBoard pelo nosso site! Até mais!
                            """);
                    timer.zerarTimer();
                    System.exit(0);
                    break;
            }
        }
    }
}