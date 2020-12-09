import { Col, Divider, Row, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import CurrencyCard from '../../CurrencyCard/CurrencyCard';

const openNotification = error => {
  notification['error']({
    message: 'Erro ao buscar dados',
    description: `Erro ao ler ações: ${error.message}`
  });
};

const Currencies = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://127.0.0.1:3000/currencies')
      .then(response => response.json())
      .then(responseData => {
        const obj = Object.keys(responseData['data']);
        let dataCurrencies = [];
        for(let i in obj) {
          if (obj[i] != 'source'){
            dataCurrencies.push({
              name: responseData['data'][obj[i]].name, 
              buy: responseData['data'][obj[i]].buy,
              sell: responseData['data'][obj[i]].sell,
              variation: responseData['data'][obj[i]].variation
            });
          }
        }
        setCurrencies(dataCurrencies);
      }).catch(openNotification);
  }

  return (
    <div>
      <Divider orientation="center">
        <h2>
          Moedas
        </h2>
      </Divider>
      <Row className="currencies-cards-container">
        {currencies.map(({ name, buy, sell, variation }, key) => (
          <Col key={key} span={12} className="dashboard-currency-col">
            <CurrencyCard name={name} buy={buy} sell={sell} variation={variation}  />
          </Col>
        ))}
      </Row>
    </div>
  );
 }

export default Currencies;