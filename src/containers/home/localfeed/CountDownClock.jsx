import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function CountDownClock(props) {

    const { expireTime } = props  
    const renderTime = value => {
        if (value === 0) {
            return <div className="timer">Too lale...</div>;
        }
        let hours = Math.floor(value / 3600);
        value %= 3600;
        let minutes = Math.floor(value / 60);
        let seconds = value%60
        return (
            <div style={{fontFamily:"Montserrat", alignItems:"center", fontSize:"20px"}}>{hours}:{minutes}:{seconds}</div>
        );
    };
    return (
        <CountdownCircleTimer
        size={90}
        strokeWidth={4}
        isPlaying
        durationSeconds={expireTime}
        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        renderTime={renderTime}
        onComplete={() => [true, 1000]}
        />
    );
}

export default CountDownClock;
