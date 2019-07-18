import { CartActionUnion, CartActionTypes } from '../actions/actionTypes';
import {
  AddProductToCart,
  RemoveProductFromCart,
  PlusProductFromCart,
  MinusProductFromCart
} from '../actions';

export interface CartProduct {
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  isLoading: boolean;
  error: string;
  totalPrice: number;
  products: CartProduct[];
}

const INITIAL_STATE: CartState = {
  isLoading: false,
  error: '',
  totalPrice: 0,
  products: []
};

const getTotalPrice = (items: CartProduct[]) => {
  return items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
};

const applyAddProductToCart = (state: CartState, action: AddProductToCart) => {
  const newProducts = [...state.products, { ...action.payload, quantity: 1 }];
  const newTotalPrice = getTotalPrice(newProducts);

  return {
    ...state,
    products: newProducts,
    totalPrice: newTotalPrice
  };
};

const applyRemoveProductFromCart = (
  state: CartState,
  action: RemoveProductFromCart
) => {
  const oldProducts = [...state.products];
  const newProducts = oldProducts.filter(
    product => product.name !== action.payload.name
  );

  const newTotalPrice = getTotalPrice(newProducts);

  return {
    ...state,
    products: newProducts,
    totalPrice: newTotalPrice
  };
};

const applyPlusQuantity = (state: CartState, action: PlusProductFromCart) => {
  const oldProducts = [...state.products];
  const targetProductPos = oldProducts.findIndex(
    product => product.name === action.payload.name
  );
  oldProducts[targetProductPos].quantity =
    oldProducts[targetProductPos].quantity + 1;

  const newTotalPrice = getTotalPrice(oldProducts);
  return {
    ...state,
    products: [...oldProducts],
    totalPrice: newTotalPrice
  };
};

const applyMinusQuantity = (state: CartState, action: MinusProductFromCart) => {
  const oldProducts = [...state.products];
  const targetProductPos = oldProducts.findIndex(
    product => product.name === action.payload.name
  );
  oldProducts[targetProductPos].quantity =
    oldProducts[targetProductPos].quantity - 1;

  const newTotalPrice = getTotalPrice(oldProducts);
  return {
    ...state,
    products: [...oldProducts],
    totalPrice: newTotalPrice
  };
};

const productReducer = (state = INITIAL_STATE, action: CartActionUnion) => {
  switch (action.type) {
    case CartActionTypes.GET_CART_START: {
      return { ...state, isLoading: true };
    }
    case CartActionTypes.GET_CART_END: {
      return { ...state, isLoading: false };
    }
    case CartActionTypes.SET_CART:
      return {
        ...state,
        products: action.payload,
        totalPrice: getTotalPrice(action.payload)
      };
    case CartActionTypes.ADD_PRODUCT_TO_CART:
      return applyAddProductToCart(state, action);
    case CartActionTypes.REMOVE_PRODUCT_FROM_CART:
      return applyRemoveProductFromCart(state, action);
    case CartActionTypes.PLUS_QUANTITY_FROM_CART:
      return applyPlusQuantity(state, action);
    case CartActionTypes.MINUS_QUANTITY_FROM_CART:
      return applyMinusQuantity(state, action);
    default:
      return state;
  }
};

export default productReducer;
