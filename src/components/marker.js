import React from 'react';

//import styles
import './marker.css';

const Marker = ({ label, returnFlight }) => {

  const markerClass = (returnFlight === 0) ? 'marker--departure' : 'marker--return';

  return (
    <div className={`marker ${markerClass}`}>
      <i className="fa fa-plane"></i>
    </div>
  )
};

export default Marker;
