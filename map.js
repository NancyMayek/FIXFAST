mapboxgl.accessToken = 'pk.eyJ1IjoibmFuY3ltYXllayIsImEiOiJjbGh0dmdlamEyZ3FyM2RudTA5N2p6cjNwIn0.rI0dhokmQXjJhDpNC7DMNw';
  navigator.geolocation.getCurrentPosition(showMap, showError);

  function showMap(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
        center: [-98.198800, 18.995600],
        zoom: 13
    });

//const marker1 = new mapboxgl.Marker()
//.setLngLat([longitude, latitude])
//.addTo(map);
 
// Create a default Marker, colored black, rotated 45 degrees.
const CUBUAPmarker = new mapboxgl.Marker({ color: 'black', rotation: 0 })
.setLngLat([-98.198800, 18.995600])
.addTo(map);

// Create a default Marker, colored black, rotated 45 degrees.
const maker_worker_1 = new mapboxgl.Marker({ color: 'orange', rotation: 45 })
.setLngLat([-98.194890, 19.003950])
.addTo(map);

const maker_worker_2= new mapboxgl.Marker({ color: 'orange', rotation: 45 })
.setLngLat([-98.200200, 19.009700])
.addTo(map);

const maker_worker_3= new mapboxgl.Marker({ color: 'orange', rotation: 45 })
.setLngLat([-98.192020, 18.994470])
.addTo(map);

const maker_worker_4= new mapboxgl.Marker({ color: 'orange', rotation: 45 })
.setLngLat([-98.197550, 18.980600])
.addTo(map);
    
    
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        alert('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        alert('The request to get user location timed out.');
        break;
      case error.UNKNOWN_ERROR:
        alert('An unknown error occurred.');
        break;
    }
  }