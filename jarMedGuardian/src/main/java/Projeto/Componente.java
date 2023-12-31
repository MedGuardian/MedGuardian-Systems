package Projeto;

public class Componente {
    private Integer idComponente;
    private String nomeComponente;

    public Componente(){};
    public Componente(Integer idComponente, String nomeComponente) {
        this.idComponente = idComponente;
        this.nomeComponente = nomeComponente;
    }

    public Double converterGb(Double valor){
        return valor / 1000000000;
    }

    public Double converterGM(Double valor){
        return valor / 1000000;
    }

    public Componente(String nomeComponente){
        this.nomeComponente = nomeComponente;
    }

    public Integer getIdComponente() {
        return idComponente;
    }

    public void setIdComponente(Integer idComponente) {
        this.idComponente = idComponente;
    }

    public String getNomeComponente() {
        return nomeComponente;
    }

    public void setNomeComponente(String nomeComponente) {
        this.nomeComponente = nomeComponente;
    }

    @Override
    public String toString() {
        return "Componente{" +
                "idComponente=" + idComponente +
                ", nomeComponente='" + nomeComponente + '\'' +
                '}';
    }
}