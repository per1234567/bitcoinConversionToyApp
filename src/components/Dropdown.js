import React, {useRef, useState, useEffect} from 'react';

const currencies = ['EUR', 'USD', 'GBP'];

const DropdownArea = ({ selectedCurrencies, onSelection }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    // makes dropdown dissapear when another part of the DOM is clicked
    useEffect(() => {
        const onBodyClick = event => {
            if (ref.current.contains(event.target)) {
                return;
            }

            setOpen(false);
        };

        document.body.addEventListener('click', onBodyClick, { capture: true });

        return () => {
            document.body.removeEventListener('click', onBodyClick, { capture: true });
        };
    }, []);

    // generates list of options in dropdown menu based on unselected currencies
    const renderedOptions = () => {
        const options = currencies.filter(currency => !selectedCurrencies.includes(currency));
        return options.map(option => 
            <div 
                key={option} 
                className="item"
                onClick={() => onSelection(option)}
            >
                {option}
            </div>
        );
    }

    return (
        <div className="ui segment">
            <div ref={ref} className="ui form">
                <div className="field">
                    <div onClick={() => setOpen(!open)} className={`ui selection dropdown ${open ? 'visible active' : ''}`}>
                        <div className="text">Add a currency</div>
                        <i className="dropdown icon"></i>
                        <div className={`menu ${open ? 'visible transition' : ''}`}>
                            {renderedOptions()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DropdownArea;