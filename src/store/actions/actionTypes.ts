import {
  GetProductStartAction,
  GetProductEndAction,
  SetProductsAction,
  AddProductAction,
  RemoveProductAction
} from './productActions';

import {
  GetCartStartAction,
  GetCartEndAction,
  SetCartAction,
  AddProductToCart,
  RemoveProductFromCart,
  PlusProductFromCart,
  MinusProductFromCart
} from './cartActions';

export enum ProductActionTypes {
  GET_PRODUCTS_START = 'product/GET_PRODUCTS_START',
  GET_PRODUCTS_END = 'product/GET_PRODUCTS_END',
  SET_PRODUCTS = 'product/SET_PRODUCTS',
  ADD_PRODUCT = 'product/ADD_PRODUCT',
  REMOVE_PRODUCT = 'product/REMOVE_PRODUCT'
}

export type ProductActionUnion =
  | GetProductStartAction
  | GetProductEndAction
  | SetProductsAction
  | AddProductAction
  | RemoveProductAction;

export enum CartActionTypes {
  GET_CART_START = 'cart/GET_CART_START',
  GET_CART_END = 'cart/GET_CART_END',
  SET_CART = 'cart/SET_CART',
  ADD_PRODUCT_TO_CART = 'cart/ADD_PRODUCT_TO_CART',
  REMOVE_PRODUCT_FROM_CART = 'cart/REMOVE_PRODUCT_FROM_CART',
  PLUS_QUANTITY_FROM_CART = 'cart/PLUS_QUANTITY_FROM_CART',
  MINUS_QUANTITY_FROM_CART = 'cart/MINUS_QUANTITY_FROM_CART'
}

export type CartActionUnion =
  | GetCartStartAction
  | GetCartEndAction
  | SetCartAction
  | AddProductToCart
  | RemoveProductFromCart
  | PlusProductFromCart
  | MinusProductFromCart;
