
import './App.css';

import Weathereport from './Weathereport';
import YourComponent from './time';
import rainimg from './濕度.png';
import windimg from './wind-removebg-preview.png'
import { useState, useEffect } from 'react';
import WeatherIcon from './weathericon';
import sunriseAndSunsetData from './sunrise-sunset.json';
function WeatherApp() {
  const [locationname, setlocaton] = useState([]);
  const [Stations, Setstation] = useState('');
  const [locations, Setlocation] = useState('臺北市');
  const [arrray, setarray] = useState('F-D0047-061');
  const [Town, setTown] = useState('南港區');

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
    temputure: 0,
    AT: 0,
    wind: 0,
    rain: 0,
    img: '',
    statue: '',
    updateT: ""
  })

  const [forestweather, Setforrestweather] = useState({
    img: '',
    temputure_max: 0,
    temputure_min: 0,
  })

  const getstation = (e) => {
    var selectedValue = e.target.value;


    Setlocation((item[selectedValue].where))

    forweather(item[selectedValue].where);
    setarray(item[selectedValue].loca);
    getown(item[selectedValue].loca);

    document.getElementById("secondSelect").value = '0'
  }
  const gettown = (e) => {
    var selectedValue = e.target.value;
    setTown(locationname[selectedValue].loca)
    getownweather(arrray, locationname[selectedValue].loca, moment)

  }
  const handle = () => {
    getownweather(arrray, Town, moment)
  }
  const forweather = (location) => {
    var locaurl = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-751D24F0-D79C-41B7-80EF-94428EC62091&locationName=${location}`
    fetch(locaurl).then((res) => res.json())
      .then((data) => {
        var imgnub = data.records.location[0].weatherElement[0].time[0].parameter.parameterValue

        const temp_max = data.records.location[0].weatherElement[4].time[0].parameter.parameterName
        const temp_min = data.records.location[0].weatherElement[2].time[0].parameter.parameterName

        Setforrestweather({
          img: imgnub,
          temputure_max: temp_max,
          temputure_min: temp_min
        })

      })
  }

  const getown = (locations) => {
    const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWA-751D24F0-D79C-41B7-80EF-94428EC62091&locationId=${locations}`;
    var location = [];
    fetch(url).then((res) => res.json())
      .then((data) => {
        var alllocation = data.records.locations[0].location.length;

        for (var i = 0; i < alllocation; i++) {
          location.push({
            loca: data.records.locations[0].location[i].locationName,
            value: i
          })
        }
        getownweather(locations, location[0].loca, moment)
        setTown(location[0].loca)
        setlocaton(location)



      })
  }
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  function formatDate(date) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }


  const getownweather = (location, town, moment) => {
    const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWA-751D24F0-D79C-41B7-80EF-94428EC62091&locationId=${location}&locationName=${town}`;

    fetch(url).then((res) => res.json())
      .then((data) => {
        var t = 0

        var starttime = formatDate(new Date());
        var endtime = data.records.locations[0].location[0].weatherElement[3].time[1].dataTime
        if (Date.parse(starttime).valueOf() > Date.parse(endtime).valueOf()) {
          t = 1;
        }
        var datatime = data.records.locations[0].location[0].weatherElement[2].time[t].dataTime;
        datatime = new Date(datatime);
        var datatimes = datatime.getHours() + ":00"
        setWeather({
          temputure: data.records.locations[0].location[0].weatherElement[3].time[t].elementValue[0].value,
          AT: data.records.locations[0].location[0].weatherElement[2].time[t].elementValue[0].value,
          wind: data.records.locations[0].location[0].weatherElement[8].time[t].elementValue[0].value,
          rain: data.records.locations[0].location[0].weatherElement[4].time[t].elementValue[0].value,
          img: `https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${moment}/${data.records.locations[0].location[0].weatherElement[1].time[t].elementValue[1].value}.svg`,
          statue: data.records.locations[0].location[0].weatherElement[1].time[t].elementValue[0].value,
          updateT: datatimes
        })

      })
  }

  const moment = getMoment(locations);
  useEffect(() => {
    forweather(item[0].where)
    getown(arrray)
    getownweather(arrray, Town, moment)
  }, [])

  const item = [
    { where: "臺北市", loca: "F-D0047-061" },
    { where: "新北市", loca: "F-D0047-069" },
    { where: "基隆市", loca: "F-D0047-049" },
    { where: "花蓮縣", loca: "F-D0047-041" },
    { where: "宜蘭縣", loca: "F-D0047-001" },
    { where: "金門縣", loca: "F-D0047-085" },
    { where: "臺南市", loca: "F-D0047-077" },
    { where: "新竹縣", loca: "F-D0047-009" },
    { where: "臺中市", loca: 'F-D0047-073' },
    { where: "高雄市", loca: "F-D0047-065" },
    { where: "屏東縣", loca: "F-D0047-033" },
    { where: "嘉義市", loca: "F-D0047-009" },
    { where: "嘉義縣", loca: "F-D0047-009" },
    { where: "臺東縣", loca: "F-D0047-037" },
    { where: "桃園市", loca: "F-D0047-005" },
    { where: "南投縣", loca: "F-D0047-021" },
    { where: "彰化縣", loca: "F-D0047-019" },
    { where: "新竹市", loca: "F-D0047-053" },
    { where: "苗栗縣", loca: "F-D0047-013" },
    { where: "雲林縣", loca: "F-D0047-025" },
    { where: "澎湖縣", loca: "F-D0047-045" },
    { where: "連江縣", loca: "F-D0047-081" },
  ]



  return (

    <>
      <div className='card'>
        <div className='location'>
          <div className="select">
            <select id='location' onChange={getstation}>


              <option value={0} selected>臺北市</option>
              <option value={1}>新北市</option>
              <option value={2}>基隆市</option>
              <option value={3}>花蓮縣</option>
              <option value={4}>宜蘭縣</option>
              <option value={5}>金門縣</option>
              <option value={6}>臺南市</option>
              <option value={7}>新竹縣</option>
              <option value={8}>臺中市</option>
              <option value={9}>高雄市</option>
              <option value={10}>屏東縣</option>
              <option value={11}>嘉義市</option>
              <option value={12}>嘉義縣</option>
              <option value={13}>臺東縣</option>
              <option value={14}>桃園市</option>
              <option value={15}>南投縣</option>
              <option value={16}>彰化縣</option>
              <option value={17}>新竹市</option>
              <option value={18}>苗栗縣</option>
              <option value={19}>雲林縣</option>
              <option value={20}>澎湖縣</option>
              <option value={21}>連江縣</option>

            </select>
            <select name="" id='secondSelect' onChange={gettown}>
              {locationname.map((locat, index) => (

                <option key={index} selected={locat.value === 0} value={locat.value}>{locat.loca}</option>
              ))
              }
            </select>
          </div>
          <YourComponent />
          <p>{weather.statue}</p>
        </div>
        <div className='weather'>
          <h2>{weather.temputure}<span>°C</span></h2>
          <img className='wx' src={weather.img} alt="" />
        </div>


        <div className='wind-card'>
          <p>體感溫度:{weather.AT}°</p>
          <div className='wind'>

            <img src={windimg} alt="wind-pic" />
            <p>{weather.wind}m/s</p>
          </div>
          <div className='wind'>
            <img src={rainimg} alt="wind-pic" />
            <p>{weather.rain}%</p>
          </div>
          <div className="location"><p>更新時間:{weather.updateT}</p></div>
          <button type='button' onClick={handle}><i class="fa-solid fa-rotate-right"></i></button>
        </div>

      </div >
      <Weathereport locationid={arrray} twlocation={locations} townlocation={Town} />
    </>
  )
}

export default WeatherApp;
