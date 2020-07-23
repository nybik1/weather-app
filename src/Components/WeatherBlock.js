import React, { useState, useEffect } from 'react';




function WeatherBlock() {
    const [weatherInfo, setWeather] = useState([])
    const [mainInfo, setMain] = useState([])
    const [city, setCity] = useState('London')


    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=589169383aed721755a053bef1983c6e&units=metric`)
            .then((res) => res.json())
            .then((data) => {
                setWeather(data.weather)
                setMain(data.main)
            })
    }, [city])


    const citySearch = (e) => {
        e.preventDefault();
        const city = e.target[0].value;
        console.log(city)
        setCity(city)
    }


    return (
        <div className='weatherBlock'>
            <div className='search'>
                <form onSubmit={citySearch}>
                    <input className='input' placeholder='Enter city'></input>
                </form>
            </div>
            <div className='weatherInfo'>
                <h4>{weatherInfo.name}</h4>
                <h4>{weatherInfo.timezone}</h4>
                <div>
                    {weatherInfo.map(item => <p key={item.id}>{item.description}</p>)}
                </div>
                <div>
                    {mainInfo.temp}
                </div>
            </div>
        </div>
    )

}



export default WeatherBlock;