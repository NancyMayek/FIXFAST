

function setUpUserOnLoadPage(event) {
    console.log("event setUpUserOnLoadPage");
    event.preventDefault(); // Prevent form submission
    const uidUser = localStorage.getItem('uid');
  
    // Make the API request
    fetch("http://localhost:8080/api/buscar/usuarios/" + uidUser)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      const ubicacionRegistrada = document.getElementById("ubicacion-registrada");
      const profilePictureImageSmall = document.getElementById('profilePictureImage-small');
      
      const userName= document.getElementById("name-user");
      const userCorreo= document.getElementById("correo-user");

      ubicacionRegistrada.innerHTML="Direccion: "+ result.results[0].direccion;
      userName.innerHTML=result.results[0].nombre;

      if(result.results[0].img){
        const newImageUrl = result.results[0].img; 
        profilePictureImageSmall.src = newImageUrl;
      }

      if(result.results[0].rol==="USER_ROLE")
        userCorreo.innerHTML="Usuario";
      else{
        userCorreo.innerHTML="Trabajador: "+result.results[0].categoria;
      }
    })
    .catch(error => {
      // Handle any errors
      alert('An error occurred onload. Please try again later.');
      console.error('Error:', error);
    });


    //load profile of worker
    // Make the API request
    const uidWorker = localStorage.getItem('uid-worker');

    fetch("http://localhost:8080/api/buscar/usuarios/" + uidWorker)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      const profilePictureImage = document.getElementById('profilePictureImage-public');
      const bannerName = document.getElementById('nombre-banner');
      const workerName= document.getElementById("name-profile-public");
      const workerCategoria= document.getElementById("categoria-profile-public");

      bannerName.innerHTML=result.results[0].nombre;
      workerName.innerHTML=result.results[0].nombre;
      workerCategoria.innerHTML=result.results[0].categoria;

      if(result.results[0].img){
        const newImageUrl = result.results[0].img; 
        profilePictureImage.src = newImageUrl;
      }
    })
    .catch(error => {
      // Handle any errors
      alert('An error occurred onload. Please try again later.');
      console.error('Error:', error);
    });
  
    
  }
  
  window.addEventListener('load', setUpUserOnLoadPage);

//---------------------------------------------------------------------------------------------






