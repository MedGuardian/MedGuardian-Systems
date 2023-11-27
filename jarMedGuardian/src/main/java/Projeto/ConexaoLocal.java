package Projeto;

public class ConexaoLocal extends Conexao {
    public ConexaoLocal() {
        // Configurações específicas para conexão local
        super("com.mysql.cj.jdbc.Driver",
                "jdbc:mysql://localhost:3306/jarPedro",
                "aluno",
                "aluno");
    }
}

