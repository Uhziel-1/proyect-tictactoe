package com.exam.tictactoe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface GenericCrudRepository<T, ID> extends JpaRepository<T, ID> {
}
