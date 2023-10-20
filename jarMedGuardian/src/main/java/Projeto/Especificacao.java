package Projeto;

public class Especificacao {
        private Integer idEspecificacao;
        private Integer fkComputador;
        private Integer fkComponente;
        private Double totalComponente;

    public Especificacao() {
    }
    public Especificacao(Integer idEspecificacao, Integer fkComputador, Integer fkComponente, Double totalComponente) {
        this.idEspecificacao = idEspecificacao;
        this.fkComputador = fkComputador;
        this.fkComponente = fkComponente;
        this.totalComponente = totalComponente;
    };

    public Integer getIdEspecificacao() {
        return idEspecificacao;
    }

    public void setIdEspecificacao(Integer idEspecificacao) {
        this.idEspecificacao = idEspecificacao;
    }

    public Integer getFkComputador() {
        return fkComputador;
    }

    public void setFkComputador(Integer fkComputador) {
        this.fkComputador = fkComputador;
    }

    public Integer getFkComponente() {
        return fkComponente;
    }

    public void setFkComponente(Integer fkComponente) {
        this.fkComponente = fkComponente;
    }

    public Double getTotalComponente() {
        return totalComponente;
    }

    public void setTotalComponente(Double totalComponente) {
        this.totalComponente = totalComponente;
    }

    @Override
    public String toString() {
        return "Especificacao{" +
                "idEspecificacao=" + idEspecificacao +
                ", fkComputador=" + fkComputador +
                ", fkComponente=" + fkComponente +
                ", totalComponente=" + totalComponente +
                '}';
    }
}
