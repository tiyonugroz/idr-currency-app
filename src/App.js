import React, { Component } from 'react';
import { connect } from 'react-redux';
import Validator from 'validator';
import classnames from 'classnames';
import { fetchCurrency, clearCurrency } from './actions';

class App extends Component {
  state = {
    error: false,
    typingTimeout: 0,
  }

  isValid = (val) => {
    if (!Validator.isNumeric(val)) {
      this.setState({ 
        error: true,
      });

      return false;
    } 

    return true;
  };

  handleChange = () => {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    this.props.clearCurrency();

    if (this.amountInput.value !== '') {
      this.setState({
        error: false,
        typingTimeout: setTimeout(() => {
          if (this.isValid(this.amountInput.value)) {
            this.props.fetchCurrency(this.amountInput.value);
          }
        }, 1000),
      });
    }
  }

  render() {
    const { currency } = this.props;

    return (
      <div className="ui container">
        <h1>IDR Currency App</h1>
        <div className={classnames("ui input", { error: !!this.state.error })}>
          <input
            type="text"
            name="amount"
            placeholder="Your Amount"
            ref={element => this.amountInput = element}
            onChange={this.handleChange}
          />
        </div>
 
        <ul className="ui list">
          {
            currency.map((item, index) =>
              <li key={index}>{item.currency} = {item.amount}</li>
            )
          }
        </ul>
      </div>
    );
  }
}

const mapState = state => ({
  currency: state.currency,
});

const mapDispatch = {
  fetchCurrency,
  clearCurrency,
};

export default connect(mapState, mapDispatch)(App);
