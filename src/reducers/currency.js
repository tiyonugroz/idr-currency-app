import { CURRENCY_FETCHED, CLEAR_CURRENCY } from '../actions';

export default function currency(state = [], action) {
  switch (action.type) {
    case CURRENCY_FETCHED:
      return action.payload;
    
    case CLEAR_CURRENCY:
      return action.payload;

    default:
      return state;
  }
}
