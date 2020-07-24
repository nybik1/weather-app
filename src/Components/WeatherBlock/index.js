import React, { useState, useEffect } from 'react';
import axios from 'axios';
import s from './style.module.scss';
import cs from 'classnames';
import Sun from './../../img/sun.svg';
import Clouds from './../../img/clouds.svg';
import Rain from './../../img/rain.svg';
import Snow from './../../img/snow.svg';
import Mist from './../../img/mist.svg';
import Thunderstorm from './../../img/thunderstorm.svg';


function WeatherBlock() {
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
            {isLoaded &&
                <div className={cs(s.weatherBlock,
                    { [s.clearSky]: weatherInfo.weather[0].main === 'Clear' },
                    { [s.clouds]: weatherInfo.weather[0].main === 'Clouds' },
                    { [s.rain]: weatherInfo.weather[0].main === 'Rain' },
                    { [s.thunderstom]: weatherInfo.weather[0].main === 'Thunderstorm' },
                    { [s.snow]: weatherInfo.weather[0].main === 'Snow' },
                    { [s.mist]: weatherInfo.weather[0].main === 'Mist' || weatherInfo.weather[0].main === 'Fog' },
                )}>
                    <div>
                        <h4 className={s.weather_city}>{weatherInfo.name},{weatherInfo.sys.country}</h4>
                        {weatherInfo.weather[0].main === 'Clear' &&
                            <div className={s.weather_visualInfo}>
                                <p className={s.weather_desc}>{weatherInfo.weather[0].description}</p>
                                <img src={Sun} alt='sun'></img>
                            </div>}
                        {weatherInfo.weather[0].main === 'Clouds' &&
                            <div className={s.weather_visualInfo}>
                                <p className={s.weather_desc}>{weatherInfo.weather[0].description}</p>
                                <img src={Clouds} alt='clouds'></img>
                            </div>}
                        {weatherInfo.weather[0].main === 'Rain' &&
                            <div className={s.weather_visualInfo}>
                                <p className={s.weather_desc}>{weatherInfo.weather[0].description}</p>
                                <img src={Rain} alt='rain'></img>
                            </div>}
                        {weatherInfo.weather[0].main === 'Snow' &&
                            <div className={s.weather_visualInfo}>
                                <p className={s.weather_desc}>{weatherInfo.weather[0].description}</p>
                                <img src={Snow} alt='snow'></img>
                            </div>}
                        {weatherInfo.weather[0].main === 'Mist' &&
                            <div className={s.weather_visualInfo}>
                                <p className={s.weather_desc}>{weatherInfo.weather[0].description}</p>
                                <img src={Mist} alt='mist'></img>
                            </div>}
                        {weatherInfo.weather[0].main === 'Fog' &&
                            <div className={s.weather_visualInfo}>
                                <p className={s.weather_desc}>{weatherInfo.weather[0].description}</p>
                                <img src={Mist} alt='mist'></img>
                            </div>}
                        {weatherInfo.weather[0].main === 'Thunderstorm' &&
                            <div className={s.weather_visualInfo}>
                                <p className={s.weather_desc}>{weatherInfo.weather[0].description}</p>
                                <img src={Thunderstorm} alt='rain'></img>
                            </div>}
                        <div className={s.weather_info}>
                            <h4>{Math.round(weatherInfo.main.temp)}&#8451;</h4>
                            <p>Вітер: {weatherInfo.wind.speed}м/c</p>
                            <p>Вологість: {weatherInfo.main.humidity}%</p>
                            <div>
                                <p>Відчувається як: {Math.round(weatherInfo.main.feels_like)}&#8451;</p>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}


export default WeatherBlock