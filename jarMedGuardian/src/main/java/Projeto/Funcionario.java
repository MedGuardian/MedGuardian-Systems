package Projeto;

public class Funcionario {
    private Integer idFuncionario;
    private String nomeFuncionario;
    private String emailFuncionario;
    private String senhaFuncionario;
    private Integer fkEmpresa;
    private String tipoAcesso;

    public Funcionario(){};

    public Funcionario(Integer idFuncionario, String nomeFuncionario, String emailFuncionario, String senhaFuncionario, Integer fkEmpresa, String tipoAcesso) {
        this.idFuncionario = idFuncionario;
        this.nomeFuncionario = nomeFuncionario;
        this.emailFuncionario = emailFuncionario;
        this.senhaFuncionario = senhaFuncionario;
        this.fkEmpresa = fkEmpresa;
        this.tipoAcesso = tipoAcesso;
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

    public Integer getFkEmpresa() {
        return fkEmpresa;
    }

    public void setFkEmpresa(Integer fkEmpresa) {
        this.fkEmpresa = fkEmpresa;
    }

    public String getTipoAcesso() {
        return tipoAcesso;
    }

    public void setTipoAcesso(String tipoAcesso) {
        this.tipoAcesso = tipoAcesso;
    }

    @Override
    public String toString() {
        return "Funcionario{" +
                "idFuncionario=" + idFuncionario +
                ", nomeFuncionario='" + nomeFuncionario + '\'' +
                ", emailFuncionario='" + emailFuncionario + '\'' +
                ", senhaFuncionario='" + senhaFuncionario + '\'' +
                ", fkEmpresa=" + fkEmpresa +
                ", tipoAcesso='" + tipoAcesso + '\'' +
                '}';
    }
}
