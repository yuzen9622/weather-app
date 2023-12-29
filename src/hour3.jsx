import { useEffect, useState } from "react"


const Threehour = ({ location, town }) => {

    const [weather, setWeather] = useState([]);

    function getMoment(date) {
        var time = new Date(date);
        time = time.getHours();
        return (time > 12) ? "night" : "day"
    }

    const gethourweather = (location, town) => {
        var url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWA-751D24F0-D79C-41B7-80EF-94428EC62091&locationId=${location}&locationName=${town}`;
        fetch(url).then((res) => res.json())
            .then((data) => {
                var t = 0


                var weather = [];
                console.log(data.records.locations[0].location[0].weatherElement[3].time[0].elementValue[0].value)
                for (var i = t; i < 12; i++) {
                    var moment = getMoment(data.records.locations[0].location[0].weatherElement[3].time[i].dataTime)
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
        gethourweather(location, town);
    }, [town]);


    return (
        <>
            {weather.map((weather, key) => (
                <div className="day" key={key}>

                    <div className='day-hour' >
                        <p>{new Intl.DateTimeFormat('zh-TW', {
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