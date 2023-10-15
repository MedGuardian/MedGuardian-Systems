public class Computador {

    private Integer idComputador;
    private String nomeComputador;

    public Computador(){};

    public Computador(Integer idComputador, String nomeComputador) {
        this.idComputador = idComputador;
        this.nomeComputador = nomeComputador;
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

    @Override
    public String toString() {
        return "Computador{" +
                "idComputador=" + idComputador +
                ", nomeComputador='" + nomeComputador + '\'' +
                '}';
    }
}
