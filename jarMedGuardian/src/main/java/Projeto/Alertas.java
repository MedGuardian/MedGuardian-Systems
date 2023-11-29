package Projeto;

public class Alertas {
    private Integer idAlerta;
    private String tipoAlerta;
    private Integer fkComputador;

    public Alertas(Integer idAlerta, String tipoAlerta, Integer fkComputador) {
        this.idAlerta = idAlerta;
        this.tipoAlerta = tipoAlerta;
        this.fkComputador = fkComputador;
    }

    public Alertas(){};

    public Integer getIdAlerta() {
        return idAlerta;
    }

    public void setIdAlerta(Integer idAlerta) {
        this.idAlerta = idAlerta;
    }

    public String getTipoAlerta() {
        return tipoAlerta;
    }

    public void setTipoAlerta(String tipoAlerta) {
        this.tipoAlerta = tipoAlerta;
    }

    public Integer getFkComputador() {
        return fkComputador;
    }

    public void setFkComputador(Integer fkComputador) {
        this.fkComputador = fkComputador;
    }

    @Override
    public String toString() {
        return "Alertas{" +
                "idAlerta=" + idAlerta +
                ", tipoAlerta='" + tipoAlerta + '\'' +
                ", fkComputador=" + fkComputador +
                '}';
    }
}
