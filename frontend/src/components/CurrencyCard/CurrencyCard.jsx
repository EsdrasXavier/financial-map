import { Card } from 'antd';
import React from 'react';

const CurrencyCard = ({ name, price }) => {
  return (
    <Card>
      <h2>{name}</h2>
      <p>{price}</p>
    </Card>
  );
}

export default CurrencyCard;