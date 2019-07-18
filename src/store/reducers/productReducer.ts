import { ProductActionUnion, ProductActionTypes } from '../actions/actionTypes';

export interface Product {
  name: string;
  price: number;
}

export interface ProductState {
  isLoading: boolean;
  error: string;
  products: Product[];
}

const INITIAL_STATE: ProductState = {
  isLoading: false,
  error: '',
  products: [
    { name: 'sledgehammer', price: 125.76 },
    { name: 'axe', price: 190.51 },
    { name: 'bandsaw', price: 562.14 },
    { name: 'chisel', price: 13.9 },
    { name: 'hacksaw', price: 19.45 }
  ]
};

const productReducer = (state = INITIAL_STATE, action: ProductActionUnion) => {
  switch (action.type) {
    case ProductActionTypes.GET_PRODUCTS_START: {
      return { ...state, isLoading: true };
    }
    case ProductActionTypes.GET_PRODUCTS_END: {
      return { ...state, isLoading: false };
    }
    case ProductActionTypes.SET_PRODUCTS:
      return { ...state, products: action.payload };
    case ProductActionTypes.ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case ProductActionTypes.REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product.name !== action.payload.name
        )
      };
    default:
      return state;
  }
};

export default productReducer;
