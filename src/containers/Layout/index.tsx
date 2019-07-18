import React, { FunctionComponent, ReactNode } from 'react';
import { Container } from 'react-bootstrap';

import Header from '../../components/Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = (props: LayoutProps) => {
  return (
    <Container>
      <Header />
      <div className="mt-3">{props.children}</div>
    </Container>
  );
};

export default Layout;
