import React from 'react';
import CurrencyField from './CurrencyField';

const CurrenciesArea = ({ selectedCurrencies, BTCQuantity, handleFieldDelete, currencyInfo }) => {

    const renderCurrencyFields = () => {
        return selectedCurrencies.map(currency =>
            <CurrencyField 
                key={currency} 
                info={currencyInfo[currency]}
                BTCQuantity={BTCQuantity}
                handleFieldDelete={handleFieldDelete}
            />
        );
    }

    return (
        <div className="ui segment">
            <div>
                Entered quantity of BTC in selected currencies:
            </div>
            {currencyInfo ? renderCurrencyFields() : null}
        </div>
    )
}

export default CurrenciesArea;