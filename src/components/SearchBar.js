import React, { useState, useRef, useEffect } from 'react';

const SearchBar = ({ onSubmit }) => {
    const [term, setTerm] = useState('');
    const inputFieldRef = useRef();

    useEffect(() => { inputFieldRef.current.focus() }, []);

    const onFormSubmit = event => {
        event.preventDefault();

        if (term !== '') {
            onSubmit(parseFloat(term.replace(',','.')));
            setTerm('');
        }
    }

    const onInputChange = newInput => {
        if (/^\d*[.,]?\d*$/.test(newInput)) { // only allow user to input valid number as a BTC amount
            setTerm(newInput);
        }
    }

    return (
        <div className="ui segment">
            <form onSubmit={onFormSubmit} className="ui form">
                <div className="field">
                    <label>Enter a quantity of BitCoin</label>
                    <input 
                        type="text" 
                        value={ term } 
                        ref={ inputFieldRef }
                        onChange={ e => onInputChange(e.target.value) }>
                    </input>
                    <button 
                        style={{marginTop: "10px"}}
                        className="ui primary button"
                        onClick={onFormSubmit}
                    >
                        Input
                    </button>
                </div>
            </form>
        </div>  
    );
}

export default SearchBar;