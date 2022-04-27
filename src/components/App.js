import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import CurrenciesArea from './CurrenciesArea';
import Dropdown from './Dropdown';
import RefreshTimer from './RefreshTimer';

const App = () => {
    const [selectedCurrencies, updateSelectedCurrencies] = useState([]);
    const [BTCQuantity, setBTCQuantity] = useState(0);
    const [currencyInfo, setCurrencyInfo] = useState(null);

    const timerLength = 30;

    const onNumberSubmit = term => {
        setBTCQuantity(term);
    }

    const onDropdownSubmit = newCurrency => {
        selectedCurrencies.push(newCurrency);
        
        updateSelectedCurrencies([...selectedCurrencies]);
    }

    const handleFieldDelete = code => {
        const newSelectedCurrencies = selectedCurrencies.filter(currency => currency !== code);
        
        updateSelectedCurrencies(newSelectedCurrencies);
    }

    /**
     * Retrieve new data about conversion rates
     */
    const updateCurrencyInfo = () => {
        const getCurrencyInfo = async () => {
            const { data } = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
    
            setCurrencyInfo(data.bpi);
        }
        getCurrencyInfo();
    }
    useEffect(() => { updateCurrencyInfo(); }, []);

    return ( //the four fields visible on screen
        <div>
            <div className="ui container" style={{marginTop: '20px'}}>
                <SearchBar onSubmit={onNumberSubmit}/>
            </div>

            {
                selectedCurrencies.length === 0 ? null :
                <div className="ui container" style={{marginTop: '20px'}}>
                    <CurrenciesArea 
                        selectedCurrencies={selectedCurrencies}
                        BTCQuantity={BTCQuantity}
                        handleFieldDelete={handleFieldDelete}
                        currencyInfo={currencyInfo}
                    />
                </div>
            }

            {
                selectedCurrencies.length === 3 ? null :
                <div className="ui container" style={{marginTop: '20px'}}>
                    <Dropdown
                        selectedCurrencies={selectedCurrencies}
                        onSelection={onDropdownSubmit}
                    />
                </div>
            }

            {
                selectedCurrencies.length === 0 ? null :
                <div className="ui container" style={{marginTop: '20px'}}>
                    <RefreshTimer
                        getCurrencyInfo={updateCurrencyInfo}
                        timerSeconds={timerLength}
                    />
                </div>
            }
        </div>
    );
}

export default App;