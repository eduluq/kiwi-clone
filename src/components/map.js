import React from 'react';
import GoogleMapReact from 'google-map-react';

//import styles
import './map.css';

//import components
import Marker from './marker';

const Map = ({ route }) => {

  const markers = [].concat(...route.map(r => {
    const { id, cityFrom, cityTo, latFrom, lngFrom, latTo, lngTo } = r;
    return([
      <Marker key={`${id}${cityFrom}`} lat={latFrom} lng={lngFrom} label={cityFrom} />,
      <Marker key={`${id}${cityTo}`} lat={latTo} lng={lngTo} label={cityTo} />,
    ]);
  }));

  const map_options = {
    scrollwheel: false,
  }

  return (
    <div className="map">
      <GoogleMapReact
        defaultCenter={{lat: 47.08, lng: 2.4}}
        defaultZoom={5}
        options={map_options}
      >
        {markers}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
