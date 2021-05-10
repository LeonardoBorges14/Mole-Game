package com.exemplo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.exemplo.entities.Ranking;

public interface RankingRepository extends JpaRepository<Ranking, Integer> {
	
	@Query("SELECT new Ranking(obj.id, obj.usuario, obj.pontuacao, obj.dificuldade) FROM Ranking AS obj WHERE obj.dificuldade = 3"
			+ "order by obj.pontuacao desc")
	List<Ranking> top20Easy();
	
	@Query("SELECT new Ranking(obj.id, obj.usuario, obj.pontuacao, obj.dificuldade) FROM Ranking AS obj WHERE obj.dificuldade = 5"
			+ "order by obj.pontuacao desc")
	List<Ranking> top20Medium();
	
	@Query("SELECT new Ranking(obj.id, obj.usuario, obj.pontuacao, obj.dificuldade) FROM Ranking AS obj WHERE obj.dificuldade = 6"
			+ "order by obj.pontuacao desc")
	List<Ranking> top20Hard();

}
