import { useEffect, useState } from "react"
import sunriseAndSunsetData from './sunrise-sunset.json';

const Threehour = ({ location, town, twlocation }) => {

    const [weather, setWeather] = useState([]);

    function getMoment(date) {
        var time = new Date(date);
        time = time.getHours();
        return (time > 12) ? "night" : "day"
    }

    function getday(date) {
        var day = new Date(date).getDay();
        var day_list = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        return day_list[day];
    }

    const getMoments = (locationName, date) => {
        // STEP 2：從日出日落時間中找出符合的地區
        const location = sunriseAndSunsetData.find(
            (data) => data.locationName === locationName
        );

        // STEP 3：找不到的話則回傳 null
        if (!location) return null;

        // STEP 4：取得當前時間
        const now = new Date(date);

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

    const gethourweather = (location, town, twlocation) => {
        var url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWA-751D24F0-D79C-41B7-80EF-94428EC62091&locationId=${location}&locationName=${town}`;
        fetch(url).then((res) => res.json())
            .then((data) => {
                var t = 0


                var weather = [];
                console.log(data.records.locations[0].location[0].weatherElement[3].time[0].elementValue[0].value)
                for (var i = t; i < 12; i++) {
                    var moment = getMoment(twlocation, data.records.locations[0].location[0].weatherElement[3].time[i].dataTime)
                    weather.push({

                        temputure: data.records.locations[0].location[0].weatherElement[3].time[i].elementValue[0].value,
                        AT: data.records.locations[0].location[0].weatherElement[2].time[i].elementValue[0].value,
                        img: `https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${moment}/${data.records.locations[0].location[0].weatherElement[1].time[i].elementValue[1].value}.svg`,
                        statue: data.records.locations[0].location[0].weatherElement[1].time[i].elementValue[0].value + "  " + data.records.locations[0].location[0].weatherElement[5].time[i].elementValue[1].value,
                        time: data.records.locations[0].location[0].weatherElement[3].time[i].dataTime
                    })
                }
                setWeather(weather);

            })
            .catch((err) => console.error('Error fetching weather data:', err))
    }



    useEffect(() => {
        gethourweather(location, town, twlocation);
    }, [town]);


    return (
        <>
            {weather.map((weather, key) => (
                <div className="day" key={key}>

                    <div className='day-hour' >
                        <p>{getday(weather.time)} {new Intl.DateTimeFormat('zh-TW', {
                            hour: 'numeric',
                            minute: 'numeric',

                        }).format(new Date(weather.time))}</p>
                        <img src={weather.img} alt="" />
                        <p>{weather.statue}</p>
                        <p>{weather.temputure}°</p>
                        <p>體感溫度:{weather.AT}°</p>
                    </div>

                </div>
            ))}
        </>
    )
}

export default Threehour;