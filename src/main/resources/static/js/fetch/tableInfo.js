tableInfo();

function tableInfo() {
    let tableBodyInfo = document.getElementById("tableBodyInfo");
    tableBodyInfo.innerHTML = "";
    fetch('/api/admin/users')
        .then(response => response.json())
        .then(users => {
            let temp = '';
            users.forEach(function (user) {
                temp += `
                  <tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>

                        <td>${user.roles.map(role => " " + role.name )}</td>

                   <td> <button type="button" onclick="modalEdit(${user.id})" class="btn btn-primary btn-sm">Edit</button> </td>

                        <td> <button type="button" onclick="modalDelete(${user.id})" class="btn btn-danger btn-sm">Delete</button> </td>
                  </tr>`;
            });
            document.querySelector('#tableBodyInfo').innerHTML = temp;
        });
}