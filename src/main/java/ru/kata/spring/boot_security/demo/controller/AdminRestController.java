package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
public class AdminRestController {

    private final UserService userService;

    @Autowired
    public AdminRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> showAllUsers() {

        List<User> allUsers = userService.getAll();

        return allUsers != null && !allUsers.isEmpty()
                ? new ResponseEntity<>(allUsers, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") long id) {
        User user = userService.get(id);

        return (user != null)
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping()
    public  ResponseEntity<User> addNewUser(@RequestBody User user) {

        if (userService.findByUsername(user.getUsername()) == null) {
            userService.save(user);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping()
    public void updateUser(@RequestBody User user) {
        userService.update(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable("id") long id) {

        userService.delete(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/roles")
    private List<Role> allRoles() {
        return userService.listRoles();
    }
}
