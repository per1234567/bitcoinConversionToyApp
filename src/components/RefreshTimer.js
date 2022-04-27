import React, { useState, useEffect } from 'react';

const RefreshTimer = ({ getCurrencyInfo, timerSeconds }) => {
    const [time, setTime] = useState(timerSeconds);

    const resetTimer = () => {
        setTime(timerSeconds);
        getCurrencyInfo();
    }

    /**
     * Reduce time by 1 second until it is time to retrieve new conversion rates
     */
    useEffect(() => {
        let refreshTimeOut = undefined;

        if(time === -1) resetTimer();
        else refreshTimeOut = setTimeout(() => { setTime(time - 1) }, 1000);

        return () => {
            if(refreshTimeOut) clearTimeout(refreshTimeOut);
        }
    }, [time]);

    return (
        <div className='ui horizontal segments'>
            <div className="ui segment" style={{fontSize: "20px"}}>
                <label>Time until conversion rate refresh: {time}</label>
            </div>
            <div className="ui segment">
                <button
                    className="ui secondary button right floated"
                    onClick={resetTimer}
                >
                    Refresh now (new data may not yet be available)
                </button>
            </div>
        </div>
    );
}

RefreshTimer.defaultProps = {
    timerSeconds: 10
}

export default RefreshTimer;