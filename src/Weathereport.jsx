import './Weathereport.css'
import DayWeatherIcon from './dayweathericon';
import Dayweather from './dayweather';
import { useEffect } from 'react';
const Weathereport = ({ enlocation, twlocation }) => {

    return (
        <div className="weather-report">
            <h1>{twlocation}</h1>
            <div className="title">
                <h3>今日天氣預報</h3>
                <hr />
            </div>
            <div className="dayweather">

                <div className="day-weather">
                    <Dayweather enlocation={enlocation} twlocation={twlocation} />
                </div>
            </div>
            <div className="3dayweather">

            </div>
        </div>
    )


}
export default Weathereport;