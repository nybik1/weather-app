import React, { useState, useEffect } from 'react';
import axios from 'axios';
import s from './style.module.scss';
import cs from 'classnames';





function WeatherBlock() {
    const [weatherInfo, setWeather] = useState([])
    const [city, setCity] = useState('London')
    const [isLoaded, setLoaded] = useState(false)



    useEffect(() => {
        axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4b855d2b76fee082204263d0053d537b&units=metric`)
            .then(({ data }) => {
                setWeather(data)
                setLoaded(true);
            })
            .catch((res) => {
                console.log(res)
                setWeather(res.message)
            })
    }, [city])


    const citySearch = (e) => {
        e.preventDefault();
        const city = e.target[0].value;
        console.log(city)
        setCity(city)
        setLoaded(false)
        // console.log(weatherInfo[0].description)
    }

    return (
        <div className={s.weatherBlock}>
            <div className={s.search}>
                <form onSubmit={citySearch}>
                    <input className='input' placeholder='Enter city'></input>
                </form>
            </div>
            {!isLoaded && <h4>loading</h4>}
            {isLoaded &&
                <div className={cs(s.weatherInfo,
                    { [s.fewClouds]: weatherInfo.weather[0].description === 'few clouds' },
                    { [s.clearSky]: weatherInfo.weather[0].description === 'clear sky' },
                    { [s.overcastClouds]: weatherInfo.weather[0].description === 'overcast clouds' },
                    { [s.scatteredClouds]: weatherInfo.weather[0].description === 'scattered clouds' },
                    { [s.brokenClouds]: weatherInfo.weather[0].description === 'broken clouds' },
                    { [s.rain]: weatherInfo.weather[0].description === 'rain' },
                    { [s.showerRain]: weatherInfo.weather[0].description === 'shower rain' },
                    { [s.thunderstom]: weatherInfo.weather[0].description === 'thunderstorm' },
                    { [s.snow]: weatherInfo.weather[0].description === 'snow' },
                    { [s.mist]: weatherInfo.weather[0].description === 'mist' },
                )}>
                    <div>
                        <h4>{weatherInfo.name}</h4>
                        <div>
                            {weatherInfo.weather.map(item => <p key={item.id}>{item.description}</p>)}
                        </div>
                    </div>
                </div>}

        </div>


    )

}



export default WeatherBlock;