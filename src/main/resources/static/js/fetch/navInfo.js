navInfo()

function navInfo() {
    fetch('http://localhost:8080/info')
        .then(response => response.json())
        .then(user => {
            document.getElementById("navEmail").innerHTML = user.email;
            document.getElementById("navRoles").innerHTML = 'with roles: ' + rolesList(user).textContent;
        });
}

function rolesList(user) {
    let rolesList = document.createElement('ul');
    for (let i of user.roles) {
        let role = document.createElement('li');
        role.textContent = i.name + " ";
        rolesList.appendChild(role);
    }

    return rolesList;
}