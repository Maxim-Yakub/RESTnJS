package ru.kata.spring.boot_security.demo.inits;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;

import javax.annotation.PostConstruct;

@Component
@Data
public class UsersInit {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public UsersInit(UserService userService, RoleService roleService) {

        this.userService = userService;

        this.roleService = roleService;
    }

    @PostConstruct
    public void addTestUsers(){

        // ADMIN
        Role adminRole = new Role( "ADMIN");

        roleService.createRole(adminRole);

        User admin = new User("admin", "1", "admin@mail");

        admin.addRole(adminRole);

        userService.createUser(admin);


        // USER
        Role userRole = new Role("USER");

        roleService.createRole(userRole);

        User user = new User( "user", "1","user@mail");

        user.addRole(userRole);

        userService.createUser(user);

    }
}
