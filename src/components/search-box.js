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
  }

  render() {

    const { onSearch } = this.props;
    const { mode, origin, destination, departureDate, returnDate } = this.state;

    const sbm = (option) => {
      if (option === this.state.mode) return 'mode active';
      else return 'mode'
    }

    const onClick = (option) => {
      this.setState({ mode: option })
    }

    const onInputChange = (event) => {
      const { name, value } = event.target;
      this.setState({
        [name]: value,
      });
    }

    const returnDatePlaceholder = this.state.mode === 'one way' ? 'Sin regreso' : '09/09/2018';

    return(
      <div className="search-box">
        <div className="search-box__modes">
          <a onClick={() => onClick("one way")} className={sbm("one way")}>Solo ida</a>
          <a onClick={() => onClick("round trip")} className={sbm("round trip")}>Ida y vuelta</a>
        </div>
        <div className="search-box__form">
          <div className="search-box__form__group">
            <AirportInput name="origin" label="Origen" placeholder="Desde dónde" value={this.state.origin} onChange={onInputChange} />
            <AirportInput name="destination" label="Destino" placeholder="A dónde" value={this.state.destination} onChange={onInputChange} />
          </div>
          <div className="search-box__form__group">
            <DateInput name="departureDate" label="Salida" placeholder="lun. 29/01 - mier. 28/02" value={this.state.departureDate} onChange={onInputChange} />
            <DateInput name="returnDate" label="Regreso" placeholder={returnDatePlaceholder} value={this.state.returnDate} onChange={onInputChange} />
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
