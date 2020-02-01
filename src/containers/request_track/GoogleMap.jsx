import React from "react";
import GoogleMapReact from "google-map-react";
import { useGeolocation } from 'react-use';
import Marker from './marker.svg';

/**
 * @type {React.FC}
 */
const TrackerMap = () => {
  const location = useGeolocation();
  const zoom = 15;
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
        <img src={Marker} width={zoom*2} height={zoom*2} lat={lat} lng={lng} />
      </GoogleMapReact>
    </div>
  );
};

export default TrackerMap;
