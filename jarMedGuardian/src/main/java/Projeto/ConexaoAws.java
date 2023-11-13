package Projeto;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class ConexaoAws{
    JdbcTemplate conexaoDoBanco;

    public JdbcTemplate getConexaoDoBanco() {
        return conexaoDoBanco;
    }

    public ConexaoAws() {
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        dataSource.setUrl("jdbc:sqlserver://35.175.71.162:1433;database=MedGuard;trustServerCertificate=true");
        dataSource.setUsername("sa");
        dataSource.setPassword("123");

        conexaoDoBanco = new JdbcTemplate(dataSource);
    }
}