import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { StoreState } from '../../store/reducers';
import { CartState } from '../../store/reducers/cartReducer';

import './Header.css';

interface HeaderProps {
  cart: CartState;
}

// interface HeaderState {}

class Header extends Component<HeaderProps, {}> {
  _renderBadge = () => {
    const { products } = this.props.cart;

    if (products.length > 0) {
      return (
        <Badge variant="info" pill className=".badge">
          {products.length}
        </Badge>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <Navbar bg="primary" variant="dark" className="header">
        <Navbar.Brand>Adrian</Navbar.Brand>
        <Nav className="ml-auto justify-content-end">
          <NavItem>
            <NavLink to="/" exact activeClassName="active">
              Product
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="/cart" exact activeClassName="active">
              Cart
              {this._renderBadge()}
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  cart: state.cart
});

export default connect(
  mapStateToProps,
  null
)(Header);
