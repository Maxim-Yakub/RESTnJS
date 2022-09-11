package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.exception.NoSuchUserException;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/admin/api/users")
public class RestController {

    private final UserService userService;

    @Autowired
    public RestController(UserService userService) {
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

    // POST EXAMPLE
//    {
//        "username": "NEW",
//            "password": "$2a$10$Vyt/5ofJsaWhBZYqiO3NJ.shobREvA9Y4WyRiDHKMD87GUQa.wyFO",
//            "email": "NEW@mail.com",
//            "roles": [
//        {
//            "id": 1,
//                "name": "ADMIN",
//                "authority": "ROLE_ADMIN"
//        },
//        {
//            "id": 2,
//                "name": "USER",
//                "authority": "ROLE_USER"
//        }
//    ],
//        "enabled": true,
//            "accountNonLocked": true,
//            "accountNonExpired": true,
//            "credentialsNonExpired": true
//    }


    // as POST, but need ID ^
    @PutMapping()
    public void updateUser(@RequestBody User user) {

        userService.update(user);

//        return new ResponseEntity<>(HttpStatus.ACCEPTED);
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
