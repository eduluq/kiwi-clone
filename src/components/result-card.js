import React, { Component } from 'react';

//import styles
import './result-card.css';

class ResultCard extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const route = this.props.result.route;
    this.props.onClick(this.props.result.id, route);
  }

  render() {
    const { from, to, dtime, atime, duration, date, price, airline, link } = this.props.result;
    const { isSelected } = this.props;
    return(
      <div>
        <div className="result-card" onClick={this.onClick}>
          <div className="result-card__price">{`${price} €`}</div>
          <div className="result-card__airline">
            <img
              src={`//images.kiwi.com/airlines/32x32/${airline}.png`}
              alt="airline icon"
            />
          </div>
          <div className="result-card__date">
            <div className="result-card__time">{`${dtime} - ${atime}`}</div>
            <div>{date}</div>
          </div>
          <div className="result-card__route">
            <div className="result-card__duration">{duration}</div>
            <div>{`${from} -> ${to}`}</div>
          </div>
          <div className="result-card__more">
            <i className="fa fa-angle-down" aria-hidden="true"></i>
          </div>
        </div>
        <div className={isSelected ? 'result-card-extended active' : 'result-card-extended'}>
          <a className="button" href={link}>{`Reservar por ${price}€`}</a>
        </div>
      </div>
    )
  }
}

export default ResultCard;
