package Projeto;

import java.util.Objects;

public class Janelas {
    private Integer idJanela;
    private String titulo;
    private String comando;
    private Integer fkComputador;
    private Boolean matar;

    public Janelas(String titulo, String comando, Integer fkComputador, Boolean matar) {
        this.titulo = titulo;
        this.comando = comando;
        this.fkComputador = fkComputador;
        this.matar = matar;
    }

    public Janelas(){}

    public Integer getIdJanela() {
        return idJanela;
    }

    public void setIdJanela(Integer idJanela) {
        this.idJanela = idJanela;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getComando() {
        return comando;
    }

    public void setComando(String comando) {
        this.comando = comando;
    }

    public Integer getFkComputador() {
        return fkComputador;
    }

    public void setFkComputador(Integer fkComputador) {
        this.fkComputador = fkComputador;
    }

    public Boolean getMatar() {
        return matar;
    }

    public void setMatar(Boolean matar) {
        this.matar = matar;
    }

    @Override
    public String toString() {
        return "Janelas{" +
                "idJanela=" + idJanela +
                ", titulo='" + titulo + '\'' +
                ", comando='" + comando + '\'' +
                ", fkComputador=" + fkComputador +
                ", matar=" + matar +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Janelas janelas = (Janelas) o;
        return Objects.equals(getComando(), janelas.getComando());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getComando());
    }
}
