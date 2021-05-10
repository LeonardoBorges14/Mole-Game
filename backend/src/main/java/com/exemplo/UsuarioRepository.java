package com.exemplo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.exemplo.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario,Integer>{

}
