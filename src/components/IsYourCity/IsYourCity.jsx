import React from 'react';
import s from "./IsYourCity.module.css";

const IsYourCity = ({show = false, setShow, findAnotherCity}) => {

    return (
        <div className={`${show ? s.show : s.hide} ${s.modal}`}>
            <h3>Это ваш город?</h3>
            <div className={s.btns}>
                <button className={s.yes} onClick={() => {setShow(false)}}>Да</button>
                <button className={s.find_another} onClick={() => {findAnotherCity()}}>Найти другой</button>
            </div>
        </div>
    );
};

export default IsYourCity;