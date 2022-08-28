import {useEffect, useState} from 'react';
import s from "./WeatherInfo.module.css";
import bg from "../../img/bgmap.jpg";

const WeatherInfo = ({currentCity}) => {
    const [weatherData, setWeatherData] = useState(null);

    const getWeatherData = async () => {
        const lat = currentCity.lat;
        const lon = currentCity.lon;

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${'f2cdd3956d508031df218f033fcc8965'}&lang=ru&units=metric`);
        const json = await response.json();

        console.log("данные о погоде", json);
        setWeatherData(json);
    };

    useEffect(() => {
        getWeatherData();
    }, [currentCity]);

    const date = new Date();

    return (
        <div className={s.data_container}>
            {
                weatherData
                ?   <div className={s.container} style={{backgroundImage: `url(${bg}`}}>
                        <h3>{date.getUTCDate()}.{date.getUTCMonth() + 1}.{date.getFullYear()}, {date.getHours()}:{date.getMinutes()}</h3>
                        <h1>{weatherData.name} ({weatherData.sys.country})</h1>
                        <div className={s.main_info}>
                            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weatherIcon"/>
                            <p className={s.desc}>{Math.round(weatherData.main.temp)} &#176;C, <i>{weatherData.weather[0].description}</i></p>
                        </div>
                        <div className={s.weather_list_container}>
                            <ul className={s.weather_list}>
                                <li>Ощущается как <strong>{Math.round(weatherData.main.feels_like)} &#176;C</strong></li>
                                <li>Мин. темп. <strong>{Math.round(weatherData.main.temp_min)} &#176;C</strong></li>
                                <li>Макс. темп. <strong>{Math.round(weatherData.main.temp_max)} &#176;C</strong></li>
                                <li>Давление <strong>{weatherData.main.pressure} мм рт. ст.</strong></li>
                                <li>Влажность <strong>{weatherData.main.humidity}%</strong></li>
                                <li>Ветер <strong>{weatherData.wind.speed}м/c</strong></li>
                            </ul>
                        </div>
                    </div>
                : <div className={s.load}>Загрузка</div>
            }
        </div>
    );
};

export default WeatherInfo;