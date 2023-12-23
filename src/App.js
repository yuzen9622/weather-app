
import './App.css';

import Weathereport from './Weathereport';
import YourComponent from './time';
import rainimg from './濕度.png';
import windimg from './wind-removebg-preview.png'
import { useState, useEffect } from 'react';
import WeatherIcon from './weathericon';
import sunriseAndSunsetData from './sunrise-sunset.json';
function WeatherApp() {
  const [Stations, Setstation] = useState('');
  const [locations, Setlocation] = useState('臺北市');
  const [arrray, setarray] = useState('臺北市')
  const getMoment = (locationName) => {
    // STEP 2：從日出日落時間中找出符合的地區
    const location = sunriseAndSunsetData.find(
      (data) => data.locationName === locationName
    );

    // STEP 3：找不到的話則回傳 null
    if (!location) return null;

    // STEP 4：取得當前時間
    const now = new Date();

    // STEP 5：將當前時間以 "2019-10-08" 的時間格式呈現
    const nowDate = Intl.DateTimeFormat('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
      .format(now)
      .replace(/\//g, '-');

    // STEP 6：從該地區中找到對應的日期
    const locationDate =
      location.time && location.time.find((time) => time.dataTime === nowDate);

    // STEP 7：將日出日落以及當前時間轉成時間戳記（TimeStamp）
    const sunriseTimestamp = new Date(
      `${locationDate.dataTime} ${locationDate.sunrise}`
    ).getTime();
    const sunsetTimestamp = new Date(
      `${locationDate.dataTime} ${locationDate.sunset}`
    ).getTime();
    const nowTimeStamp = now.getTime();

    // STEP 8：若當前時間介於日出和日落中間，則表示為白天，否則為晚上
    return sunriseTimestamp <= nowTimeStamp && nowTimeStamp <= sunsetTimestamp
      ? 'day'
      : 'night';
  };
  const [weather, setWeather] = useState({
    location: "",
    temputure: 0,
    temputure_max: 0,
    temputure_min: 0,
    wind: 0,
    rain: 0
  })

  const [forestweather, Setforrestweather] = useState({
    img: '',
    statue: '',
    temputure_max: 0,
    temputure_min: 0,
  })

  const getstation = (e) => {
    var selectedValue = e.target.value;

    Setstation((item[selectedValue].id));
    Setlocation((item[selectedValue].where))
    forweather(item[selectedValue].where);
    handle((item[selectedValue].id));
    setarray(item[selectedValue].loca)
  }

  const handle = (loca) => {
    var url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWA-751D24F0-D79C-41B7-80EF-94428EC62091&format=JSON&StationId=${loca}`;

    fetch(url).then((response) => response.json())
      .then((data) => {

        setWeather({
          location: data.records.Station[0].StationName,
          temputure: data.records.Station[0].WeatherElement.AirTemperature,
          wind: data.records.Station[0].WeatherElement.WindSpeed,
          rain: data.records.Station[0].WeatherElement.RelativeHumidity,
          temputure_max: data.records.Station[0].WeatherElement.DailyExtreme.DailyHigh.TemperatureInfo.AirTemperature,
          temputure_min: data.records.Station[0].WeatherElement.DailyExtreme.DailyLow.TemperatureInfo.AirTemperature,

        })

        console.log('data', data.records.Station[0].WeatherElement.AirTemperature)

      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }
  const forweather = (location) => {
    var locaurl = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-751D24F0-D79C-41B7-80EF-94428EC62091&locationName=${location}`
    fetch(locaurl).then((res) => res.json())
      .then((data) => {
        var imgnub = data.records.location[0].weatherElement[0].time[0].parameter.parameterValue
        const statue = data.records.location[0].weatherElement[0].time[0].parameter.parameterName
        const temp_max = data.records.location[0].weatherElement[4].time[0].parameter.parameterName
        const temp_min = data.records.location[0].weatherElement[2].time[0].parameter.parameterName
        console.log(imgnub)
        Setforrestweather({
          statue: statue,
          img: imgnub,
          temputure_max: temp_max,
          temputure_min: temp_min
        })

      })
  }
  const moment = getMoment(locations);
  useEffect(() => {

    var url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWA-751D24F0-D79C-41B7-80EF-94428EC62091&format=JSON&StationId=466920`
    fetch(url).then((response) => response.json())
      .then((data) => {
        setWeather({
          location: data.records.Station[0].StationName,
          temputure: data.records.Station[0].WeatherElement.AirTemperature,
          temputure_max: data.records.Station[0].WeatherElement.DailyExtreme.DailyHigh.TemperatureInfo.AirTemperature,
          temputure_min: data.records.Station[0].WeatherElement.DailyExtreme.DailyLow.TemperatureInfo.AirTemperature,
          wind: data.records.Station[0].WeatherElement.WindSpeed,
          rain: data.records.Station[0].WeatherElement.RelativeHumidity
        })

        console.log('data', data.records.Station[0].WeatherElement.AirTemperature)

      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
    forweather(item[0].where)

  }, [])
  const item = [
    { id: 466920, where: "臺北市", loca: "taipei" },
    { id: 466881, where: "新北市", loca: "chungho" },
    { id: 466940, where: "基隆市", loca: "Keelung" },
    { id: 466990, where: "花蓮縣", loca: "hualien" },
    { id: 467080, where: "宜蘭縣", loca: "ilan" },
    { id: 467110, where: "金門縣", loca: "24.46285,118.44444" },
    { id: 467410, where: "臺南市", loca: "tainan" },
    { id: 467571, where: "新竹市", loca: "hsinchu" },
    { id: 467490, where: "臺中市", loca: 'taichung' },
    { id: 466881, where: "新北市" },
    { id: 466881, where: "新北市" },
    { id: 466881, where: "新北市" },
    { id: 466881, where: "新北市" },
    { id: 466881, where: "新北市" }
  ]



  return (

    <>
      <div className='card'>
        <div className='location'>
          <select id='location' onChange={getstation}>


            <option key={item[0].where} value={0}>台北</option>

            <option value={1}>新北</option>
            <option value={2}>基隆</option>
            <option value={3}>花蓮</option>
            <option value={4}>宜蘭</option>
            <option value={5}>金門</option>

            <option value={6}>臺南</option>

            <option value={7}>新竹</option>
            <option value={8}>台中</option>


          </select>
          <YourComponent />
          <p>{forestweather.statue}</p>
        </div>
        <div className='weather'>
          <h2>{weather.temputure}<span>°C</span></h2>
          <WeatherIcon moment={moment} currentWeatherCode={forestweather.img} />
        </div>
        <div className='temprature'><p>最高:{weather.temputure_max}° 最低:{weather.temputure_min}°</p></div>
        <div className='wind-card'>
          <div className='wind'>
            <img src={windimg} alt="wind-pic" />
            <p>{weather.wind}m/s</p>
          </div>
          <div className='wind'>
            <img src={rainimg} alt="wind-pic" />
            <p>{weather.rain}%</p>
          </div>
          <button type='button' onClick={() => handle(Stations)}><i class="fa-solid fa-rotate-right"></i></button>
        </div>

      </div >
      <Weathereport enlocation={arrray} twlocation={locations} />
    </>
  )
}

export default WeatherApp;
