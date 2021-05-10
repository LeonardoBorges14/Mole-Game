package com.exemplo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exemplo.entities.Ranking;

@RestController
@RequestMapping(value = "/ranking")
public class RankingController {
	
	@Autowired
	RankingRepository repository;
	
	@GetMapping(value = "/easy")
	public ResponseEntity<List<Ranking>> RankingEasy() {
		List<Ranking> list = repository.top20Easy();
		return ResponseEntity.ok(list);
	}
	
	@GetMapping(value = "/medium")
	public ResponseEntity<List<Ranking>> RankingMedium() {
		List<Ranking> list = repository.top20Medium();
		return ResponseEntity.ok(list);
	}
	
	@GetMapping(value = "/hard")
	public ResponseEntity<List<Ranking>> RankingHard() {
		List<Ranking> list = repository.top20Hard();
		return ResponseEntity.ok(list);
	}

	@PostMapping
	public Ranking novoRanking(@RequestBody Ranking ranking) {
		return repository.save(ranking); 
	}
	
	@GetMapping("/{id}")
	public Optional<Ranking> one(@PathVariable Integer id) {
		return repository.findById(id);
	}

}
