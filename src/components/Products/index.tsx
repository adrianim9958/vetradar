import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
  Modal,
  Form,
  FormControl
} from 'react-bootstrap';
import { FormControlProps } from 'react-bootstrap/lib/FormControl';

import ProductComponent from './Product';

import { StoreState } from '../../store/reducers';
import { ProductState, Product } from '../../store/reducers/productReducer';
import {
  getProducts,
  addProduct,
  removeProduct,
  addCart
} from '../../store/actions';

interface ProductsProps {
  products: ProductState;
  getProducts: () => void;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  addCart: (product: Product) => void;
}

interface ProductsState {
  isModalOpen: boolean;
  productName: string;
  productPrice: number;
}

class Products extends Component<ProductsProps, ProductsState> {
  constructor(props: ProductsProps) {
    super(props);
    this.state = {
      isModalOpen: false,
      productName: '',
      productPrice: 0
    };
  }

  componentDidMount() {
    this.props.getProducts();
  }

  _removeHandler = (product: Product) => {
    const confirmResult = window.confirm('Remove Product?');
    if (confirmResult) {
      this.props.removeProduct(product);
    }
  };

  _handleModalOpen = (): void => {
    this.setState({ isModalOpen: true, productName: '', productPrice: 0 });
  };

  _handleModalClose = (): void => {
    this.setState({ isModalOpen: false, productName: '', productPrice: 0 });
  };

  _onHandleSubmit = (): void => {
    const { productName, productPrice } = this.state;

    if (productName && productPrice) {
      const newProduct = { name: productName, price: productPrice };

      this.props.addProduct(newProduct);
    }

    this._handleModalClose();
  };

  _onChangeHandler = (e: React.FormEvent<FormControlProps>): void => {
    this.setState<never>({
      [e.currentTarget.name as keyof ProductsState]: e.currentTarget.value
    });
  };

  _renderProduct = () => {
    const { isLoading, products } = this.props.products;

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
        <ProductComponent
          product={product}
          key={index}
          onAddCart={this.props.addCart}
          onRemove={this._removeHandler}
        />
      ));
    }
  };

  render() {
    const { productName, productPrice } = this.state;

    return (
      <Container>
        <Modal show={this.state.isModalOpen} onHide={this._handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                as={Row}
                controlId="formPlaintextEmail"
                className="align-items-center"
              >
                <Form.Label column sm="2">
                  Product Name
                </Form.Label>
                <Col sm="10">
                  <FormControl
                    type="text"
                    placeholder="Product Name"
                    name="productName"
                    value={productName}
                    onChange={this._onChangeHandler}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="formPlaintextPassword"
                className="align-items-center"
              >
                <Form.Label column sm="2">
                  Product Price
                </Form.Label>
                <Col sm="10">
                  <FormControl
                    type="number"
                    placeholder="Product Price"
                    name="productPrice"
                    value={productPrice.toString()}
                    onChange={this._onChangeHandler}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this._handleModalClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={this._onHandleSubmit}
              disabled={!productName || !productPrice}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <Row className="justify-content-end mb-3">
          <Button variant="success" onClick={this._handleModalOpen}>
            Add Product
          </Button>
        </Row>
        <Row> {this._renderProduct()} </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  products: state.products
});

export default connect(
  mapStateToProps,
  { getProducts, addProduct, removeProduct, addCart }
)(Products);
