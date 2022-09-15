async function modalDelete(id) {

    let user = await getUser(id);
    let modal = document.getElementById('modalWindow');

    modal.innerHTML =
        '<div id="modalDelete" ' +
        '     class="modal fade" tabindex="-1" role="dialog"' +
        '     aria-labelledby="TitleModalLabel" aria-hidden="true" ' +
        '     data-backdrop="static" data-keyboard="false">' +
        '    <div class="modal-dialog modal-dialog-scrollable">' +
        '        <div class="modal-content">' +
        '            <div class="modal-header">' +
        '                <h5 class="modal-title" id="TitleModalLabel">Delete user</h5>' +
        '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '                    <span aria-hidden="true">&times;</span>' +
        '                </button>' +
        '            </div>' +
        '            <div class="modal-body bg-white">' +
        '                <form id="formEditUser" style="width: 200px;" ' +
        '                       class="form-signin mx-auto font-weight-bold text-center">' +
        '                    <p>' +
        '                        <label>ID</label>' +
        '                        <input class="form-control form-control-sm" type="text"' +
        '                               name="id" value="' + user.id + '" readonly>' +
        '                    </p>' +
        '                    <p>' +
        '                        <label>Username</label>' +
        '                        <input class="form-control form-control-sm" type="text"' +
        '                               value="' + user.username + '" readonly>' +
        '                    </p>' +
        '                    <p>' +
        '                        <label>Email</label>' +
        '                        <input class="form-control form-control-sm" type="email"' +
        '                               value="' + user.email + '" readonly>' +
        '                    </p>' +
        '                    <p>' +
        '                        <label>Role</label>' +
        '                        <select id="deleteRoles" name="roles" disabled class="form-control form-control-sm" multiple size="2" readonly>' +
        '                        </select>' +
        '                    </p>' +
        '                </form>' +
        '            </div>' +
        '            <div class="modal-footer">' +
        '                <button type="button" class="btn btn-secondary"' +
        '                        data-dismiss="modal">Close</button>' +
        '                <button class="btn btn-danger" data-dismiss="modal"' +
        '                        onclick="deleteUser(' + user.id + ')">Delete</button>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>';

    $("#modalDelete").modal();
    let selectDelete = document.getElementById('deleteRoles');
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
        selectDelete.appendChild(option);
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

function deleteUser(id) {
    fetch('/api/admin/users/' + id, {
        method: 'DELETE',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => {
            refreshTable();
            $('.nav-tabs a[href="#usersTable"]').tab('show');
        });
}