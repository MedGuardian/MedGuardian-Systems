package Projeto;

public class ConexaoAws extends Conexao {
    public ConexaoAws() {
        // Configurações específicas para conexão AWS
        super("com.microsoft.sqlserver.jdbc.SQLServerDriver",
                "jdbc:sqlserver://35.175.71.162:1433;database=MedGuard;trustServerCertificate=true",
                "sa",
                "123");
    }
}