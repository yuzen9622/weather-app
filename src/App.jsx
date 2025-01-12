import "./App.css";
import Weathereport from "./Weathereport";
import YourComponent from "./time";
import rainimg from "./濕度.png";
import windimg from "./wind-removebg-preview.png";
import { useState, useEffect, useRef, useCallback } from "react";
import Threehour from "./hour3";
import Dayweather from "./dayweather";
import {
  api_url,
  formatDate,
  getDateToISO,
  getMoment,
  padTo2Digits,
} from "./service";
const item = [
  { locaName: "臺北市", locaId: "F-D0047-061", town: "" },
  { locaName: "新北市", locaId: "F-D0047-069", town: "" },
  { locaName: "基隆市", locaId: "F-D0047-049", town: "" },
  { locaName: "花蓮縣", locaId: "F-D0047-041", town: "" },
  { locaName: "宜蘭縣", locaId: "F-D0047-001", town: "" },
  { locaName: "金門縣", locaId: "F-D0047-085", town: "" },
  { locaName: "臺南市", locaId: "F-D0047-077", town: "" },
  { locaName: "新竹縣", locaId: "F-D0047-009", town: "" },
  { locaName: "臺中市", locaId: "F-D0047-073", town: "" },
  { locaName: "高雄市", locaId: "F-D0047-065", town: "" },
  { locaName: "屏東縣", locaId: "F-D0047-033", town: "" },
  { locaName: "嘉義市", locaId: "F-D0047-009", town: "" },
  { locaName: "嘉義縣", locaId: "F-D0047-009", town: "" },
  { locaName: "臺東縣", locaId: "F-D0047-037", town: "" },
  { locaName: "桃園市", locaId: "F-D0047-005", town: "" },
  { locaName: "南投縣", locaId: "F-D0047-021", town: "" },
  { locaName: "彰化縣", locaId: "F-D0047-019", town: "" },
  { locaName: "新竹市", locaId: "F-D0047-053", town: "" },
  { locaName: "苗栗縣", locaId: "F-D0047-013", town: "" },
  { locaName: "雲林縣", locaId: "F-D0047-025", town: "" },
  { locaName: "澎湖縣", locaId: "F-D0047-045", town: "" },
  { locaName: "連江縣", locaId: "F-D0047-081", town: "" },
];
function WeatherApp() {
  const [location, setLocation] = useState(item[0]);
  const [Town, setTown] = useState([]);
  const [weather, setWeather] = useState({
    temputure: 0,
    AT: 0,
    wind: 0,
    rain: 0,
    img: "",
    statue: "",
    updateT: "",
  });
  const [forestweather, setforrestweather] = useState({
    img: "",
    temputure_max: 0,
    temputure_min: 0,
  });
  const locationSelect = useRef(null);
  const TownSelect = useRef(null);

  const forweather = (location) => {
    var locaurl = `${api_url}/F-C0032-001?Authorization=${process.env.REACT_APP_API_KEY}CWA-561CA377-6CE3-41EB-8FDE-7F87EE03D8C5&locationName=${location}`;
    fetch(locaurl)
      .then((res) => res.json())
      .then((data) => {
        var imgnub =
          data.records.location[0].weatherElement[0].time[0].parameter
            .parameterValue;

        const temp_max =
          data.records.location[0].weatherElement[4].time[0].parameter
            .parameterName;
        const temp_min =
          data.records.location[0].weatherElement[2].time[0].parameter
            .parameterName;

        setforrestweather({
          img: imgnub,
          temputure_max: temp_max,
          temputure_min: temp_min,
        });
      });
  };

  const getTown = async () => {
    try {
      const url = `${api_url}/F-D0047-093?Authorization=${process.env.REACT_APP_API_KEY}&locationId=${location.locaId}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.success === "true") {
        let locations = data?.records?.Locations[0]?.Location;
        locations = locations?.map((item) => {
          return item.LocationName;
        });

        setTown(locations);
        if (location.town === "") {
          setLocation((prev) => ({ ...prev, town: locations[0] }));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTownWeather = async () => {
    if (!location.town) return;
    try {
      const time = getDateToISO();
      const url = `${api_url}/F-D0047-093?Authorization=${process.env.REACT_APP_API_KEY}&locationId=${location.locaId}&locationName=${location.town}&sort=time&timeFrom=${time}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success === "true") {
        const weatherDatas = data.records.Locations[0].Location.find(
          (item) => item.LocationName === location.town
        );
        const moment = getMoment();
        const iconNumber = padTo2Digits(
          weatherDatas.WeatherElement[8].Time[0].ElementValue[0].WeatherCode
        );
        setWeather({
          temputure:
            weatherDatas.WeatherElement[0].Time[0].ElementValue[0].Temperature,
          AT: weatherDatas.WeatherElement[3].Time[0].ElementValue[0]
            .ApparentTemperature,
          wind: weatherDatas.WeatherElement[5].Time[0].ElementValue[0]
            .WindSpeed,
          rain: weatherDatas.WeatherElement[2].Time[0].ElementValue[0]
            .RelativeHumidity,
          img: `https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${moment}/${iconNumber}.svg `,
          updateT: weatherDatas.WeatherElement[0].Time[0].DataTime,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleLocationChange = useCallback(() => {
    setLocation(item[locationSelect.current.value]);
  }, []);
  const handleTownChange = useCallback(() => {
    setLocation((prevLocation) => ({
      ...prevLocation,
      town: TownSelect.current.value,
    }));
  }, []);
  useEffect(() => {
    if (locationSelect.current) {
      locationSelect.current.addEventListener("change", handleLocationChange);
    }
    if (TownSelect.current) {
      TownSelect.current.addEventListener("change", handleTownChange);
    }
  }, [TownSelect, locationSelect]);

  useEffect(() => {
    getTown();
    getTownWeather();
  }, [location]);

  return (
    <>
      <div className="card">
        <div className="location">
          <div className="select">
            <select id="location" ref={locationSelect}>
              {item.map((locationItem, key) => (
                <option
                  value={key}
                  selected={locationItem === location.locaName}
                >
                  {locationItem.locaName}
                </option>
              ))}
            </select>
            <select name="" id="secondSelect" ref={TownSelect}>
              {Town &&
                Town.map((locations, index) => (
                  <option
                    key={index}
                    selected={locations === location.town}
                    value={locations}
                  >
                    {locations}
                  </option>
                ))}
            </select>
          </div>
          <YourComponent />
          <p>{weather.statue}</p>
        </div>
        <div className="weather">
          <h2>
            {weather.temputure}
            <span>°C</span>
          </h2>
          <img className="wx" src={weather.img} alt="" />
        </div>

        <div className="wind-card">
          <p>體感溫度:{weather.AT}°</p>
          <div className="wind">
            <img src={windimg} alt="wind-pic" />
            <p>{weather.wind}m/s</p>
          </div>
          <div className="wind">
            <img src={rainimg} alt="wind-pic" />
            <p>{weather.rain}%</p>
          </div>
          <div className="h36weather">
            <div className="day3weather">
              <div className="title">
                <h3>{location.town}逐3小時天氣</h3>
              </div>
              <div className="day-weather">
                <Threehour
                  location={location.locaId}
                  town={location.town}
                  twlocation={location.locaName}
                />
              </div>
            </div>

            <div className="dayweather">
              <div className="title">
                <h3>36小時天氣預報</h3>
              </div>
              <div className="day-weather">
                <Dayweather enlocation={location.locaName} />
              </div>
            </div>
          </div>
          <div className="location">
            <p>更新時間:{formatDate(weather.updateT)}</p>
          </div>
          <button type="button" onClick={getTownWeather}>
            <i class="fa-solid fa-rotate-right"></i>
          </button>
        </div>
      </div>

      <Weathereport
        locationid={location.locaId}
        twlocation={location.locaName}
        townlocation={location.town}
      />
    </>
  );
}

export default WeatherApp;
