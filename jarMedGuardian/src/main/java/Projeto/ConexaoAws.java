package Projeto;

public class ConexaoAws extends Conexao {
    public ConexaoAws() {
        // Configurações específicas para conexão AWS
        super("com.microsoft.sqlserver.jdbc.SQLServerDriver",
                "jdbc:sqlserver://3.87.104.124:1433;database=medguardian;trustServerCertificate=true",
                "sa",
                "123");
    }
}