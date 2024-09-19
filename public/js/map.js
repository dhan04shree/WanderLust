
const divElement = document.getElementById('mymap');
const locationName = divElement.getAttribute('data-info');
const countryName = divElement.getAttribute('country-info');
const apikey = divElement.getAttribute('api-info');

let arr = [locationName,countryName];
const cityName = arr.join(' ');
const apiurl= `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(cityName)}.json`;

fetch(`${apiurl}?key=${apikey}`)
  .then(response => response.json())
  .then(data => {

    if (data && data.results && data.results.length > 0) {
      const location = data.results[0];
      const latitude = location.position.lat;
      const longitude = location.position.lon;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      
      var map = tt.map({
        key: apikey,
        container: "mymap",
        center:[longitude,latitude],
        zoom:9,
        });
        map.addControl(new tt.NavigationControl());
        new tt.Marker({color:"red"})
                .setLngLat([longitude, latitude])
                .setPopup(new tt.Popup({ offset: 5 }).setText(`(${cityName}) Exact location will be provided after booking`))
                .addTo(map);
    } else {
      console.log('No results found.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
