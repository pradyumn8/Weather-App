import React, { useEffect, useState } from 'react';
import './Weather.css';
import API_KEY from '../api';
import { FaSearch, FaWind } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { WiHumidity } from 'react-icons/wi';

const Weather = () => {
    const [city, setCity] = useState('Delhi');
    const [weather, setWeather] = useState();
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    useEffect(() => {
        fetchData()
        // Show popup after 2 seconds
        const timer = setTimeout(() => setShowPopup(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    function handleOnChange(event) {
        setCity(event.target.value);
    }

    async function fetchData() {
        setWeather(null); 
        try {
            let response = await fetch(url);
            let output = await response.json();
            if (response.ok) {
                setWeather(output);
                setError(''); 
            } else {
                setError('No data found. Please enter a valid city name.');
            }
        } catch (error) {
            setError('An error occurred while fetching data.');
        }
    }

    return (
        <div className='container'>
            {showPopup && (
                <div className="popup">
                    <p>Welcome! Discover today’s weather in your favorite city 🌞</p>
                    <button onClick={() => setShowPopup(false)}>Got it!</button>
                </div>
            )}
            <div className='city'>
                <input type='text' value={city} onChange={handleOnChange} placeholder='Enter any city name'></input>
                <button onClick={() => fetchData()}>
                <FaSearch/>
                </button>
            </div>

            {error && <p className='error-message'>{error}</p>}
            {weather && weather.weather && (
                <div className='content'>
                    <div className='weather-image'>
                        <img
                            style={{ width: '150px' }}
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt="Weather icon"
                        />
                        <h3 className='desc'>{weather.weather[0].description}</h3>
                    </div>
                    <div className='weather-temp'>
                        <h2>{weather.main.temp}<span>&deg;C</span></h2>
                    </div>
                    <div className='weather-city'>
                        <div className='location'>
                            <MdLocationOn/>
                        </div>
                        <p>{weather.name},<span>{weather.sys.country}</span></p>
                    </div>
                    <div className='weather-stats'>
                        <div className='wind'>
                            <div className='wind-icon'>
                                <FaWind/>
                            </div>
                            <h3 className='wind-speed'>{weather.wind.speed}<span>Km/h</span></h3>
                            <h3 className='wind-heading'>Wind Speed</h3>
                        </div>
                        <div className='humidity'>
                            <div className='humidity-icon'>
                                <WiHumidity/>
                            </div>
                            <h3 className='humidity-percent'>{weather.main.humidity}<span>%</span></h3>
                            <h3 className='humidity-heading'>Humidity</h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Weather;
