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
        '                               id="editPassword" name="password" value="' + user.password + '">' +
        '                    </p>' +
        '                    <p>' +
        '                        <label>Role</label>' +
        '                        <select id="editRoles" name="roles" multiple size="2" required="required" ' +
        '                               class="form-control form-control-sm">' +
        // '                            <option value="ROLE_ADMIN"' + adminSelect + '>ADMIN</option>' +
        // '                            <option value="ROLE_USER"' + userSelect + '>USER</option>' +
        '                        </select>' +
        // <select multiple className="form-control"
        //         id="newRoles" name="roles"
        //         size="2" required value="roles">
        // </select> +
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
        user.roles.forEach((role)=> {
            if(option.text == role.name) {
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