import React from "react";
import styled from '@emotion/styled';
import { useEffect, useState } from "react";
import { ReactComponent as DayThunderstorm } from './images/day-thunderstorm.svg';
import { ReactComponent as DayClear } from './images/day-clear.svg';
import { ReactComponent as DayCloudyFog } from './images/day-cloudy-fog.svg';
import { ReactComponent as DayCloudy } from './images/day-cloudy.svg';
import { ReactComponent as DayFog } from './images/day-fog.svg';
import { ReactComponent as DayPartiallyClearWithRain } from './images/day-partially-clear-with-rain.svg';
import { ReactComponent as DaySnowing } from './images/day-snowing.svg';
import { ReactComponent as NightThunderstorm } from './images/night-thunderstorm.svg';
import { ReactComponent as NightClear } from './images/night-clear.svg';
import { ReactComponent as NightCloudyFog } from './images/night-cloudy-fog.svg';
import { ReactComponent as NightCloudy } from './images/night-cloudy.svg';
import { ReactComponent as NightFog } from './images/night-fog.svg';
import { ReactComponent as NightPartiallyClearWithRain } from './images/night-partially-clear-with-rain.svg';
import { ReactComponent as NightSnowing } from './images/night-snowing.svg';
const weatherTypes = {
    isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
    isClear: [1],
    isCloudyFog: [25, 26, 27, 28],
    isCloudy: [2, 3, 4, 5, 6, 7],
    isFog: [24],
    isPartiallyClearWithRain: [
        8, 9, 10, 11, 12,
        13, 14, 19, 20, 29, 30,
        31, 32, 38, 39,
    ],
    isSnowing: [23, 37, 42],
};
const weatherIcons = {
    day: {
        isThunderstorm: <DayThunderstorm />,
        isClear: <DayClear />,
        isCloudyFog: <DayCloudyFog />,
        isCloudy: <DayCloudy />,
        isFog: <DayFog />,
        isPartiallyClearWithRain: <DayPartiallyClearWithRain />,
        isSnowing: <DaySnowing />,
    },
    night: {
        isThunderstorm: <NightThunderstorm />,
        isClear: <NightClear />,
        isCloudyFog: <NightCloudyFog />,
        isCloudy: <NightCloudy />,
        isFog: <NightFog />,
        isPartiallyClearWithRain: <NightPartiallyClearWithRain />,
        isSnowing: <NightSnowing />,
    },
};



const DayWeatherIcon = ({ currentWeatherCode, moment }) => {
    const [currentWeatherIcon, setCurrentWeatherIcon] = useState('isClear');

    useEffect(() => {
        // STEP 2：因為 weatherCode2Type 方法沒有要覆用，直接放到 `useEffect` 內即可
        const weatherCode2Type = weatherCode =>
            Object.entries(weatherTypes).reduce(
                (currentWeatherType, [weatherType, weatherCodes]) =>
                    weatherCodes.includes(Number(weatherCode))
                        ? weatherType
                        : currentWeatherType,
                '',
            );
        const currentWeatherIcon = weatherCode2Type(currentWeatherCode);

        // STEP 3：透過 `setCurrentWeatherIcon` 修改組件內的資料狀態
        setCurrentWeatherIcon(currentWeatherIcon);

        // STEP 4：...
    }, [currentWeatherCode]);

    return (
        weatherIcons[moment][currentWeatherIcon]
    );
};
export default DayWeatherIcon;