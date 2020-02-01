import React from "react";
import GoogleMapReact from "google-map-react";
import { useGeolocation } from 'react-use';
import Marker from './marker.svg';

const LogMarker = ({ log }) => {
  return (
    <div>
      <img src={Marker} width={32} height={32} alt="hmm fuck" />
    </div>
  );
};

/**
 * @type {React.FC}
 */
const TrackerMap = ({ logs }) => {
  const location = useGeolocation();
  const zoom = 16;
  const lat = location.latitude, lng = location.longitude;

  if(location.loading) {
    return <span>Loading...</span>
  }

  return (
    <div style={{ width: "100%", height: "30rem" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_KEY,
          language: "en"
        }}
        center={{ lat, lng }}
        defaultZoom={zoom}
      >
        {logs.map(l => <LogMarker log={l} lat={l.latitude} lng={l.longitude} />)}
      </GoogleMapReact>
    </div>
  );
};

export default TrackerMap;
