import React from 'react';

const CurrencyField = ({ info, BTCQuantity, handleFieldDelete }) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: info.code,
    });
    
    return (
        <div className='ui horizontal segments'>
            <div className="ui segment" style={{fontSize: "20px"}}>
                {`
                ${ info.code }: 
                ${ formatter.format(info.rate.replace(',','') * BTCQuantity) }
                `}
            </div>
            <div className="ui segment">
                <button
                    className="ui right floated red button"
                    onClick={() => handleFieldDelete(info.code)}
                >
                Delete
                </button>
            </div>
        </div>
    )
}

export default CurrencyField;