package Projeto;


public class Registro {
    private Integer idRegistro;
    private String registro;

    public Registro(Integer idRegistro, String registro) {
        this.idRegistro = idRegistro;
        this.registro = registro;
    }

    public Integer getIdRegistro() {
        return idRegistro;
    }

    public void setIdRegistro(Integer idRegistro) {
        this.idRegistro = idRegistro;
    }

    public String getRegistro() {
        return registro;
    }

    public void setRegistro(String registro) {
        this.registro = registro;
    }

    @Override
    public String toString() {
        return "Registro{" +
                "idRegistro=" + idRegistro +
                ", registro='" + registro + '\'' +
                '}';
    }
}
