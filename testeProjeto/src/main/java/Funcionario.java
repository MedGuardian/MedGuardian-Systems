public class Funcionario {
    private Integer idFuncionario;
    private String nomeFuncionario;
    private String emailFuncionario;
    private String senhaFuncionario;

    public Funcionario(){};

    public Funcionario(Integer idFuncionario, String nomeFuncionario, String emailFuncionario, String senhaFuncionario) {
        this.idFuncionario = idFuncionario;
        this.nomeFuncionario = nomeFuncionario;
        this.emailFuncionario = emailFuncionario;
        this.senhaFuncionario = senhaFuncionario;
    }

    public Integer getIdFuncionario() {
        return idFuncionario;
    }

    public void setIdFuncionario(Integer idFuncionario) {
        this.idFuncionario = idFuncionario;
    }

    public String getNomeFuncionario() {
        return nomeFuncionario;
    }

    public void setNomeFuncionario(String nomeFuncionario) {
        this.nomeFuncionario = nomeFuncionario;
    }

    public String getEmailFuncionario() {
        return emailFuncionario;
    }

    public void setEmailFuncionario(String emailFuncionario) {
        this.emailFuncionario = emailFuncionario;
    }

    public String getSenhaFuncionario() {
        return senhaFuncionario;
    }

    public void setSenhaFuncionario(String senhaFuncionario) {
        this.senhaFuncionario = senhaFuncionario;
    }

    @Override
    public String toString() {
        return "testeUsuario{" +
                "idFuncionario=" + idFuncionario +
                ", nomeFuncionario='" + nomeFuncionario + '\'' +
                ", emailFuncionario='" + emailFuncionario + '\'' +
                ", senhaFuncionario='" + senhaFuncionario + '\'' +
                '}';
    }
}
