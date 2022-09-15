package ru.kata.spring.boot_security.demo.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.models.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    @Query(value = "SELECT user FROM User user JOIN FETCH user.roles WHERE user.username = :username")
    User findByUsername(@Param("username") String username);

}
