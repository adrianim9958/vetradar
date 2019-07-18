import React, { FunctionComponent } from 'react';
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';

import { Product } from '../../../store/reducers/productReducer';
import { CartProduct } from '../../../store/reducers/cartReducer';

import { roundNum } from '../../../util/roundNum';

import './CartItem.css';

interface CartItemProps {
  product: CartProduct;
  onRemove: (product: Product) => void;
  onPlus: (product: Product) => void;
  onMinus: (product: Product) => void;
}

const CartItemCmt: FunctionComponent<CartItemProps> = (
  props: CartItemProps
) => {
  const { product, onRemove, onPlus, onMinus } = props;

  return (
    <Col xs={12} className="mt-3">
      <Row className="align-items-center">
        <Button
          size="sm"
          variant="danger"
          className="mr-3"
          onClick={() => onRemove(product)}
        >
          x
        </Button>
        <span className="cart-item-title mr-2">{product.name}</span>
        <span className="cart-item-price">${roundNum(product.price)}</span>
        <ButtonGroup className="ml-auto">
          <Button onClick={() => onMinus(product)}>-</Button>
          <Button>{product.quantity}</Button>
          <Button onClick={() => onPlus(product)}>+</Button>
        </ButtonGroup>
      </Row>
    </Col>
  );
};

export default CartItemCmt;
