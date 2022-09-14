function addUser() {
    let newUserForm = document.getElementById("newUserForm");
    let formData = new FormData(newUserForm);
    let user = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        roles: Array.from(document.getElementById("newRoles"))
            .filter(option => option.selected)
            .map(option => ({value: option.value, id: option.id}))
    }
    newUserForm.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch('/api/admin/users', {
            method: 'POST',
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(user)

        })
            .then((r) => {
                refreshTable();
                // tableInfo();
                $('.nav-tabs a[href="#usersTable"]').tab('show');

                //очистка формы
                newUserForm.reset();
            })
    })
}

function refreshTable() {
    let table = document.querySelector('#tableBodyInfo')
    while (table.rows.length > 1) {
        table.deleteRow(1)
    }
    setTimeout(tableInfo, 50);
}

function getAllRoles() {
    return fetch("/api/admin/users/roles")
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