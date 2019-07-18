import React, { FunctionComponent } from 'react';
import { FaCartPlus, FaTrashAlt } from 'react-icons/fa';
import { Col, Card, ButtonGroup, Button } from 'react-bootstrap';

import { Product } from '../../../store/reducers/productReducer';
import image from '../../../assets/image/logo.svg';

import { roundNum } from '../../../util/roundNum';

import './Product.css';

interface ProductProps {
  product: Product;
  onRemove: (product: Product) => void;
  onAddCart: (product: Product) => void;
}

const ProductCmt: FunctionComponent<ProductProps> = (props: ProductProps) => {
  const { product, onRemove, onAddCart } = props;

  return (
    <Col xs={12} sm={6} md={3} className="mt-3">
      <Card className="text-center">
        <Card.Header className="card-header">{product.name}</Card.Header>
        <Card.Body>
          <Card.Img variant="top" src={image} />
          <Card.Text>${roundNum(product.price)}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <ButtonGroup>
            <Button variant="danger" onClick={() => onRemove(props.product)}>
              <FaTrashAlt />
            </Button>
            <Button variant="primary" onClick={() => onAddCart(props.product)}>
              <FaCartPlus />
            </Button>
          </ButtonGroup>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default ProductCmt;
