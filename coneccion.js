const form = document.getElementById('userForm');
const userList = document.getElementById('userList');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const nombre = formData.get('Nombre');
    try {
        const response = await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Nombre: nombre })
        });
        const data = await response.json();
        console.log(data);
        getUserList();
    } catch (error) {
        console.error(error);
    }
});

async function getUserList() {
    try {
        const response = await fetch('http://localhost:3000/');
        const data = await response.json();
        console.log(data);
        renderUserList(data);
    } catch (error) {
        console.error(error);
    }
}

function renderUserList(users) {
    userList.innerHTML = '';
    updateSelect.innerHTML = '';
    deleteSelect.innerHTML = '';

    users.forEach(user => {
        const div = document.createElement('div');
        div.textContent = user.Nombre;
        userList.appendChild(div);

        const updateOption = document.createElement('option');
        updateOption.textContent = user.Nombre;
        updateOption.value = user.ID;
        updateSelect.appendChild(updateOption);

        const deleteOption = document.createElement('option');
        deleteOption.textContent = user.Nombre;
        deleteOption.value = user.ID;
        deleteSelect.appendChild(deleteOption);
    });
}
async function updateUser() {
    const ID = updateSelect.value;
    const Nombre = prompt('Ingrese el nuevo nombre:');
    if (!Nombre) return;
    try {
        const response = await fetch('http://localhost:3000/', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ID, Nombre })
        });
        const data = await response.json();
        console.log(data);
        getUserList();
    } catch (error) {
        console.error(error);
    }
}

async function deleteUser() {
    const ID = deleteSelect.value;
    if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) return;
    try {
        const response = await fetch('http://localhost:3000/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ID })
        });
        const data = await response.json();
        console.log(data);
        getUserList();
    } catch (error) {
        console.error(error);
    }
}


getUserList();
