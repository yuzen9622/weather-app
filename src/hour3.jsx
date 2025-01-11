import { useEffect, useState } from "react";

const Threehour = ({ location, town, twlocation }) => {
  const [weather, setWeather] = useState([]);

  function getMoment(date) {
    var time = new Date(date);
    time = time.getHours();

    return time > 12 ? "night" : "day";
  }
  function getDateToISO() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从 0 开始，需要加 1
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
  function getday(date) {
    var day = new Date(date).getDay();
    var day_list = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ];
    return day_list[day];
  }
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  const gethourweather = async () => {
    if (!town) return;
    try {
      const isoTime = getDateToISO();
      const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=${process.env.REACT_APP_API_KEY}&locationId=${location}&locationName=${town}&sort=time&timeFrom=${isoTime}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success === "true") {
        const weatherDatas = data.records.Locations[0].Location.find(
          (item) => item.LocationName === town
        );
        const moment = getMoment();

        const weathers = [];
        for (let i = 0; i < 13; i++) {
          const iconNumber = padTo2Digits(
            weatherDatas.WeatherElement[8].Time[i].ElementValue[0].WeatherCode
          );
          weathers.push({
            temputure:
              weatherDatas.WeatherElement[0].Time[i].ElementValue[0]
                .Temperature,
            AT: weatherDatas.WeatherElement[3].Time[i].ElementValue[0]
              .ApparentTemperature,
            wind: weatherDatas.WeatherElement[5].Time[i].ElementValue[0]
              .WindSpeed,
            rain: weatherDatas.WeatherElement[2].Time[i].ElementValue[0]
              .RelativeHumidity,
            statue:
              weatherDatas.WeatherElement[8].Time[i].ElementValue[0].Weather,
            img: `https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${moment}/${iconNumber}.svg `,
            time: weatherDatas.WeatherElement[0].Time[i].DataTime,
          });
        }

        setWeather(weathers);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    gethourweather();
  }, [town]);

  return (
    <>
      {weather.map((weaterItem, key) => (
        <div className="day" key={key}>
          <div className="day-hour">
            <p>
              {getday(weaterItem.time)}{" "}
              {new Intl.DateTimeFormat("zh-TW", {
                hour: "numeric",
                minute: "numeric",
              }).format(new Date(weaterItem.time))}
            </p>
            <img src={weaterItem.img} alt="" />
            <p>{weaterItem.statue}</p>
            <p>{weaterItem.temputure}°</p>
            <p>體感溫度:{weaterItem.AT}°</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Threehour;
