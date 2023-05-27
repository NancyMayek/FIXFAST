

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
      const profilePictureImage = document.getElementById('profilePictureImage');
      const profilePictureImageSmall = document.getElementById('profilePictureImage-small');
      
      const userName= document.getElementById("name-user");
      const nameProfile = document.getElementById("name-profile")
      const userCorreo= document.getElementById("correo-user")

      ubicacionRegistrada.innerHTML="Direccion: "+ result.results[0].direccion;
      userName.innerHTML=result.results[0].nombre;
      nameProfile.innerHTML=result.results[0].nombre;

      if(result.results[0].img){
        const newImageUrl = result.results[0].img; 
        profilePictureImage.src = newImageUrl; 
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
      alert('An error occurred. Please try again later.');
      console.error('Error:', error);
    });
  
    
  }
  
  window.addEventListener('load', setUpUserOnLoadPage);

//---------------------------------------------------------------------------------------------






const fileInput = document.getElementById('profilePictureInput');

fileInput.addEventListener('change', (event) => {
   
    const profilePictureImage = document.getElementById('profilePictureImage');
    const profilePictureImageSmall = document.getElementById('profilePictureImage-small');

    const uid = localStorage.getItem('uid');
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('archivo', file);


    fetch('https://fixfast-backend-production.up.railway.app/api/uploads/usuarios/'+uid, {
      method: 'PUT',
      body:formData
    })
    .then(response => response.json()) // Assuming the server returns the updated profile picture URL in the response
      .then(data => {
        if (data.errors && data.errors.length > 0) {
            const errorMessage = data.errors[0].msg;
            alert(errorMessage);
          } else {
        console.log(data);
        console.log(data.img);
        const newImageUrl = data.img; 
        profilePictureImage.src = newImageUrl; 
        profilePictureImageSmall.src = newImageUrl;
        alert("SE CAMBIO LA IMAGEN DE PERFIL DE MANERA CORRECTA");
          }
      })
      .catch(error => {
        console.error(error);
        // Handle any errors that occurred during the upload
      });
  });

  
