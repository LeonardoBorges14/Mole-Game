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

import com.exemplo.entities.Usuario;


@RestController
@RequestMapping("/user")
public class UsuarioController {
	
	@Autowired
	UsuarioRepository repository;

	
	@GetMapping
	public ResponseEntity<List<Usuario>> findAll() {
		List<Usuario> list = repository.findAll();
		return ResponseEntity.ok(list);
	}
	
	@PostMapping
	public Usuario novoUser(@RequestBody Usuario usuario) {
		return repository.save(usuario); 
	}
	
	@GetMapping("/{id}")
	public Optional<Usuario> one(@PathVariable Integer id) {
		return repository.findById(id);
	}
	

}
