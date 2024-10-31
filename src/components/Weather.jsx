import React from 'react'
import search_icon from '../assets/search.png';

const Weather = () => {

    
  return (
    <div className='container'>
        <div className="city search-bar">
            <input type="text" placeholder='Enter the city name;'/>
            <img src={search_icon} alt="" />
        </div>
    </div>
  )
}

export default Weather