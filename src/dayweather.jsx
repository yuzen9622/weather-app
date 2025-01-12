import { useEffect, useState } from "react";
import "./dayweather.css";
import { api_url, getMoment } from "./service";
const Dayweather = ({ enlocation }) => {
  const [dayweather, Setdayweather] = useState([]);

  function getdayapi(location) {
    const hourweather = [];
    const url = `${api_url}/F-C0032-001?Authorization=CWA-751D24F0-D79C-41B7-80EF-94428EC62091&locationName=${location}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < 3; i++) {
          var imgstatue =
            data.records.location[0].weatherElement[0].time[i].parameter
              .parameterValue;
          if (imgstatue - 10 < 0) {
            imgstatue = "0" + imgstatue;
          }
          var moment = getMoment(
            data.records.location[0].weatherElement[4].time[i].startTime
          );
          hourweather.push({
            time: data.records.location[0].weatherElement[4].time[i].startTime,
            maxtmp:
              data.records.location[0].weatherElement[4].time[i].parameter
                .parameterName,
            mintmp:
              data.records.location[0].weatherElement[2].time[i].parameter
                .parameterName,
            img: `https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${moment}/${imgstatue}.svg`,
            rain: data.records.location[0].weatherElement[1].time[i].parameter
              .parameterName,

            statue:
              data.records.location[0].weatherElement[3].time[i].parameter
                .parameterName,
          });
        }

        Setdayweather(hourweather);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }
  const formattime = (data) => {
    const date = new Date();
    var nub = date.getDay();
    var now = "";
    var nowtime = "";

    var time = new Date(data);
    var statue = time;
    time = time.getDay();
    statue = statue.getHours();
    if (time > nub) {
      now = "明日";
    } else {
      now = "今日";
    }
    if (statue - 12 > 0) {
      nowtime = "晚上";
    } else {
      nowtime = "白天";
    }
    time = now + nowtime;

    return time;
  };
  formattime("2023-12-27 18:00:00");
  useEffect(() => {
    getdayapi(enlocation);
  }, [enlocation]);

  return (
    <>
      {dayweather.map((weather, key) => (
        <div className="day" key={key}>
          <div className="day-hour">
            <p>{formattime(weather.time)}</p>
            <img src={weather.img} alt="" />
            <p>
              <i class="fa-solid fa-umbrella"></i>:{weather.rain}%
            </p>
            <p>{weather.statue}</p>
            <p>
              {" "}
              {weather.mintmp}-{weather.maxtmp}°C
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Dayweather;
