const divElement = document.getElementById('mymap');
const locationName = divElement.getAttribute('data-info');
const countryName = divElement.getAttribute('class');
const APIKEY = process.env.APIKEY;
let arr = [locationName,countryName];
const cityName = arr.join(' ');
// const cityName = locationName.concat(countryName);
console.log(cityName);

const url = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(cityName)}.json?key=${APIKEY}`;

fetch(url)
.then(response => response.json())
.then(data => {

if (data && data.results && data.results.length > 0) {
const location = data.results[0];
const latitude = location.position.lat;
const longitude = location.position.lon;
console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

var map = tt.map({
key: APIKEY,
container: "mymap",
center:[longitude,latitude],
zoom:10,
});
new tt.Marker({color:"red"})
.setLngLat([longitude, latitude])
.setPopup(new tt.Popup({ offset: 5 }).setText(cityName)) // Optional: Add a popup with the city name
.addTo(map);
} else {
console.log('No results found.');
}
})
.catch(error => {
console.error('Error:', error);
});