import React from 'react';
import s from './style.module.scss';
import cs from 'classnames';
import Sun from './../../img/sun.svg';
import Clouds from './../../img/clouds.svg';
import Rain from './../../img/rain.svg';
import Snow from './../../img/snow.svg';
import Mist from './../../img/mist.svg';
import Thunderstorm from './../../img/thunderstorm.svg';
import moment from 'moment';
import 'moment/locale/uk';



const data = moment().locale('uk').format('LL');

export default function WeatherBlock({ name, country, description, main, temp, wind, humidity, feels_like }) {

    return (
        < div className={cs(s.weatherBlock,
            { [s.clearSky]: main === 'Clear' },
            { [s.clearSky]: main === 'Clear' },
            { [s.clouds]: main === 'Clouds' },
            { [s.rain]: main === 'Rain' },
            { [s.thunderstorm]: main === 'Thunderstorm' },
            { [s.snow]: main === 'Snow' },
            { [s.mist]: main === 'Mist' || main === 'Fog' },
        )}>
            <div>
                <h4 className={s.weather_city}>{name},{country}</h4>
                <h2 className={s.weather_data}>{data}</h2>
                {main === 'Clear' &&
                    <div className={s.weather_visualInfo}>
                        <p className={s.weather_desc}>{description}</p>
                        <img src={Sun} alt='sun'></img>
                    </div>}
                {main === 'Clouds' &&
                    <div className={s.weather_visualInfo}>
                        <p className={s.weather_desc}>{description}</p>
                        <img src={Clouds} alt='clouds'></img>
                    </div>}
                {main === 'Rain' &&
                    <div className={s.weather_visualInfo}>
                        <p className={s.weather_desc}>{description}</p>
                        <img src={Rain} alt='rain'></img>
                    </div>}
                {main === 'Snow' &&
                    <div className={s.weather_visualInfo}>
                        <p className={s.weather_desc}>{description}</p>
                        <img src={Snow} alt='snow'></img>
                    </div>}
                {main === 'Mist' &&
                    <div className={s.weather_visualInfo}>
                        <p className={s.weather_desc}>{description}</p>
                        <img src={Mist} alt='mist'></img>
                    </div>}
                {main === 'Fog' &&
                    <div className={s.weather_visualInfo}>
                        <p className={s.weather_desc}>{description}</p>
                        <img src={Mist} alt='mist'></img>
                    </div>}
                {main === 'Thunderstorm' &&
                    <div className={s.weather_visualInfo}>
                        <p className={s.weather_desc}>{description}</p>
                        <img src={Thunderstorm} alt='thunderstorm'></img>
                    </div>}
                <div className={s.weather_info}>
                    <h4>{Math.round(temp)}&#8451;</h4>
                    <p>Вітер: {wind}м/c</p>
                    <p>Вологість: {humidity}%</p>
                    <div>
                        <p>Відчувається як: {Math.round(feels_like)}&#8451;</p>
                    </div>
                </div>
            </div>
        </div >)
}
