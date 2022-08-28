import {useState, forwardRef} from "react";
import s from "./SearchCity.module.css"

const SearchCity = forwardRef(({selectCity}, ref) => {
    const [foundCities, setFoundCities] = useState([]);

    const getCities = async (e) => {
        const cityName = e.target.value;

        if (!cityName) {
            setFoundCities([]);
            return;
        }

        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${'f2cdd3956d508031df218f033fcc8965'}`);
        let json = await response.json();

        console.log("найденные города", json);

        setFoundCities(json);
    };

    const onClickHandler = (city) => {
        selectCity(city);
        ref.current.value = '';
        setFoundCities([]);
    };

    return (
        <div className={s.container}>
            <label className={s.label}>
                <p>Введите название города:</p>
                <input className={s.main_input} ref={ref} onChange={getCities} type="text"/>
            </label>
            <ul className={s.cities_container} style={{display: ref?.current?.value.length > 0 ? 'block' : 'none'}}>
                {
                    foundCities.length
                        ? foundCities.map((city) => (
                            <li
                                onClick={() => {onClickHandler(city)}}
                                key={`${city.name}${city.lat}${city.lon}`}
                                className={s.city_item}
                            >
                                {city.name} ({city.country})
                            </li>)
                        )
                        : ""
                }
            </ul>
        </div>
    );
});

export default SearchCity;