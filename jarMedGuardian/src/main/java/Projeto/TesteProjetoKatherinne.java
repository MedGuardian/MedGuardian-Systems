package Projeto;

import com.github.britooo.looca.api.core.Looca;
import java.io.IOException;
import java.util.Scanner;
import java.util.Timer;
import java.util.TimerTask;

import java.util.*;

public class TesteProjetoKatherinne {
    public static void main(String[] args) {
        boolean pausarMonitoramento = true;

        KatherinneTimer timer = new KatherinneTimer();
        Scanner menu = new Scanner(System.in);

        timer.executar();

        while (true) {


            Integer opcao = menu.nextInt();

            switch(opcao){
                case 1:
                    timer.zerarTimer();
                    break;
                case 2:
                    timer.resetar();
                    break;
                case 0:
                    System.exit(0);
                    break;
            }
        }





//
//        Timer monitorTimer = new Timer();
//        boolean finalPausarMonitoramento = pausarMonitoramento;
//        monitorTimer.scheduleAtFixedRate(new TimerTask() {
//            public void run() {
//                if (finalPausarMonitoramento) {
//                } else {
//                    System.out.println("Monitoramento pausado. Realize a manutenção na máquina.");
//                }
//            }
//        }, delay, interval);
//
//        do{
//            System.out.println("Pressione 'P' para pausar o monitoramento ou 'R' para retomar:");
//            Scanner scanner = new Scanner(System.in);
//            String input;
//            input = scanner.nextLine().toUpperCase();
//            if(input.equalsIgnoreCase("p")){
//                pausarMonitoramento = !pausarMonitoramento;
//                do{
//                    input = scanner.nextLine().toUpperCase();
//                }while(!input.equalsIgnoreCase("r"));
//            }else if(input.equalsIgnoreCase("r")){
//                pausarMonitoramento = !pausarMonitoramento;
//                do{
//                    input = scanner.nextLine().toUpperCase();
//                }while(!input.equalsIgnoreCase("r"));
//            }
//
////            if (input.equalsIgnoreCase("p")){
////                pausarMonitoramento = !pausarMonitoramento;
////                System.out.println("""
////                        Agora você pode iniciar a manutenção!
////                        """);
////                System.exit(0);
////            } else if (input.equals("R") || input.equals("r")) {
////                String input = scanner.nextLine().toUpperCase();
////                pausarMonitoramento = !pausarMonitoramento;
////            }
//        }while(pausarMonitoramento);
    }
}