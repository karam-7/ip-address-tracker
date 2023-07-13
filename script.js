const input = document.querySelector('#in');
const btn = document.querySelector('#btn');

// ================= CREATE MAP =================
// https://leafletjs.com/examples/quick-start/

const myIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [46, 56],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});

let mymap = L.map('map').setView([30.343191, 76.401840], 13);
let marker = L.marker([30.343191, 76.401840], {icon: myIcon}).addTo(mymap);

marker.bindPopup(`IP Address: <b>180.188.249.159</b><br>Location: <b>Patiala, IN </b>`);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYW5uYXNlcmVnaSIsImEiOiJja2g0eG15dzAwY3pyMnpvOWExYzQ5eHFoIn0.R477kJxFENpSygYtn-RPEA'
}).addTo(mymap);

// ================= CREATE MAP =================

function getInput() {
  const ip = input.value;

  const key = 'at_PTT02duq568yvroOy4kGIKShZbbpR'
  const url = `https://geo.ipify.org/api/v1?apiKey=${key}&ipAddress=${ip}`;

  fetchData(url);
  input.value = '';
}

// ================= FETCH DATA =================

async function fetchData(url) {
    let response = await fetch(url);
    let data = await response.json();

    console.log(response.statusText)
    if (response.statusText !== 'OK') {
      alert(`Sorry, the IP address or domain you've entered does not exist. Try an other search! `)
    }
    
    const { ip, location, isp} = data;

    setResults(ip, location.city, location.postalCode, location.timezone, isp, location.country);
    setMap(location.lat, location.lng, ip, location.city, location.country);
}

// ================= UPDATE DOM WITH RESULTS =================

function setResults(ip, city, postcode, utc, isp, country) {
  const ip_address = document.querySelector('#ip');
  const location = document.querySelector('#loc');
  const timezone = document.querySelector('#zone');
  const provider = document.querySelector('#isp');

  ip_address.innerText = `${ip}`;
  location.innerText = `${city}, ${country} ${postcode ? postcode : country}`;
  timezone.innerText = `UTC ${utc}`;
  provider.innerText = `${isp}`;
}

// ================= SET MAP AND MARKER WITH NEW SEARCH =================

function setMap(lat, lng, ip, city, country) {
  mymap.setView([lat, lng]);
  marker = L.marker([lat, lng]).addTo(mymap);
  marker.bindPopup(`IP Address: <b>${ip}</b><br>Location: <b>${city}, ${country}</b>`);
}

// ================= EVENT LISTENERS =================
btn.addEventListener('click', () => {
  getInput();
})

input.addEventListener('search', () => {
  getInput();
})