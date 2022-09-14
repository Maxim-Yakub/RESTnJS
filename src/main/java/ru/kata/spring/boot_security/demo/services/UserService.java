package ru.kata.spring.boot_security.demo.services;


import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

public interface UserService {

    void createUser(User user);

    List<User> getAllUsers();

    User getUserById(Long id);

    void deleteUserById(Long id);

    void updateUser(User updatedUser);

    User findUserByUsername(String username);
}
