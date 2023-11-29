package Projeto;

public class Metrica {
    private Integer idMetrica;
    private Double graveRam;
    private Double medioRam;
    private Double graveCPU;
    private Double medioCPU;
    private Double graveDisco;
    private Double medioDisco;
    private Integer fkEmpresa;
    private Integer fkComputador;

    public Metrica(Integer idMetrica, Double graveRam, Double medioRam, Double graveCPU, Double medioCPU, Double graveDisco, Double medioDisco, Integer fkEmpresa, Integer fkComputador) {
        this.idMetrica = idMetrica;
        this.graveRam = graveRam;
        this.medioRam = medioRam;
        this.graveCPU = graveCPU;
        this.medioCPU = medioCPU;
        this.graveDisco = graveDisco;
        this.medioDisco = medioDisco;
        this.fkEmpresa = fkEmpresa;
        this.fkComputador = fkComputador;
    }

    public Metrica(){};

    public Integer getIdMetrica() {
        return idMetrica;
    }

    public void setIdMetrica(Integer idMetrica) {
        this.idMetrica = idMetrica;
    }

    public Double getGraveRam() {
        return graveRam;
    }

    public void setGraveRam(Double graveRam) {
        this.graveRam = graveRam;
    }

    public Double getMedioRam() {
        return medioRam;
    }

    public void setMedioRam(Double medioRam) {
        this.medioRam = medioRam;
    }

    public Double getGraveCPU() {
        return graveCPU;
    }

    public void setGraveCPU(Double graveCPU) {
        this.graveCPU = graveCPU;
    }

    public Double getMedioCPU() {
        return medioCPU;
    }

    public void setMedioCPU(Double medioCPU) {
        this.medioCPU = medioCPU;
    }

    public Double getGraveDisco() {
        return graveDisco;
    }

    public void setGraveDisco(Double graveDisco) {
        this.graveDisco = graveDisco;
    }

    public Double getMedioDisco() {
        return medioDisco;
    }

    public void setMedioDisco(Double medioDisco) {
        this.medioDisco = medioDisco;
    }

    public Integer getFkEmpresa() {
        return fkEmpresa;
    }

    public void setFkEmpresa(Integer fkEmpresa) {
        this.fkEmpresa = fkEmpresa;
    }

    public Integer getFkComputador() {
        return fkComputador;
    }

    public void setFkComputador(Integer fkComputador) {
        this.fkComputador = fkComputador;
    }

    @Override
    public String toString() {
        return "Metrica{" +
                "idMetrica=" + idMetrica +
                ", graveRam=" + graveRam +
                ", medioRam=" + medioRam +
                ", graveCPU=" + graveCPU +
                ", medioCPU=" + medioCPU +
                ", graveDisco=" + graveDisco +
                ", medioDisco=" + medioDisco +
                ", fkEmpresa=" + fkEmpresa +
                ", fkComputador=" + fkComputador +
                '}';
    }
}
