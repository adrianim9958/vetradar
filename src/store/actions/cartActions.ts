import { Dispatch } from 'redux';

import { StoreState } from '../reducers';
import { CartActionTypes as cartActions } from './actionTypes';
import { Product } from '../reducers/productReducer';
import { CartProduct } from '../reducers/cartReducer';
import * as StorageAction from '../../util/storage';

export interface GetCartStartAction {
  type: cartActions.GET_CART_START;
}

export interface GetCartEndAction {
  type: cartActions.GET_CART_END;
}

export interface SetCartAction {
  type: cartActions.SET_CART;
  payload: CartProduct[];
}

export interface AddProductToCart {
  type: cartActions.ADD_PRODUCT_TO_CART;
  payload: Product;
}

export interface RemoveProductFromCart {
  type: cartActions.REMOVE_PRODUCT_FROM_CART;
  payload: Product;
}

export interface PlusProductFromCart {
  type: cartActions.PLUS_QUANTITY_FROM_CART;
  payload: Product;
}

export interface MinusProductFromCart {
  type: cartActions.MINUS_QUANTITY_FROM_CART;
  payload: Product;
}

export const getCarts = () => (dispatch: Dispatch) => {
  dispatch<GetCartStartAction>({ type: cartActions.GET_CART_START });

  const existValue = StorageAction.getStorage('cart');

  if (existValue) {
    const parsedValue = JSON.parse(existValue);

    dispatch<SetCartAction>({
      type: cartActions.SET_CART,
      payload: parsedValue
    });
  }

  dispatch<GetCartEndAction>({ type: cartActions.GET_CART_END });
};

export const addCart = (addProduct: Product) => (
  dispatch: Dispatch,
  getState: () => StoreState
) => {
  const oldCartProducts = getState().cart.products;
  const existProduct = oldCartProducts.findIndex(
    product => product.name === addProduct.name
  );

  if (existProduct >= 0) {
    dispatch<PlusProductFromCart>({
      type: cartActions.PLUS_QUANTITY_FROM_CART,
      payload: addProduct
    });
  } else {
    dispatch<AddProductToCart>({
      type: cartActions.ADD_PRODUCT_TO_CART,
      payload: addProduct
    });
  }

  const newCartList = JSON.stringify(getState().cart.products);

  StorageAction.setStorage('cart', newCartList);
};

export const removeFromCart = (targetProduct: Product) => (
  dispatch: Dispatch,
  getState: () => StoreState
) => {
  dispatch<RemoveProductFromCart>({
    type: cartActions.REMOVE_PRODUCT_FROM_CART,
    payload: targetProduct
  });

  const newCartList = JSON.stringify(getState().cart.products);

  StorageAction.setStorage('cart', newCartList);
};

export const plusQuantity = (targetProduct: Product) => (
  dispatch: Dispatch,
  getState: () => StoreState
) => {
  dispatch<PlusProductFromCart>({
    type: cartActions.PLUS_QUANTITY_FROM_CART,
    payload: targetProduct
  });

  const newCartList = JSON.stringify(getState().cart.products);

  StorageAction.setStorage('cart', newCartList);
};

export const minusQuantity = (targetProduct: Product) => (
  dispatch: Dispatch,
  getState: () => StoreState
) => {
  const oldCartProducts = getState().cart.products;
  const targetProductPos = oldCartProducts.findIndex(
    product => product.name === targetProduct.name
  );

  const existQty = oldCartProducts[targetProductPos].quantity;

  if (existQty === 0) {
    // dispatch<RemoveProductFromCart>({
    //   type: cartActions.REMOVE_PRODUCT_FROM_CART,
    //   payload: targetProduct
    // });
    return alert('Can not set negative quantity');
  } else {
    dispatch<MinusProductFromCart>({
      type: cartActions.MINUS_QUANTITY_FROM_CART,
      payload: targetProduct
    });
  }

  const newCartList = JSON.stringify(getState().cart.products);

  StorageAction.setStorage('cart', newCartList);
};
