package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.exception.NoSuchUserException;
import ru.kata.spring.boot_security.demo.exception.UserIncorrectData;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/admin/api")
public class AdminController {

    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> showAllUsers() {
        List<User> allUsers = userService.getAll();

        return allUsers;
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable("id") long id) {
        User user = userService.get(id);

        if (user == null) {
            throw new NoSuchUserException("There is no user with ID = " + id + " in Database");

        }
        return user;
    }

    @PostMapping("/users")
    public User addNewUser(@RequestBody User user) {
        userService.save(user);
        return user;
    }

    // EXAMPLE
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




//    @GetMapping
//    public String main(Model model, Principal principal) {
//        model.addAttribute("user", userService.findByUsername(principal.getName()));
//        model.addAttribute("users",userService.getAll());
//        model.addAttribute("listRoles", userService.listRoles());
//        return "admin";
//    }
//
//    @GetMapping("/search")
//    public String searchUser(@RequestParam(value = "keyword") String keyword, Model model) {
//        model.addAttribute("users", userService.search(keyword));
//        return "searchUser";
//    }
//
//    @GetMapping("/newUser")
//    public String newUser(Model model) {
//        model.addAttribute("user", new User());
//        model.addAttribute("listRoles", userService.listRoles());
//        return "newUser";
//    }
//
//    @PostMapping()
//    public String createUser(@ModelAttribute("user") User user) {
//        userService.save(user);
//        return "redirect:/admin";
//    }
//
//    @GetMapping("/{id}/edit")
//    public String editUser(@PathVariable("id") long id, Model model) {
//        model.addAttribute("user", userService.get(id));
//        model.addAttribute("listRoles", userService.listRoles());
//        return "editUser";
//    }
//
//    @PatchMapping("/{id}")
//    public String updateUser(@ModelAttribute("user") User user, @PathVariable("id") long id) {
//        userService.update(user);
//        return "redirect:/admin";
//    }
//
//    @DeleteMapping("/{id}")
//    public String deleteUser(@PathVariable("id") long id) {
//        userService.delete(id);
//        return "redirect:/admin";
//    }

}
