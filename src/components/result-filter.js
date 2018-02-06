import React from 'react';

//import styles
import './result-filter.css';

const ResultFilter = ({ className, onClick, label, icon, price, duration }) => (
  <div className={className ? `filter ${className}` : `filter`} onClick={onClick}>
    <div className="filter-header">
      <span className="filter-header__label">{label}</span>
      <i className={`fa fa-${icon}`} aria-hidden="true"></i>
    </div>
    <div className="filter-info">
      <span className="filter-info__price">{price}€</span>
      <span className="filter-info__duration">{duration}</span>
    </div>
  </div>
);

export default ResultFilter;
