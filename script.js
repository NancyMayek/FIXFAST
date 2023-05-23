const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});



document.getElementById("registro-user").addEventListener("click", signUpUser);

function signUpUser(event) {
  console.log("click registro-user");
  event.preventDefault(); // Prevent form submission

  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;

  // Create an object with the email and password
  const data = {
    name: name,
    email: email,
    password: password,
    role: "USER_ROLE",
  };

  // Make the API request
  fetch("http://localhost:8080/fixit/users", {
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
      if (confirm("!USUARIO CREADO CORRECTAMENTE!   ¿QUIERES INICIAR SESION?")) {
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

document.getElementById("login-user").addEventListener("click", loginUser);

function loginUser(event) {
  console.log("click login-user");
  event.preventDefault(); // Prevent form submission

  const email = document.getElementById("emailInput-login").value;
  const password = document.getElementById("passwordInput-login").value;

  // Create an object with the email and password
  const data = {
    email: email,
    password: password
  };

  // Make the API request
  fetch("http://localhost:8080/fixit/auth/login", {
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
    if (msg) {
      alert(msg);
      if(msg === "Login ok"){
        window.location.href = 'index_login.html';
        btnUser = document.getElementById('btn-Usuario');
        btnUser.fistChild.data = "NANCY";
      }
    } 
  })
  .catch(error => {
    // Handle any errors
    alert('An error occurred. Please try again later.');
    console.error('Error:', error);
  });
}


