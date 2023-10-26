package Projeto;

public class Computador {

    private Integer idComputador;
    private String nomeComputador;
    private Integer fkEmpresa;

    public Computador(){};

    public Computador(Integer idComputador, String nomeComputador, Integer fkEmpresa) {
        this.idComputador = idComputador;
        this.nomeComputador = nomeComputador;
        this.fkEmpresa = fkEmpresa;
    }

    public Integer getIdComputador() {
        return idComputador;
    }

    public void setIdComputador(Integer idComputador) {
        this.idComputador = idComputador;
    }

    public String getNomeComputador() {
        return nomeComputador;
    }

    public void setNomeComputador(String nomeComputador) {
        this.nomeComputador = nomeComputador;
    }

    public Integer getFkEmpresa() {
        return fkEmpresa;
    }

    public void setFkEmpresa(Integer fkEmpresa) {
        this.fkEmpresa = fkEmpresa;
    }

    @Override
    public String toString() {
        return "Computador{" +
                "idComputador=" + idComputador +
                ", nomeComputador='" + nomeComputador + '\'' +
                ", fkEmpresa=" + fkEmpresa +
                '}';
    }
}