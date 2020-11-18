import React from 'react';
import { Col, Row } from 'antd';
import RelevantNews from './RelevantNews/RelevantNews';
import Currencies from './Currencies/Currencies';

const Dashboard = () => {
  return (
    <Row>
      <Col span={12}>
        <RelevantNews />
      </Col>
      <Col span={8}>
        <Currencies />
      </Col>
    </Row>
  );
}

export default Dashboard;