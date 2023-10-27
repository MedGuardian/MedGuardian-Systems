package Projeto;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;
import java.util.List;

public class EnviarBD {

    // Criar o objeto conexão.
    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexaoDoBanco();

    int i = 0;
    public List<Funcionario> autenticarUsuario(String email, String senha){
        List<Funcionario> usuario = con.query("SELECT * FROM funcionario WHERE emailFuncionario = ? AND senhaFuncionario = ?", new BeanPropertyRowMapper<>(Funcionario.class), email, senha);
        if(i < 1){
            mostrarMensagem(usuario);
        }
        i++;
        return usuario;
    }

    public void insertComponente(String nomeComponente){
        con.update("INSERT INTO componente (nomeComponente) VALUES (?)", nomeComponente);
        System.out.println("CADASTREI O COMPONENTE");
    }

    public void insertEspecificacao(Integer fkComputador, Integer fkComponente, Double totalComponente){
        con.update("INSERT INTO especificacao (fkComputador, fkComponente, totalComponente) VALUES (?, ?, ?)", fkComputador, fkComponente, totalComponente);
    }
    public void insertFuncionarioDoDia(Integer idFuncionario, Integer idComputador){
        con.update("INSERT INTO funcionarioDoDia (fkFuncionario, fkComputador, dataHora) VALUES (?,?,?)", idFuncionario, idComputador, dataHoraAtual());
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
        } else {
            System.out.println("""
                USUÁRIO %s AUTENTICADO COM SUCESSO!
                INICIANDO A CAPTURA DE DADOS DA MÁQUINA...
                """.formatted(usuario.get(0).getNomeFuncionario()));
        }

    }

    public void insertRegistro(Double registro, String tipoCaptura, Integer fkEspecificacao){
        con.update("INSERT INTO registro (dataHoraRegistro, registro, tipoCaptura, fkEspecificacao) VALUES (?,?,?,?)", dataHoraAtual(), registro, tipoCaptura, fkEspecificacao);
        System.out.println();
    }

    public void insertComputador(String nomeComputador){
        con.update("INSERT INTO computador (nomeComputador) VALUES (?)",nomeComputador);
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

    public List<Registro> selectRegistro(){
        return con.query("SELECT * FROM registro", new BeanPropertyRowMapper<>(Registro.class));
    }


}
