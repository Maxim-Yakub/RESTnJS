tableInfo();

function tableInfo() {
    let tableBodyInfo = document.getElementById("tableBodyInfo");
    tableBodyInfo.innerHTML = "";
    fetch('/api/admin/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(function (user) {
                const row = tableBodyInfo.insertRow();
                row.setAttribute("id", user.id);
                const cell0 = row.insertCell();
                cell0.innerHTML = user.id;
                const cell1 = row.insertCell();
                cell1.innerHTML = user.username;
                const cell2 = row.insertCell();
                cell2.innerHTML = user.email;
                const cell3 = row.insertCell();
                cell3.innerHTML = rolesList(user).textContent;
                const cell4 = row.insertCell();
                cell4.innerHTML =
                    '<button type="button" onclick="modalEdit(' + user.id + ')" class="btn btn-primary btn-sm">Edit</button>';
                const cell5 = row.insertCell();
                cell5.innerHTML =
                    '<button type="button" onclick="modalDelete(' + user.id + ')" class="btn btn-danger btn-sm">Delete</button>';
            })
        });
}