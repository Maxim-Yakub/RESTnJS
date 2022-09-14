package ru.kata.spring.boot_security.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.repositories.UserRepository;
import java.util.List;

@Service
public class
UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {

        this.passwordEncoder = passwordEncoder;
    }

    @Autowired
    public UserServiceImpl(UserRepository repository) {

        this.userRepository = repository;
    }

    public void createUser(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);
    }

    public List<User> getAllUsers() {

        return (List<User>) userRepository.findAll();
    }

    public User getUserById(Long id) {

        return userRepository.findById(id).get();
    }

    public void deleteUserById(Long id) {

        userRepository.deleteById(id);
    }

    @Transactional
    public void updateUser(User updatedUser) {

        createUser(updatedUser);
    }

    @Override
    public User findUserByUsername(String username) {

        return userRepository.findByUsername(username);
    }
}
