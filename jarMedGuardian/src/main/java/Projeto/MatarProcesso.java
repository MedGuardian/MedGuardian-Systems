package Projeto;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.processos.Processo;
import java.io.File;
import java.io.IOException;

public class MatarProcesso {
    public void matarProcessoPorNome(String nomeProcesso) {
        Looca looca = new Looca();

        for (Processo processo : looca.getGrupoDeProcessos().getProcessos()) {
            if (processo.getNome().toLowerCase().contains(nomeProcesso.toLowerCase())) {
                long pid = processo.getPid();
                try {
                    if (System.getProperty("os.name").toLowerCase().contains("win")) {
                        // If it's a Windows system
                        Process process = Runtime.getRuntime().exec("taskkill /F /PID " + pid);
                        process.waitFor();
                    } else {
                        // If it's a non-Windows system
                        Process process = Runtime.getRuntime().exec("kill " + pid);
                        process.waitFor();
                    }
                    System.out.println("O processo com PID " + pid + " foi encerrado.");
                } catch (IOException | InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public String pegarNomeProcessoPeloComando(String comando){

        // Criar um objeto File com o caminho
        File caminho = new File(comando);

        // Obter o nome do arquivo sem a extensão
        System.out.println(caminhoSemExtensao(caminho));
        return caminhoSemExtensao(caminho);
    }

    // Método para obter o nome do arquivo sem a extensão
    private static String caminhoSemExtensao(File file) {
        String nomeCaminho = file.getName();
        int ultimoPontoIndex = nomeCaminho.lastIndexOf('.');

        if (ultimoPontoIndex > 0) {
            return nomeCaminho.substring(0, ultimoPontoIndex);
        } else {
            return nomeCaminho;
        }
    }
}
