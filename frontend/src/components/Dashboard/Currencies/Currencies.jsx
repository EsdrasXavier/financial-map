import { Col, Divider, Row } from 'antd';
import React from 'react';
import CurrencyCard from '../../CurrencyCard/CurrencyCard';

const Currencies = () => {

  const currencies = [
    { name: 'Dolar', price: '$5,32' },
    { name: 'Dolar', price: '$5,32' },
    { name: 'Dolar', price: '$5,32' },
    { name: 'Dolar', price: '$5,32' },
    { name: 'Dolar', price: '$5,32' },
    { name: 'Dolar', price: '$5,32' },
    { name: 'Dolar', price: '$5,32' },
    { name: 'Dolar', price: '$5,32' },
  ];

  return (
    <div>
      <Divider orientation="center">
        <h2>
          Moedas
        </h2>
      </Divider>
      <Row className="currencies-cards-container">
        {currencies.map(({ name, price }, key) => (
          <Col key={key} span={12} className="dashboard-currency-col">
            <CurrencyCard name={name} price={price} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Currencies;