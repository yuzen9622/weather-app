import "./Weathereport.css";
import DayWeatherIcon from "./dayweathericon";
import Dayweather from "./dayweather";
import { useEffect, useState } from "react";
import Threehour from "./hour3";
const Weathereport = ({ locationid, twlocation, townlocation }) => {
  const [locationname, setlocaton] = useState([]);
  const [Town, seTown] = useState("");
  useEffect(() => {}, [locationid]);
  return (
    <div className="weather-report">
      <h1>{twlocation}</h1>

      <div className="h36weather">
        <div className="day3weather">
          <div className="title">
            <h3>{townlocation}逐1小時天氣</h3>
          </div>
          <div className="day-weather">
            <Threehour
              location={locationid}
              town={townlocation}
              twlocation={twlocation}
            />
          </div>
        </div>

        <div className="dayweather">
          <div className="title">
            <h3>36小時天氣預報</h3>
          </div>
          <div className="day-weather">
            <Dayweather enlocation={twlocation} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Weathereport;
