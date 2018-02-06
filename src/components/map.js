import React from 'react';
import GoogleMapReact from 'google-map-react';

//import styles
import './map.css';

//import components
import Marker from './marker';

const Map = ({ route }) => {

  const markers = [].concat(...route.map(r => {
    const { id, cityFrom, cityTo, latFrom, lngFrom, latTo, lngTo, returnFlight } = r;
    return([
      <Marker key={`${id}${cityFrom}`} lat={latFrom} lng={lngFrom} label={cityFrom} returnFlight={returnFlight}/>,
      <Marker key={`${id}${cityTo}`} lat={latTo} lng={lngTo} label={cityTo} returnFlight={returnFlight}/>,
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
