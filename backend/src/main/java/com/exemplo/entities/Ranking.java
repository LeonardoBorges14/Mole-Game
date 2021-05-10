package com.exemplo.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ranking")
public class Ranking implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private Usuario usuario;
	private Integer pontuacao;
	private Integer dificuldade;
	
	public Ranking(Integer id, Usuario usuario, Integer pontuacao, Integer dificuldade) {
		this.id = id;
		this.usuario = usuario;
		this.pontuacao = pontuacao;
		this.dificuldade = dificuldade;
	}
	
	public Ranking() {

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Usuario getUser() {
		return usuario;
	}

	public void setUser(Usuario usuario) {
		this.usuario = usuario;
	}

	public int getPontuacao() {
		return pontuacao;
	}

	public void setPontuacao(Integer pontuacao) {
		this.pontuacao = pontuacao;
	}

	public Integer getDificuldade() {
		return dificuldade;
	}

	public void setDificuldade(Integer dificuldade) {
		this.dificuldade = dificuldade;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Ranking other = (Ranking) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
	
	

}
