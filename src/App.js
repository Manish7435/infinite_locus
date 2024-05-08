import React, { useCallback, useState } from 'react';
import { getCurrentTime } from './utils/time';

function App() {
  const [city, setCity] = useState('');
  const [error, setError] =useState(false)
  const [weatherData, setWeatherData] = useState(null);
  const WEATHER_KEY = process.env.REACT_APP_API_KEY

  const fetchWeatherData = useCallback(async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_KEY}&units=metric`);
      if (response.ok) {
        setError(false)
        const data = await response.json();
        setWeatherData(data);
      } else {
        setError(true)
      }
  
    } catch (error) {
     
      console.error('Error fetching weather data:', error);
    }
  },[city,WEATHER_KEY]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city!== '') {
      fetchWeatherData();
    }
  };

  return (
    <div className='bg-hero bg-cover bg-center h-screen w-full flex flex-col items-center'>
      <div className='absolute left-4 top-4 flex items-center'>
         <img src = "/Weather_app.svg" alt='weather' className='sm:h-16 sm:w-16 h-12 w-12'/>
         <div className='text-blue-600 font-bold ml-3 sm:text-3xl text-2xl'>
           WEATHER
         </div>
      </div>

          <form onSubmit={handleSubmit} className='pt-60'>
            <div className='flex sm:w-[400px] w-full relative bg-white rounded-3xl px-4 justify-between'>
              <input
                className='outline-none bg-white h-12 px-4 rounded-3xl text-black '
                type="text"
                placeholder="Search city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button type="submit"><img className='h-10 w-10'  src='/Cloud.svg' alt = "search"/></button>
            </div>
          </form>
          {error && <p className='text-red-900 mt-3'>Please enter right city name</p>}
          {weatherData && (
            <div className=" flex flex-col mt-12 items-center">
              <h2 className='text-5xl text-emerald-500 font-semibold'>{weatherData.name}, {weatherData.sys.country}</h2>
             
              <div className='flex items-center text-3xl text-blue-600 font-semibold'>
                  <img src ={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt='weather_icon' className='z-20 h-20 w-20 '/>
                  <p > {weatherData.main.temp}°C</p>
              </div>
              <div className='sm:h-30 w-full bg bg-gradient-to-tr from-cyan-300 to-white px-20 py-10 rounded-lg opacity-55 flex flex-col text-center'>
                  <p className='sm:text-3xl text-2xl font-semibold '>  {getCurrentTime()}</p>
                   <p className='text-3xl font-semibold text-orange-500'>{`${weatherData.weather[0].description[0].toUpperCase()}${weatherData.weather[0].description.slice(1)}`}</p>
                  <p className='mt-2'><span className='text-blue-500 font-semibold '>Humidity:</span> {weatherData.main.humidity}%</p>
                  <p><span className='text-blue-500 font-semibold'> Wind Speed:</span> {weatherData.wind.speed} m/s</p>
              </div>
             
            </div>
          )}

    </div>
  );
}

export default App;

