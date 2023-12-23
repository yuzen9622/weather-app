import { useEffect, useState } from 'react'
import './dayweather.css'

const Dayweather = ({ enlocation }) => {
    const [dayweather, Setdayweather] = useState([]);

    function getdayapi(location) {
        const hourweather = []
        const url = `https://api.weatherapi.com/v1/forecast.json?key=120fab63a73d40e883f90124232312&q=${location}&days=1`;
        fetch(url).then((res) => res.json())
            .then((data) => {
                const hour = new Date().getHours();
                console.log(hour)

                for (var i = hour; i < 24; i++) {
                    hourweather.push({
                        time: data.forecast.forecastday[0].hour[i].time,
                        temp: data.forecast.forecastday[0].hour[i].temp_c,
                        img: `https:${data.forecast.forecastday[0].hour[i].condition.icon}`
                    })

                }

                Setdayweather(hourweather)
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error);
            });

    }
    useEffect(() => {

        getdayapi(enlocation)
    }, [enlocation])
    console.log(dayweather)
    return (
        <>

            <div className="day">
                {Array.isArray(dayweather) ? (
                    dayweather.map((hourData, index) => (
                        <div className='day-hour' key={index}>
                            <p>{new Intl.DateTimeFormat('zh-TW', {
                                hour: 'numeric',
                                minute: 'numeric',
                            }).format(new Date(hourData.time))}</p>
                            <p>{hourData.temp}°</p>
                            <img src={hourData.img} alt="" />
                        </div>
                    ))
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>

        </>

    )
}

export default Dayweather;