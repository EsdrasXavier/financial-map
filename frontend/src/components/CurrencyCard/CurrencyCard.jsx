import { Card } from 'antd';
import React from 'react';

const CurrencyCard = ({ name, buy, sell, variation }) => {
  return (
    <Card>
      <h2>{name}</h2>
      <p>Preço de compra: {buy || "0.0000"}</p>
      <p>Preço de venda: {sell || "0.0000"}</p>
      <p>Variação: {variation || "0.0000"}</p>
    </Card>
  );
}

export default CurrencyCard;