export function kelvinToCelsius(kelvin) {
  return Math.floor(kelvin - 273.15);
}

export const formatDate = (dateObj) => {
  const dayNum = dateObj.getDay();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = dayNames[dayNum];
  const dateToday = dateObj.getDate().toString().padStart(2, "0");
  const month = dateObj.getMonth().toString().padStart(2, "0");

  return `${day}, ${month}/${dateToday}`;
};

export function createDataObject(obj) {
  const initialObjet = {
    city: null,
    country: null,
    temperature: null,
    weather: null,
    pressure: null,
    humidity: null,
    wind: null,
  };

  if (obj !== null) {
    initialObjet.city = obj.name;
    initialObjet.country = obj.sys.country;
    initialObjet.temperature = obj.main.temp;
    initialObjet.weather = obj.weather[0].main;
    initialObjet.pressure = obj.main.pressure;
    initialObjet.humidity = obj.main.humidity;
    initialObjet.wind = obj.wind.speed;
  }

  return initialObjet;
}

export const formatTime = (date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours} : ${minutes} ${parseInt(hours) >= 12 ? "PM" : "AM"}`;
};

export const background = {
  rain: "https://images.pexels.com/photos/2929290/pexels-photo-2929290.jpeg?auto=compress&cs=tinysrgb&w=400",
};
