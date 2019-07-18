import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';

import CartItemComponent from './CartItem';

import { StoreState } from '../../store/reducers';
import { Product } from '../../store/reducers/productReducer';
import { CartState } from '../../store/reducers/cartReducer';

import { roundNum } from '../../util/roundNum';

import {
  getCarts,
  removeFromCart,
  plusQuantity,
  minusQuantity
} from '../../store/actions';

interface CartCmtProps {
  cart: CartState;
  getCarts: () => void;
  removeFromCart: (product: Product) => void;
  plusQuantity: (product: Product) => void;
  minusQuantity: (product: Product) => void;
}

// interface CartCmtState {}

class CartCmt extends Component<CartCmtProps, {}> {
  componentDidMount() {
    this.props.getCarts();
  }

  _removeHandler = (product: Product) => {
    const confirmResult = window.confirm('Remove Product?');
    if (confirmResult) {
      this.props.removeFromCart(product);
    }
  };

  _renderCartItem = () => {
    const { isLoading, products } = this.props.cart;

    if (isLoading) {
      return (
        <Col xs={{ span: 1, offset: 5 }} className="justify-content-center">
          <Spinner animation="border" />
        </Col>
      );
    } else if (products.length === 0) {
      return (
        <Col xs={12}>
          <Alert variant="danger">No Product</Alert>
        </Col>
      );
    } else {
      return products.map((product, index) => (
        <CartItemComponent
          product={product}
          key={index}
          onRemove={this._removeHandler}
          onPlus={this.props.plusQuantity}
          onMinus={this.props.minusQuantity}
        />
      ));
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col xs={12} sm={8}>
            {this._renderCartItem()}
          </Col>
          <Col xs={12} sm={4}>
            <h3>Summary</h3>
            <hr />
            <h5>Total Price</h5>
            <p>$ {roundNum(this.props.cart.totalPrice)}</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { getCarts, removeFromCart, plusQuantity, minusQuantity }
)(CartCmt);
