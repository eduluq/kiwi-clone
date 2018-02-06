import React, { Component } from 'react';

//import styles
import './result-card.css';

class ResultCard extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { depatureRoute, returnRoute } = this.props.result;
    const isOneWay = returnRoute ? false : true;
    const route = isOneWay ? depatureRoute.route : [...returnRoute.route, ...depatureRoute.route];
    this.props.onClick(this.props.result.id, route);
  }

  render() {
    const { price, link, depatureRoute, returnRoute } = this.props.result;
    const { isSelected } = this.props;

    //if returnRoute === null, it's a one way trip
    const isOneWay = returnRoute ? false : true;

    return(
      <div>
        <div className="result-card" onClick={this.onClick}>

          {/* Flight Price */}
          <div className="result-card__price">
            {`${price} €`}
          </div>

          {/* Flights */}
          <div className="result-card__flights">

            {/* One Way Route */}
            <div className="result-card__flights__item">
              <div className="result-card__airline">
                <img
                  src={`//images.kiwi.com/airlines/32x32/${depatureRoute.airlines[0]}.png`}
                  alt="airline icon"
                />
              </div>
              <div className="result-card__date">
                <div className="result-card__time">{`${depatureRoute.dtime} - ${depatureRoute.atime}`}</div>
                <div>{depatureRoute.date}</div>
              </div>
              <div className="result-card__route">
                <div className="result-card__duration">{depatureRoute.duration}</div>
                <div>{`${depatureRoute.from} -> ${depatureRoute.to}`}</div>
              </div>
            </div>

            {!isOneWay && <hr className="result-card__flights__separator"/>}

            {/* Return Route, if it exists */}
            {!isOneWay &&
              <div className="result-card__flights__item">
                <div className="result-card__airline">
                  <img
                    src={`//images.kiwi.com/airlines/32x32/${returnRoute.airlines[0]}.png`}
                    alt="airline icon"
                  />
                </div>
                <div className="result-card__date">
                  <div className="result-card__time">{`${returnRoute.dtime} - ${returnRoute.atime}`}</div>
                  <div>{returnRoute.date}</div>
                </div>
                <div className="result-card__route">
                  <div className="result-card__duration">{returnRoute.duration}</div>
                  <div>{`${returnRoute.from} -> ${returnRoute.to}`}</div>
                </div>
              </div>
            }
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
