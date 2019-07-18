import { combineReducers } from 'redux';

import ProductReducer, { ProductState } from './productReducer';
import CartReducer, { CartState } from './cartReducer';

export interface StoreState {
  products: ProductState;
  cart: CartState;
}

const reducers = combineReducers<StoreState>({
  products: ProductReducer,
  cart: CartReducer
});

export default reducers;
