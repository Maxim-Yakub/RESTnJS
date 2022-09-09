function addUser() {
    let newUserForm = document.getElementById("newUserForm");
    let formData = new FormData(newUserForm);
    // // let newRoles = [];
    // let roleForm = window.newUserForm.newRoles;
    // for (let i = 0; i < roleForm.length; i++) {
    //     let option = roleForm.options[i];
    //     if (option.selected) {
    //         newRoles[i] = option.value
    //     }
    // }
    let user = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        roles: Array.from(document.getElementById("newRoles"))
            .filter(option => option.selected)
            .map(option => ({value: option.value, id: option.id}))


    }
    fetch('http://localhost:8080/admin/api/users', {
        method: 'POST',

        headers: { 'Accept': 'application/json',"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(user)

    })
        .then(response => response.json())
        .then((r) => {
            refreshTable();
            tableBody();
            $('.nav-tabs a[href="#usersTable"]').tab('show');
        })
}

function refreshTable() {
    let table = document.querySelector('#usersTable')
    for (let i = table.rows.length - 1; i >= 0; i--) {
        table.deleteRow(i)
    }
}

function getAllRoles() {
    return fetch("/admin/api/users/roles")
        .then((response) => {
            let res = response.json();
            return res;
        })
        .then((roles) => {
            console.log('all roles:')
            console.log(roles);
            return roles;
        })
}

async function showNewModal() {
    $("#newRoles").empty();
    let selectNew = document.getElementById('newRoles');
    let allRoles = await getAllRoles();
    allRoles.forEach((role) => {
        let option = document.createElement('option');
        option.setAttribute('value', role);
        option.setAttribute('id', role.id);
        option.setAttribute('name', role.name);
        option.appendChild(document.createTextNode(role.name));
        selectNew.appendChild(option);
    })
    let optionToSelect;
    for (let i = 0; i < selectNew.options.length; i++) {
        optionToSelect = selectNew.options[i];
        if (optionToSelect.text == "USER") {
            optionToSelect.selected = true;
        }
    }
}