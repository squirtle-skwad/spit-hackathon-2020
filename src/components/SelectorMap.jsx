import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { useGeolocation } from 'react-use';
import Marker from '../assets/marker.svg';

const SelectionMarker = () => {
  return (
    <div>
      <img src={Marker} width={32} height={32} alt="hmm fuck" />
    </div>
  );
};

/**
 * @type {React.FC}
 */
const SelectorMap = ({ onChange, value }) => {
  const location = useGeolocation();
  const zoom = 16;
  const lat = location.latitude, lng = location.longitude;
  const [selectedLat, setLat] = useState();
  const [selectedLng, setLng] = useState();

  useEffect(() => {
    if(onChange) {
      onChange({
        lat: selectedLat,
        lng: selectedLng,
      });
    }
  }, [selectedLat, selectedLng, onChange]);

  if(location.loading) {
    return <span>Loading...</span>
  }

  return (
    <div style={{ width: "100%", height: "20rem" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_KEY,
          language: "en"
        }}
        center={{ lat, lng }}
        defaultZoom={zoom}
        onClick={({x, y, lat, lng, event}) => {
          if(event.type === 'click') {
            setLat(lat);
            setLng(lng);
          }
        }}
      >
        {selectedLat && selectedLng && <SelectionMarker lat={selectedLat} lng={selectedLng} />}
      </GoogleMapReact>
    </div>
  );
};

export default SelectorMap;
