package Projeto;

import java.lang.management.ManagementFactory;
import java.lang.management.OperatingSystemMXBean;
import java.util.ArrayList;
import java.util.List;

public class ObterMemoriaSwap {

    public static List<Double> ObterMemoriaSwap() {
        OperatingSystemMXBean osBean = ManagementFactory.getOperatingSystemMXBean();
        List<Double> infoMemoriaSwap = new ArrayList<>();
        // Verifica se a implementação fornece a informação sobre memória swap.
        if (osBean instanceof com.sun.management.OperatingSystemMXBean sunOsBean) {
            // A memória SWAP disponível é retornada em bytes.
            double swapDisponivel = sunOsBean.getFreeSwapSpaceSize();
            double swapTotal = sunOsBean.getTotalSwapSpaceSize();
            infoMemoriaSwap.add(swapDisponivel);
            infoMemoriaSwap.add(swapTotal);
            return infoMemoriaSwap;
        } else {
            System.out.println("A implementação do sistema não fornece a velocidade do processador.");
            return null;
        }
    }
}
