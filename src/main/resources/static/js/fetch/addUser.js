function addUser() {
    let newUserForm = document.getElementById("newUserForm");
    let formData = new FormData(newUserForm);
    let user = {
        username: formData.get('newUsername'),
        email: formData.get('newEmail'),
        password: formData.get('newPassword'),
        roles: Array.from(document.getElementById("newUserForm.newRoles"))
            .filter(option => option.selected)
            .map(option => ({value: option.value, id: option.id}))
    }
    fetch('/admin/api/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {'Accept': 'application/json', "Content-type": "application/json; charset=UTF-8"}
    })
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
        option.setAttribute('value', role.name);
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