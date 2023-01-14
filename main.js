const btnAgregar = document.getElementById("button");
const listUsers = document.getElementById("content");
const head = document.getElementById("head");
const iconState = document.getElementById("state");

btnAgregar.addEventListener("click", (e) => {
  e.preventDefault();
  saveUser();
});

renderUsers();

function saveUser() {
  const regex_password =
    /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}/;
  const regex_dni = /^\d{8}[a-zA-Z]$/;

  let dni = document.getElementById("dni").value;
  let name = document.getElementById("name").value;
  let lastname = document.getElementById("lastname").value;
  let password = document.getElementById("password").value;

  if (!regex_password.test(password) && !regex_dni.test(dni)) {
    alert("Intente denuevo, contraseña o dni no válida");
    return;
  }

  saveUserLocalStorage({ dni, name, lastname, password, active: true });
  renderUsers();
  alert("Usuario agregado");

  document.getElementById("dni").value = "";
  document.getElementById("name").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("password").value = "";
}

function saveUserLocalStorage(user) {
  let users = localStorage.getItem("users");
  if (!users) {
    users = [];
  } else {
    users = JSON.parse(users);
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

function getUsers() {
  const users = localStorage.getItem("users");
  return JSON.parse(users);
}

function toggleUser(dni) {
  const users = getUsers();
  const indexUser = users.findIndex((user) => user.dni == dni);
  const newUsers = [...users];

  newUsers[indexUser].active
    ? (newUsers[indexUser].active = false)
    : (newUsers[indexUser].active = true);

  localStorage.setItem("users", JSON.stringify(newUsers));
  renderUsers();
}

function deleteUser(dni) {
  const users = getUsers();
  const indexUser = users.findIndex((user) => user.dni == dni);
  const newUsers = [...users];

  newUsers.splice(indexUser, 1);
  localStorage.setItem("users", JSON.stringify(newUsers));
  alert("Eliminado");
  renderUsers();
}

function renderUsers() {
  const users = getUsers();
  let html = "";

  if (users.length == 0) {
    html = "<p>No se encontraron usuarios</p>";
  } else {
    html = `${users
      .map(
        (user) =>
          `
            <div class="row ">
              <div class="cell">
               <p>${user.dni}</p>
              </div>
    
              <div class="cell">
                <p>${user.name}</p>
              </div>
    
             <div class="cell">
                <p>${user.lastname}</p>
              </div>
             <div class="cell">
                 <span class="icon-check ${
                   user.active && "icon-check-active"
                 }" onclick="toggleUser(${user.dni})">✓</span>
              </div>
             <div class="cell">
                <button class="btn-delete" onclick="deleteUser(${
                  user.dni
                })">Eliminar</button>
              </div>
            </div>
    
         `
      )
      .join("")}`;
  }

  listUsers.innerHTML = html;
  // listUsers.insertAdjacentHTML("beforeend", html);
}
