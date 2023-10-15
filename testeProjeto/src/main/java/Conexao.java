import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class Conexao {
    JdbcTemplate conexaoDoBanco;

    public JdbcTemplate getConexaoDoBanco() {
        return conexaoDoBanco;
    }

    public Conexao() {
        BasicDataSource dataSource = new BasicDataSource();
        /*
             Exemplo de driverClassName:
                com.mysql.cj.jdbc.Driver <- EXEMPLO PARA MYSQL
                com.microsoft.sqlserver.jdbc.SQLServerDriver <- EXEMPLO PARA SQL SERVER
        */
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        /*
             Exemplo de string de conexões:
                jdbc:mysql://localhost:3306/mydb <- EXEMPLO PARA MYSQL
                jdbc:sqlserver://localhost:1433;database=mydb <- EXEMPLO PARA SQL SERVER
        */
        dataSource.setUrl("jdbc:mysql://localhost:3306/medGuardian");
        dataSource.setUsername("root");
        dataSource.setPassword("@21102002Lu");

        conexaoDoBanco = new JdbcTemplate(dataSource);
    }
}
