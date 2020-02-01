import React from 'react'
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => (
    <div style={{
      color: 'white', 
      background: 'grey',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)'
    }}>
      {text}
    </div>
);

const SimpleMap = (props) => {

    const { lat, lng, placeName } = props
    const zoom = 15
    
    return (
        <div style={{width: '100%', height: '7rem'}}>        
            <GoogleMapReact
                bootstrapURLKeys={{ key:"AIzaSyCKw9OC2Zpsiuan-b32S7hKcETAUMY4cIQ", language: 'en'}}
                defaultCenter={{lat:lat, lng:lng}}
                defaultZoom={zoom}
            >
                <AnyReactComponent 
                lat={lat} 
                lng={lng} 
                text={placeName} 
                />
            </GoogleMapReact>
        </div>
    );
}
  
export default SimpleMap;