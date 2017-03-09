import React, { Component } from 'react';
import {render} from 'react-dom';
import xhr from 'xhr';

import './App.css';
import './spectre.min.css';
import EmptyComponent from './EmptyComponent.jsx';
import DropdownComponent from './Components/Dropdown/DropdownComponent.jsx';


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      inputValue: null,
      rates: {},
      baseCurrency: 'USD',
      toCurrency: 'EUR',
      result: 0
    }

    this.fetchData = this.fetchData.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  fetchData() {
    const url = 'http://api.fixer.io/latest?base=USD';
    let self = this;
    xhr({
      url: url
    }, function(err, data) {
      self.state.rates = JSON.parse(data.body).rates;
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  handleInput(evt) {
    evt.preventDefault();
    this.setState({
      inputValue: evt.target.value
    });
  }

  handleClick(evt) {
    evt.preventDefault();
    if (this.state.inputValue) {
      const baseRate = this.state.rates[this.state.baseCurrency];
      const desiredRate = this.state.rates[this.state.toCurrency];
      let result = 0.00;
      if (this.state.baseCurrency === 'USD') {
        result = this.state.inputValue * desiredRate;
      } else if (this.state.toCurrency === 'USD') {
        console.log(this.state.inputValue, desiredRate);
        result = this.state.inputValue / baseRate;
      } else {
        result = (this.state.inputValue / baseRate) * desiredRate;
      }
      this.setState({result: result});
    }
  }

  handleSelect(evt) {
    const name = evt.target.name;
    if (name === 'baseCurrency') {
      this.setState({baseCurrency: evt.target.value});
    } else {
      this.setState({toCurrency: evt.target.value});
    }
  }


  render () {
    const currencies = [
      "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", 
      "DKK", "EUR", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", 
      "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", 
      "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", 
      "TRY", "USD", "ZAR"
    ];

    return (
      <div className="container">
        <div className="columns">
          <div className="col-12 centered text-center">
            <h1>Currency Converter</h1>
            <form className="inline-flex">
              <div className="form-group">
                <input 
                  className="form-input" 
                  type="text" 
                  placeholder="Value" 
                  id="value"
                  onChange={this.handleInput}/>
              </div>
              <div className="form-group">
                <select className="form-select" name="baseCurrency" onChange={this.handleSelect} value={this.state.baseCurrency}>
                  {currencies.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
                </select>
              </div>
              <h4>to</h4>
              <div className="form-group">
                <select className="form-select" name="toCurrency" onChange={this.handleSelect} value={this.state.toCurrency}>
                  {currencies.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
                </select>
              </div>
              <button className="btn btn-primary" onClick={this.handleClick}>Convert</button>
            </form>
            <div className="divider"></div>
            { (this.state.result) ? (
            <div className="result-container">
              <h4>{this.state.inputValue } {this.state.baseCurrency} = </h4>
              <h2>{this.state.result.toFixed(2)} {this.state.toCurrency}</h2>
            </div>              
            ) : null }
            
          </div>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));