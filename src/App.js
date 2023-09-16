import './App.css';
import Sea from './components/search/Sea.js';
import CurrentWeather from './components/current_weather/current_weather.js';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import { useState } from 'react';
import Forecast from './components/forecast/forecast';
import Top from './components/top/Top';
function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forcast, setForcast] = useState(null);
  
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forcastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, forcastFetch]).then(async (response) => {
      const weatherResponse = await response[0].json();
      const forcastResponse = await response[1].json();

      setCurrentWeather({ city: searchData.label, ...weatherResponse });
      setForcast({ city: searchData.label, ...forcastResponse });
    }).catch((err) => { console.log(err) });
  }

  console.log(currentWeather);
  console.log(forcast);
  return (
    <div className='main'>
          
      <div className="container">
      <Sea onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      
    </div>
    <div className='for'>
      {forcast && <Forecast data={forcast} />}
    </div>
    </div>
  );
}

export default App;
