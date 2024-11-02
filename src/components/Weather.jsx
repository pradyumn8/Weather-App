import React, { useState } from 'react';
import search_icon from '../assets/search.png';
import './Weather.css';
import  API_KEY  from '../api';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState();
    const [error, setError] = useState(''); // Added error state

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    
    function handleOnChange(event) {
        setCity(event.target.value);
    }

    async function fetchData() {
        try {
            let response = await fetch(url);
            let output = await response.json();
            if (response.ok) {
                setWeather(output);
                setError(''); // Clear any previous error if successful
            } else {
                setError('No data found. Please enter a valid city name.');
            }
        } catch (error) {
            setError('An error occurred while fetching data.'); // Display error message on catch
        }
    }

    return (
        <div className='container'>
            <div className="city">
                <input
                    type="text"
                    value={city}
                    onChange={handleOnChange}
                    placeholder="Enter the city name"
                />
                <button><img onClick={() => fetchData()} src={search_icon} alt="Search" /></button>
            </div>
            {error && <p className="error">{error}</p>} {/* Display error if present */}
            {weather && (
                <div className="weather-info">
                   <img src={'https://openweathermap.org/img/wn/10d@2x.png'} alt="" />
                </div>
            )}
        </div>
    );
}

export default Weather;
