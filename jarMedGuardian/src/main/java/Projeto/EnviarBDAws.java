package Projeto;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;
import java.util.List;

public class EnviarBDAws {

    // Criar o objeto conexão.
    ConexaoAws conexao = new ConexaoAws();
    JdbcTemplate con = conexao.getConexaoDoBanco();

    public List<Funcionario> autenticarUsuario(String email, String senha){
        List<Funcionario> usuario = con.query("SELECT * FROM funcionario WHERE emailFuncionario = ? AND senhaFuncionario = ?", new BeanPropertyRowMapper<>(Funcionario.class), email, senha);
        mostrarMensagem(usuario);
        return usuario;
    }

    public void insertComponente(String nomeComponente){
        con.update("INSERT INTO componente (nomeComponente) VALUES (?)", nomeComponente);
        System.out.println("CADASTREI O COMPONENTE");
    }

    public void insertEspecificacao(Integer fkComputador, Integer fkComponente, Double totalComponente){
        con.update("INSERT INTO especificacao (fkComputador, fkComponente, totalComponente) VALUES (?, ?, ?)", fkComputador, fkComponente, totalComponente);
    }

    public Integer getFkEmpresaDaMaquinaPeloNome(String nomeComputador){
        List<Computador> computador = con.query("SELECT * FROM computador WHERE nomeComputador = ?", new BeanPropertyRowMapper<>(Computador.class),nomeComputador);

        return computador.get(0).getFkEmpresa();
    }

    public Boolean verificarComputadorCadastrado(String nomeComputador){
        List<Computador> computador = con.query("SELECT * FROM computador WHERE nomeComputador = ?", new BeanPropertyRowMapper<>(Computador.class),nomeComputador);

        return computador.isEmpty();
    }

    public void mostrarMensagem(List<Funcionario> usuario){
        if(usuario.isEmpty()){
            System.out.println("""
                E-MAIL OU SENHA INVÁLIDO, TENTAR NOVAMENTE...
                """);
        }
    }

    public void insertRegistro(Double registro, String tipoCaptura, Integer fkEspecificacao){
        con.update("INSERT INTO registro (dataHoraRegistro, registro, tipoCaptura, fkEspecificacao) VALUES (?,?,?,?)", dataHoraAtual(), registro, tipoCaptura, fkEspecificacao);
    }

    public void insertComputador(String nomeComputador, Integer fkEmpresa, String sistemaOperacional){
        con.update("INSERT INTO computador (nomeComputador, fkEmpresa, sistemaOperacional) VALUES (?, ?, ?)",nomeComputador, fkEmpresa, sistemaOperacional);
        System.out.println("Computador: " + nomeComputador + " cadastrado!");
    }
    public String dataHoraAtual(){
        LocalDateTime dataHoraAtual = LocalDateTime.now();

        // Define o formato desejado
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        // Formata a data e hora atual como uma string no formato "yyyy-MM-dd HH:mm:ss"
        return dataHoraAtual.format(formatter);
    }

    public List<Componente> selectComponente(){
        return con.query("SELECT * FROM componente", new BeanPropertyRowMapper<>(Componente.class));
    }

    public Integer selectIdComputador(String nomeComputador){
        List<Computador> computador = con.query("SELECT * FROM computador WHERE nomeComputador = ?", new BeanPropertyRowMapper<>(Computador.class), nomeComputador);

        return computador.get(0).getIdComputador();
    }

    public Integer getFkEmpresaPorIdFuncionario(Integer idFuncionario){
        List<Funcionario> funcionario = con.query("SELECT * FROM funcionario WHERE idFuncionario = ?", new BeanPropertyRowMapper<>(Funcionario.class), idFuncionario);

        return funcionario.get(0).getFkEmpresa();
    }

    public List<Metrica> getMetricasPorFkEmpresa(Integer fkEmpresa, Integer fkComputador){
        List<Metrica> metricas =  con.query("SELECT * FROM metrica WHERE fkEmpresa = ?", new BeanPropertyRowMapper<>(Metrica.class), fkEmpresa);
        if(metricas.size() > 1){
            metricas = con.query("SELECT * FROM metrica WHERE fkEmpresa = ? AND fkComputador = ?", new BeanPropertyRowMapper<>(Metrica.class), fkEmpresa, fkComputador);
        }
        return metricas;
    }

    public void insertAlertas(String tipoAlerta, Integer fkEspecificacao, Integer fkComputador){
        con.update("INSERT INTO alertas (tipoAlerta, fkEspecificacao, fkComputador, dataHoraAlerta) VALUES (?, ?, ?, ?)", tipoAlerta, fkEspecificacao, fkComputador, dataHoraAtual());
        String componente;

        if(fkEspecificacao == (fkComputador * 4 - 3)){
            componente = "CPU";
        } else if (fkEspecificacao == (fkComputador * 4 - 2)){
            componente = "RAM";
        } else {
            componente = "Disco";
        }
        System.out.println("Inserindo alerta do tipo: " + tipoAlerta + " no computador de Id: " + fkComputador + " e se trata do componente " + componente);
    }

}
