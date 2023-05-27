const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

document.getElementById("registro-worker").addEventListener("click", signUpWorker);
document.getElementById("login-worker").addEventListener("click", loginWorker);

function signUpWorker(event) {
  console.log("click registro-worker");
  event.preventDefault(); // Prevent form submission

  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("correoInput").value;
  const categoria = document.getElementById("select-categoria").selectedOptions[0].value;
  console.log(categoria);
  const password = document.getElementById("passwordInput").value;
  const direccion = localStorage.getItem('direccion');
  console.log(direccion);
  const longitud =localStorage.getItem('longitude');
  const latitud = localStorage.getItem('latitude');
  console.log( latitud);
  console.log( longitud);
    
  // Create an object with the email and password
  const data = {
    nombre: name,
    direccion: direccion,
    categoria:categoria,
    longitud: longitud,
    latitud:latitud,
    correo: email,
    password: password,
    rol: "WORKER_ROLE",

  };


  // Make the API request
  fetch("http://localhost:8080/api/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(result => {
    // Check if the response indicates an error
    if (result.errors && result.errors.length > 0) {
      const errorMessage = result.errors[0].msg;
      alert(errorMessage);
    } else {
      // No error, sign-up was successful
      if (confirm("!BIENVENIDO FIXER!   ¿QUIERES INICIAR SESION?")) {
        window.location.href = 'Inicia-sesion.html';
      } else {
        
      }
      console.log("USUARIO CREADO",result);
    
    }
  })
  .catch(error => {
    // Handle any errors
    alert('An error occurred. Please try again later.');
    console.error('Error:', error);
  });
}

function loginWorker(event) {
  console.log("click login-user");
  event.preventDefault(); // Prevent form submission

  const email = document.getElementById("emailInput-login").value;
  const password = document.getElementById("passwordInput-login").value;

  // Create an object with the email and password
  const data = {
    correo: email,
    password: password
  };

  // Make the API request
  fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(result => {
    // Check if the response indicates an error
    const msg = result.msg;
    const uid = result.usuario.uid;
    if (msg) {
      alert(msg);
      if(msg === "Login ok"){

        localStorage.setItem("uid", uid);
        window.location.href = 'index_login.html';
      }
    } 
    
  })
  .catch(error => {
    // Handle any errors
    alert('An error occurred. Please try again later.');
    console.error('Error:', error);
  });
}