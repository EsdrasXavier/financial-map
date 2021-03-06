import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Row className="Nav__Container">
      <Col span={8} className="Nav__item">
        <h3>
          <Link className="Nav__link" to="/">Dashboard</Link>
        </h3>
      </Col>
      <Col span={8} className="Nav__item">
        <h3>
          <Link className="Nav__link" to="/stocks">Stocks</Link>
        </h3>
      </Col>
      <Col span={8} className="Nav__item">
        <h3>
          <Link className="Nav__link" to="/news">News</Link>
        </h3>
      </Col>
    </Row>
  );
}

export default Navbar;