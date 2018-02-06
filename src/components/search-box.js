import React, { Component } from 'react';

//import styles
import './search-box.css';

//import components
import { AirportInput, DateInput } from './inputs';

class SearchBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: 'one way',
      origin: props.initParams.origin,
      destination: props.initParams.destination,
      departureDate: props.initParams.departureDate,
      returnDate: props.initParams.returnDate,
    }
    this.onClick = this.onClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  calculateModeClass(option) {
    if (option === this.state.mode) return 'mode active';
    else return 'mode'
  }

  onClick(option) {
    this.setState({ mode: option });
  }

  onInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {

    const { onSearch } = this.props;
    const { mode, origin, destination, departureDate, returnDate } = this.state;

    const returnDatePlaceholder = this.state.mode === 'one way' ? 'Sin regreso' : '09/09/2018';
    const returnDateDisabled = this.state.mode === 'one way' ? true : false;

    return(
      <div className="search-box">
        <div className="search-box__modes">
          <a
            onClick={() => this.onClick("one way")}
            className={this.calculateModeClass("one way")}>Solo ida
          </a>
          <a
            onClick={() => this.onClick("round trip")}
            className={this.calculateModeClass("round trip")}>Ida y vuelta
          </a>
        </div>
        <div className="search-box__form">
          <div className="search-box__form__group">
            <AirportInput
              name="origin"
              label="Origen"
              placeholder="Desde dónde"
              value={this.state.origin}
              onChange={this.onInputChange}
            />
            <AirportInput
              name="destination"
              label="Destino"
              placeholder="A dónde"
              value={this.state.destination}
              onChange={this.onInputChange}
            />
          </div>
          <div className="search-box__form__group">
            <DateInput
              name="departureDate"
              label="Salida"
              placeholder="lun. 29/01 - mier. 28/02"
              value={this.state.departureDate}
              onChange={this.onInputChange}
              disabled={false}
            />
            <DateInput
              name="returnDate"
              label="Regreso"
              placeholder={returnDatePlaceholder}
              value={this.state.returnDate}
              onChange={this.onInputChange}
              disabled={returnDateDisabled}
            />
          </div>
          <button
            className="search-box__submit"
            onClick={() => onSearch(origin, destination, departureDate, returnDate, mode)}
          >
            Search
          </button>
        </div>
        <div className="search-box__filters">
        </div>
      </div>
    );
  }
}

export default SearchBox;
