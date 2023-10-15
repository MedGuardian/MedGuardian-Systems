import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;
import java.util.List;

public class EnviarBD {

    // Criar o objeto conexão.
    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexaoDoBanco();

    public List<Funcionario> autenticarUsuarioComputador(String email, String senha, Integer idComputador){

        List<Funcionario> usuario = con.query("SELECT * FROM funcionario WHERE emailFuncionario = ? AND senhaFuncionario = ?", new BeanPropertyRowMapper<>(Funcionario.class), email, senha);
        if(!usuario.isEmpty()){
            insertFuncionarioDoDia(usuario.get(0).getIdFuncionario(), idComputador, dataHoraAtual());
        }
        mostrarMensagem(usuario);
        return usuario;
    }

    public void insertComponente(String nomeComponente, Integer fkComputador){
        con.update("INSERT INTO componente (nomeComponente, fkComputador) VALUES (?, ?)", nomeComponente, fkComputador);
        System.out.println("CADASTREI O COMPONENTE");
    }
    public void insertFuncionarioDoDia(Integer idFuncionario, Integer idComputador, String dataHora){
        con.update("INSERT INTO funcionarioDoDia (fkFuncionario, fkComputador, dataHora) VALUES (?,?,?)", idFuncionario, idComputador, dataHora);
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

    public void insertRegistro(Double registro, String tipoCaptura, Integer fkComputador, Integer fkComponente){
        con.update("INSERT INTO registro (dataHoraRegistro, registro, tipoCaptura, fkComputador, fkComponente) VALUES (?,?,?,?,?)", dataHoraAtual(), registro, tipoCaptura, fkComputador, fkComponente);
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

    public List<Componente> selectComponente(Integer fkComputador){
        return con.query("SELECT * FROM componente WHERE fkComputador = ?", new BeanPropertyRowMapper<>(Componente.class), fkComputador);
    }

    public Integer selectIdComputador(String nomeComputador){
        List<Computador> computador = con.query("SELECT * FROM computador WHERE nomeComputador = ?", new BeanPropertyRowMapper<>(Computador.class), nomeComputador);

        return computador.get(0).getIdComputador();
    }


}
