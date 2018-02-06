import React, { Component } from 'react';

//import styles
import './result-list.css';

//import components
import ResultCard from './result-card';
import ResultFilter from './result-filter';

class ResultList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: 'recommended',
    }
    this.calcFilterClass = this.calcFilterClass.bind(this);
    this.setFilter = this.setFilter.bind(this);
  }

  calcFilterClass(type) {
    return this.state.filter === type ? 'active' : '';
  }

  setFilter(filter) {
    this.setState({ filter: filter });
  }

  filterResults(results, filter) {
    switch(filter) {
      case 'recommended':
      case 'cheapest':
        return results.sort((a, b) => {
          if (a.price > b.price) return 1;
          if (a.price < b.price) return -1;
          //if a.price === b.price, order by id
          return (a.id < b.id) ? 1 : -1;
        });
      case 'shortest':
        return results.sort((a, b) => {
          if (a.duration_s > b.duration_s) return 1;
          if (a.duration_s < b.duration_s) return -1;
          //if a.duration_s === b.duration_s, order by id
          return (a.id < b.id) ? 1 : -1;
        });
      default:
        return results;
    }
  }

  getMinX(data, x) {
    return data.reduce((min, b) => b[x] < min[x] ? b : min, data[0]);
  }

  render() {
    const { results, fetching, onFlightSelected, selectedFlight } = this.props;
    const filteredResults = this.filterResults(results, this.state.filter);

    let cheapestFlight = '';
    let shortestFlight = '';
    if(results.length > 0) {
      cheapestFlight = this.getMinX(results, 'price');
      shortestFlight = this.getMinX(results, 'duration_s');
    }

    return(
      <div className="result-list">

        {fetching
          ?
            <div>Loading...</div>
          :
          results.length > 0
            ?
              <div>
                <div className="filters">
                  <ResultFilter className={this.calcFilterClass('recommended')} onClick={() => this.setFilter('recommended')} label="Recomendado" icon="thumbs-up" price={cheapestFlight.price} duration={cheapestFlight.duration}/>
                  <ResultFilter className={this.calcFilterClass('cheapest')} onClick={() => this.setFilter('cheapest')} label="Mejor precio" icon="usd" price={cheapestFlight.price} duration={cheapestFlight.duration}/>
                  <ResultFilter className={this.calcFilterClass('shortest')} onClick={() => this.setFilter('shortest')} label="Menor duración" icon="clock-o" price={shortestFlight.price} duration={shortestFlight.duration}/>
                </div>
                <ul className="results">
                  {filteredResults.map(result => {
                    const isSelected = selectedFlight === result.id;
                    return (
                      <li key={result.id}>
                        <ResultCard
                          isSelected={isSelected}
                          result={result}
                          onClick={onFlightSelected}
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
            :
              <div className="message" style={{marginTop: '40px'}}>There is no flight with the indicated parameters</div>
        }
      </div>

    );
  }
}

export default ResultList;
