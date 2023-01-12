const btnAgregar = document.getElementById("button");
const listUsers = document.getElementById("content");
const head = document.getElementById("head");

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

  saveLocalStogare({ dni, name, lastname, password, active: true });
  renderUsers();

  alert("Usuario agregado");
}

function saveLocalStogare(user) {
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

function renderUsers() {
  const users = getUsers();
  console.log(users);
  const html = `${users
    .map(
      (user) =>
        `
        <div class="row">
          <div class="cell">
           <p>${user.dni}</p>
          </div>

          <div class="cell">
            <p>${user.name}</p>
          </div>

         <div class="cell">
            <p>${user.lastname}</p>
          </div>
        </div>

     `
    )
    .join("")}`;

  listUsers.insertAdjacentHTML("beforeend", html);
}
