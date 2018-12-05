export const CURRENCY_FETCHED = 'CURRENCY_FETCHED';
export const CLEAR_CURRENCY = 'CLEAR_CURRENCY';

export function currencyFetched(data) {
  return {
    type: CURRENCY_FETCHED,
    payload: data,
  }
}

export function clearCurrency() {
  return {
    type: CLEAR_CURRENCY,
    payload: [],
  }
}

export function fetchCurrency(val) {
  return dispatch => {
    fetch('https://api.exchangeratesapi.io/latest?base=IDR')
      .then(res => res.json())
      .then(data => {
        let array = [];
        for (const key in data.rates) {
          if (key !== 'IDR') {
            array.push({
              currency: key,
              amount: data.rates[key] * val
            });
          }
        }

        dispatch(currencyFetched(array))
      });
  }
}
