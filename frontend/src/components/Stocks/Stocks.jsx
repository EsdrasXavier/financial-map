import { Col, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react';

const Stocks = () => {
  const [header, setHeader] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://127.0.0.1:3000/stock')
      .then(response => response.json())
      .then(responseData => {
        const columns = responseData['data']['header'].map(column => ({
          title: column,
          dataIndex: column,
          key: column,
        }));

        setHeader(columns);
        setData(responseData['data']['rows']);
      })
      .catch(error => console.error(error));
  }

  return (
    <div>
      <div className="stock-title">
        <h1>
          Top Ações
        </h1>
      </div>
      <Row>
        <Col span={24}>
          <Table
            total={50}
            className="top-ten-stocks"
            size="large"
            columns={header}
            bordered
            dataSource={data}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Stocks;