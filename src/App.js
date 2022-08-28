import {useEffect, useRef, useState} from "react";
import "./main.css";
import SearchCity from "./components/SearchCity/SeacrhCity";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import IsYourCity from "./components/IsYourCity/IsYourCity";

function App() {
    const [currentCity, setCurrentCity] = useState(undefined);
    const [showModalIsYourCity, setShowModalIsYourCity] = useState(false);
    const [cityIsChanged, setCityIsChanged] = useState(false);

    const selectCity = (city) => {
        console.log("выбор города", city);
        setCurrentCity(city);
        setCityIsChanged(true);
    };

    const searchCityInput = useRef();

    const findAnotherCity = () => {
        setShowModalIsYourCity(false);
        console.log("Найти другой город");
        searchCityInput.current.focus();
    };

    useEffect(() => {
    navigator.geolocation.getCurrentPosition((geoData) => {
        const lat = geoData.coords.latitude;
        const lon = geoData.coords.longitude;

        fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${'f2cdd3956d508031df218f033fcc8965'}`)
            .then((res) => res.json())
            .then(json => {
                console.log("автоматическое определение города", json[0]);
                setCurrentCity(json[0]);
                setShowModalIsYourCity(true);
            });
    }, err => {
        console.log(err);
        if (err.code == 1) {
            alert("Включите геолокацию и перезагрузите приложение")
        }
    });
    }, []);

    useEffect(() => {
        if (cityIsChanged) {
            setShowModalIsYourCity(false);
            console.log("убрать модалку, потому что город сменили");
        }
    }, [currentCity]);

    return (
    <div className="App">
      <SearchCity ref={searchCityInput} selectCity={selectCity} />
        {
            currentCity
            ? <WeatherInfo currentCity={currentCity}/>
            : <div>Пусто</div>
        }
        <IsYourCity show={showModalIsYourCity} setShow={setShowModalIsYourCity} findAnotherCity={findAnotherCity}/>
    </div>
    );
}

export default App;
