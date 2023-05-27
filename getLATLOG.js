function setUpUserOnLoadPage(event) {
  console.log("event setUpUserOnLoadPage");
  event.preventDefault(); // Prevent form submission
  const uid = localStorage.getItem('uid');

  // Make the API request
  fetch("https://fixfast-backend-production.up.railway.app/api/buscar/usuarios/" + uid)
  .then(response => response.json())
  .then(result => {
    console.log(result);
    const ubicacionRegistrada = document.getElementById("ubicacion-registrada");
    const userName= document.getElementById("name-user");
    const userCorreo= document.getElementById("correo-user")
    ubicacionRegistrada.innerHTML="Direccion: "+ result.results[0].direccion;
    userName.innerHTML=result.results[0].nombre;
    if(result.results[0].rol==="USER_ROLE")
    userCorreo.innerHTML="Usuario";
    else{
      userCorreo.innerHTML="Trabajador: "+result.results[0].categoria;
    }
  })
  .catch(error => {
    // Handle any errors
    alert('An error occurred. Please try again later.');
    console.error('Error:', error);
  });

  
}

window.addEventListener('load', setUpUserOnLoadPage);