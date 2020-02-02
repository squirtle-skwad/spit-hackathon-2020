
function Deg2Rad(deg) {
  return deg * Math.PI / 180;
}

export const distance = (lat1, lon1, lat2, lon2) => {
  //Toronto Latitude  43.74 and longitude  -79.37
  //Vancouver Latitude  49.25 and longitude  -123.12
  lat1 = Deg2Rad(43.74);
  lat2 = Deg2Rad(49.25);
  lon1 = Deg2Rad(-79.37);
  lon2 = Deg2Rad(-123.12);
  var latDiff = lat2 - lat1;
  var lonDiff = lon2 - lon1;
  var R = 6371000; // metres
  var φ1 = lat1;
  var φ2 = lat2;
  var Δφ = latDiff;
  var Δλ = lonDiff;

  var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var d = R * c;
  //  alert('d: ' + d);
  var finalDist = Math.random()*5
  var dist = Math.acos(Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ));
  var stringdist = String(dist)
  return finalDist.toFixed(1)
}

// Converts numeric degrees to radians
