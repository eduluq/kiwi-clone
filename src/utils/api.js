import { formatTime, formatDate } from './time';

const PATH_BASE = 'https://api.skypicker.com';
const PATH_FLIGHTS = '/flights';
const PATH_PLACES = '/locations';
const PARAM_PLACEID = 'term=';
const PARAM_FROM = 'flyFrom=';
const PARAM_TO = 'to=';
const PARAM_DATE_FROM = 'dateFrom=';
const PARAM_DATE_TO = 'dateTo=';
const PARAM_RETURN_FROM = 'returnFrom=';
const PARAM_RETURN_TO = 'returnTo=';
const PARAM_PARTNER = 'partner=picky&partner_market=us';

export const getFlightsAPI = (from, to, dateFrom1, dateTo2) => {

  const dateFrom = dateFrom1;
  const dateTo = dateFrom1;
  const returnFrom = dateTo2;
  const returnTo = dateTo2;

  const url = `${PATH_BASE}${PATH_FLIGHTS}?${PARAM_FROM}${from}&${PARAM_TO}${to}&${PARAM_DATE_FROM}${dateFrom}&${PARAM_DATE_TO}${dateTo}&${PARAM_RETURN_FROM}${returnFrom}&${PARAM_RETURN_TO}${returnTo}&${PARAM_PARTNER}`;

  const promise = new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const results = data.data.map((d => {
          return({
            id: d.id,
            from: `${d.cityFrom} (${d.flyFrom})`,
            to: `${d.cityTo} (${d.flyTo})`,
            dtime: formatTime(d.dTime),
            atime: formatTime(d.aTime),
            duration: d.fly_duration,
            duration_s: d.duration.departure,
            date: formatDate(d.dTime),
            price: d.price,
            airline: d.airlines[0],
            route: d.route,
            link: d.deep_link,
          })
        }));
        console.log(data.data[0].routes.length);
        resolve(results);
      })
      .catch(error => {
        reject(error);
      })
  })

  return promise;

}

export const getPlacesAPI = (placeId) => {

  const url = `${PATH_BASE}${PATH_PLACES}?${PARAM_PLACEID}${placeId}&${PARAM_PARTNER}`;

  const promise = new Promise((resolve, reject) => {
    console.log(url);
    fetch(url, {mode: 'no-cors'})
      .then(response => response.json())
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      })
  })

  return promise
}
