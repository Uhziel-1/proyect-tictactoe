package com.exam.tictactoe.service.impl;

import com.exam.tictactoe.exception.ModelNotFoundException;
import com.exam.tictactoe.repository.GenericCrudRepository;
import com.exam.tictactoe.service.GenericCrudService;

import java.util.List;

public abstract class GenericCrudServiceImp<T, ID> implements GenericCrudService<T, ID> {
    protected abstract GenericCrudRepository<T, ID> getRepo();

    @Override
    public T save(T t) {
        return getRepo().save(t);
    }
    @Override
    public T update(ID id, T t) {
        getRepo().findById(id).orElseThrow(() -> new ModelNotFoundException("ID NOT FOUND: " + id));
        return getRepo().save(t);
    }
    @Override
    public List<T> findAll() {
        return getRepo().findAll();
    }
    @Override
    public T findById(ID id) {
        return getRepo().findById(id).orElseThrow(() -> new ModelNotFoundException("ID NOT FOUND: " + id));
    }
    @Override
    public void delete(ID id) {
        getRepo().findById(id).orElseThrow(() -> new ModelNotFoundException("ID NOT FOUND: " + id));
        getRepo().deleteById(id);
    }
}
