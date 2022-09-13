async function modalEdit(id) {
    let user = await getUser(id);
    let modal = document.getElementById('modalWindow');
    modal.innerHTML =
        '<div id="modalEdit"' +
        '     class="modal fade" tabindex="-1" role="dialog"' +
        '     aria-labelledby="TitleModalLabel" aria-hidden="true"' +
        '     data-backdrop="static" data-keyboard="false">' +
        '    <div class="modal-dialog modal-dialog-scrollable">' +
        '        <div class="modal-content">' +
        '            <div class="modal-header">' +
        '                <h5 class="modal-title" id="TitleModalLabel">Edit user</h5>' +
        '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '                    <span aria-hidden="true">&times;</span>' +
        '                </button>' +
        '            </div>' +
        '            <div class="modal-body bg-white">' +
        '                <form id="formEditUser" style="width: 200px;"' +
        '                       class="form-signin mx-auto font-weight-bold text-center">' +
        '                    <p>' +
        '                        <label>ID</label>' +
        '                        <input class="form-control form-control-sm" type="text"' +
        '                               id="editID" name="id" value="' + user.id + '" readonly>' +
        '                    </p>' +
        '                     <p>' +
        '                        <label>Username</label>' +
        '                        <input class="form-control form-control-sm" type="text"' +
        '                               id="editUsername" name="username" value="' + user.username + '">' +
        '                    </p>' +
        '                    <p>' +
        '                        <label>Email</label>' +
        '                        <input class="form-control form-control-sm" type="email"' +
        '                               id="editEmail" name="email" value="' + user.email + '">' +
        '                    </p>' +
        '                    <p>' +
        '                        <label>Password</label>' +
        '                        <input class="form-control form-control-sm" type="password"' +
        '                               id="editPassword" name="password" value="">' +
        '                    </p>' +
        '                    <p>' +
        '                        <label>Role</label>' +
        '                        <select id="editRoles" name="roles" multiple size="2" required="required" ' +
        '                               class="form-control form-control-sm">' +
        '                        </select>' +

        '                    </p>' +
        '                </form>' +
        '            </div>' +
        '            <div class="modal-footer">' +
        '                <button type="button" class="btn btn-secondary"' +
        '                        data-dismiss="modal">Close</button>' +
        '                <button class="btn btn-primary" data-dismiss="modal"' +
        '                        onclick="editUser()">Edit</button>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>';
    $("#modalEdit").modal();
    console.log(user);


    // $("#editRoles").empty();
    let selectEdit = document.getElementById('editRoles');
    let allRoles = await getAllRoles();

    allRoles.forEach((role) => {
        let option = document.createElement('option');
        option.setAttribute('value', role);
        option.setAttribute('id', role.id);
        option.setAttribute('name', role.name);
        option.appendChild(document.createTextNode(role.name));
        user.roles.forEach((role) => {
            if (option.text == role.name) {
                option.selected = true;
            }
        });
        selectEdit.appendChild(option);
    })
    let userRoles = [];
    let i = 0;
    user.roles.forEach((role) => userRoles[i++] = role);
    let optionToSelect;
    for (let i = 0; i < selectEdit.options.length; i++) {
        optionToSelect = selectEdit.options[i];
        userRoles.forEach((ur) => {
            if (optionToSelect.text == ur) {
                optionToSelect.selected = true;
            }
        });
    }

}

async function getUser(id) {
    let response = await fetch('http://localhost:8080/admin/api/users/' + id);
    return await response.json();
}

function editUser() {
    let editForm = document.getElementById("formEditUser");
    let formData = new FormData(editForm);

    let user = {
        id: formData.get('id'),
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        roles: Array.from(document.getElementById("editRoles"))
            .filter(option => option.selected)
            .map(option => ({name: option.value, id: option.id}))
    }
    let id = window.formEditUser.editID.value;
    fetch("/admin/api/users", {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        // .then(response => {
        //     $('#' + id).replaceWith('<tr id=' + id + '>' +
        //         '<td>' + id + '</td>' +
        //         '<td>' + window.formEditUser.editUsername.value + '</td>' +
        //         '<td>' + window.formEditUser.editEmail.value + '</td>' +
        //         '<td>' + rolesList.textContent + '</td>' +
        //         '<td> <button type="button" onclick="modalEdit(' + id + ')" class="btn btn-primary btn-sm">Edit</button> </td>' +
        //         '<td> <button type="button" onclick="modalDelete(' + id + ')" class="btn btn-danger btn-sm">Delete</button> </td>' +
        //         '</tr>');
        // });

        .then((r) => {
            refreshTable();
            // tableInfo();
            $('.nav-tabs a[href="#usersTable"]').tab('show');
        });
}