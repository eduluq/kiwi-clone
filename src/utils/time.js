export const formatTime = (timestamp) => {

  const date = new Date(timestamp * 1000);

  // Hours part from the timestamp
  const hours = date.getHours();
  // Minutes part from the timestamp
  const minutes = "0" + date.getMinutes();
  // Will display time in 10:30 format
  const formattedTime = hours + ':' + minutes.substr(-2);

  return formattedTime;

}

export const formatDate = (timestamp) => {

  const date = new Date(timestamp * 1000);

  // Day of week from the timestamp
  const weekDay = ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'][date.getDay()];
  // Day part from the timestamp
  const day = date.getDate();
  // Month part from the timestamp
  const month = date.getMonth() + 1;
  // Year part from the timestamp
  const year = date.getFullYear();
  // Will display date in 08/02/1923 format
  const formattedDate = `${weekDay}. ${day}/${month}/${year}`;

  return formattedDate;

}
