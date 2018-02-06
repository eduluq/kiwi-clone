import React, { Component } from 'react';

//import utils
import { getFlightsAPI } from '../utils/api';

//import styles
import './app.css';

//import components
import Header from './header';
import SearchBox from './search-box';
import ResultList from './result-list';
import Map from './map';

const initParams = {
  origin: 'Seville',
  destination: 'Bangkok',
  departureDate: '09/06/2018',
  returnDate: '',
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      fetching: false,
      selectedFlight: '',
      selectedRoute: []
    }
    this.onSearch = this.onSearch.bind(this);
    this.onFlightSelected = this.onFlightSelected.bind(this);
  }

  onSearch(origin, destination, departureDate, returnDate, mode) {
    this.setState({ fetching: true })
    getFlightsAPI(origin, destination, departureDate, returnDate)
      .then(results => {
        this.setState({ results, fetching: false });
      })
      .catch(error => {
        console.log("Error", error);
        this.setState({ fetching: false });
      })
  }

  onFlightSelected(id, route) {

    let airports, selectedFlight;

    if (this.state.selectedFlight === id) {
      airports = [];
      selectedFlight = '';
    } else {
      airports = route.map(r => ({
        id: r.id,
        cityFrom: r.cityFrom,
        cityTo: r.cityTo,
        latFrom: r.latFrom,
        lngFrom: r.lngFrom,
        latTo: r.latTo,
        lngTo: r.lngTo,
        returnFlight: r.return,
      }));
      selectedFlight = id;
    }

    this.setState({
      selectedFlight: selectedFlight,
      selectedRoute: airports
    });

  }

  componentDidMount() {
    this.setState({ fetching: true })
    getFlightsAPI(initParams.origin, initParams.destination,initParams.departureDate, initParams.returnDate)
      .then(results => {
        this.setState({ results, fetching: false });
      })
      .catch(error => {
        this.setState({ fetching: false });
      })
  }

  render() {
    return (
      <div className="app">
        <Header />
        <SearchBox onSearch={this.onSearch} initParams={initParams} />
        <ResultList
          fetching={this.state.fetching}
          results={this.state.results}
          selectedFlight={this.state.selectedFlight}
          onFlightSelected={this.onFlightSelected}
        />
        <Map route={this.state.selectedRoute} />
      </div>
    );
  }
}

export default App;
