import { Dispatch } from 'redux';

import { StoreState } from '../reducers';
import {
  ProductActionTypes as pdActions,
  CartActionTypes as cartActions
} from './actionTypes';

import { Product } from '../reducers/productReducer';
import * as StorageAction from '../../util/storage';
import { RemoveProductFromCart } from './cartActions';

export interface GetProductStartAction {
  type: pdActions.GET_PRODUCTS_START;
}

export interface GetProductEndAction {
  type: pdActions.GET_PRODUCTS_END;
}

export interface SetProductsAction {
  type: pdActions.SET_PRODUCTS;
  payload: Product[];
}

export interface AddProductAction {
  type: pdActions.ADD_PRODUCT;
  payload: Product;
}

export interface RemoveProductAction {
  type: pdActions.REMOVE_PRODUCT;
  payload: Product;
}

export const getProducts = () => (dispatch: Dispatch) => {
  dispatch<GetProductStartAction>({ type: pdActions.GET_PRODUCTS_START });

  const existValue = StorageAction.getStorage('products');

  if (existValue) {
    const parsedValue = JSON.parse(existValue);
    dispatch<SetProductsAction>({
      type: pdActions.SET_PRODUCTS,
      payload: parsedValue
    });
  }

  dispatch<GetProductEndAction>({ type: pdActions.GET_PRODUCTS_END });
};

export const addProduct = (newProduct: Product) => (
  dispatch: Dispatch,
  getState: () => StoreState
) => {
  const oldProducts = getState().products.products;
  const existProduct = oldProducts.findIndex(
    product => product.name === newProduct.name
  );

  if (existProduct >= 0) {
    alert('Product already exist');
  } else {
    dispatch<AddProductAction>({
      type: pdActions.ADD_PRODUCT,
      payload: newProduct
    });

    const newListedProduct = JSON.stringify(getState().products.products);

    StorageAction.setStorage('products', newListedProduct);
  }
};

export const removeProduct = (targetProduct: Product) => (
  dispatch: Dispatch,
  getState: () => StoreState
) => {
  const oldProducts = getState().products.products;
  const existProduct = oldProducts.findIndex(
    product => product.name === targetProduct.name
  );

  if (existProduct >= 0) {
    dispatch<RemoveProductAction>({
      type: pdActions.REMOVE_PRODUCT,
      payload: targetProduct
    });

    dispatch<RemoveProductFromCart>({
      type: cartActions.REMOVE_PRODUCT_FROM_CART,
      payload: targetProduct
    });

    const newListedProduct = JSON.stringify(getState().products.products);

    StorageAction.setStorage('products', newListedProduct);

    const newCartList = JSON.stringify(getState().cart.products);

    StorageAction.setStorage('cart', newCartList);
  } else {
    alert('No product deleted');
  }
};
