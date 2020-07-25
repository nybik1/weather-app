import React, { useState, useEffect } from 'react';
import axios from 'axios';
import s from './style.module.scss';
import WeatherBlock from './../WeatherBlock';


function WeatherWrapper() {
    const [weatherInfo, setWeather] = useState({})
    const [city, setCity] = useState('Kiev')
    const [isLoaded, setLoaded] = useState(false)



    useEffect(() => {
        axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4b855d2b76fee082204263d0053d537b&units=metric&lang=ua`)
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
        setCity(city)
        setLoaded(false)
    }

    return (
        <div className={s.mainWrapper}>
            <div className={s.search}>
                <form onSubmit={citySearch}>
                    <input className={s.input_search} placeholder='Enter city'></input>
                </form>
            </div>
            {!isLoaded && <h4>loading</h4>}
            {isLoaded && <WeatherBlock
                name={weatherInfo.name}
                country={weatherInfo.sys.country}
                main={weatherInfo.weather[0].main}
                description={weatherInfo.weather[0].description}
                temp={Math.round(weatherInfo.main.temp)}
                wind={weatherInfo.wind.speed}
                humidity={weatherInfo.main.humidity}
                feels_like={Math.round(weatherInfo.main.feels_like)}
            />
            }
        </div>
    )
}


export default WeatherWrapper;