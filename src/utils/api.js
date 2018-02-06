import { formatTime, formatDate } from './time';

const PATH_BASE = 'https://api.skypicker.com';
const PATH_FLIGHTS = '/flights';
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

          //Split flights between departure and return trips
          const depatureFlights = d.route.filter(flight => flight.return === 0);
          const returnFlights = d.route.filter(flight => flight.return === 1);

          //Airlines
          const departureAirlines = depatureFlights.map(a => a.airline);
          const returnAirlines = returnFlights.map(a => a.airline);

          //viaje de ida
          const depatureRoute = {
            from: `${d.cityFrom} (${d.flyFrom})`,
            to: `${d.cityTo} (${d.flyTo})`,
            dtime: formatTime(d.dTime),
            atime: formatTime(d.aTime),
            duration: d.fly_duration,
            duration_s: d.duration.departure,
            date: formatDate(d.dTime),
            airlines: departureAirlines,
            route: depatureFlights,
          }

          //viaje de vuelta
          const returnRoute = (returnFlights.length > 0)
          ?
          {
            from: depatureRoute.to,
            to: depatureRoute.from,
            dtime: formatTime(returnFlights[0].dTime),
            atime: formatTime(returnFlights[returnFlights.length - 1].aTime),
            duration: d.return_duration,
            duration_s: d.duration.return,
            date: formatDate(returnFlights[0].dTime),
            airlines: returnAirlines,
            route: returnFlights,
          }
          : null;

          //Total flights duration
          const total_duration_s = depatureRoute.duration_s
            + ((returnRoute) ? returnRoute.duration_s : 0);

          //Format time from seconds to '18h 20m' format
          const hours = Math.floor((total_duration_s / 60) / 60);
          const minutes = Math.floor((total_duration_s / 60) % 60);
          const total_duration = `${hours}h ${minutes}m`;

          return({
            id: d.id,
            price: d.price,
            duration_s: total_duration_s,
            duration: total_duration,
            link: d.deep_link,
            depatureRoute, //viaje de ida
            returnRoute, //viaje de vuelta
          })

        }));
        resolve(results);
      })
      .catch(error => {
        reject(error);
      })
  })

  return promise;

}
