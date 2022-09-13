userInfo()

function userInfo() {
    fetch('/api/user')
        .then(response => response.json())
        .then(user => {
            console.log(user);
            document.getElementById("navEmail").innerHTML = user.email;
            document.getElementById("navRoles").innerHTML = 'with roles: ' + rolesList(user).textContent;

            let tbody = document.getElementById('userTable');
            let roles = "";
            user.roles.forEach((role) => {
                roles = roles + role.name + ' ';
            });
            let tr = document.createElement('tr');
            tr.innerHTML = '<td>' + user.id + '</td>' +
                '<td>' + user.username + '</td>' +
                '<td>' + user.email + '</td>' +
                '<td>'  + roles +   '</td>';
            tbody.appendChild(tr);
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
