import React, { useEffect, useState } from 'react';

const YourComponent = () => {
    const [currentTime, setCurrentTime] = useState('');

    const getFormattedTime = () => {
        return new Intl.DateTimeFormat('zh-TW', {
            hour: 'numeric',
            minute: 'numeric',
        }).format(new Date());
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(getFormattedTime());
        }, 1000);

        // Cleanup the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);

    return (
        <p>{currentTime}</p>
    );
};

export default YourComponent;
