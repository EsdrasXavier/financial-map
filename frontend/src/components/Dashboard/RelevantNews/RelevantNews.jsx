import { Divider, List } from 'antd';
import React from 'react';

const RelevantNews = () => {

  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Los Angeles battles huge wildfires.'
  ];

  return (
    <div>
      <Divider orientation="center">
        <h2>
          Noticias mais relevantes
        </h2>
      </Divider>
      <List
        className="relevant-news-list"
        size="large"
        header={''}
        footer={''}
        bordered
        dataSource={data}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    </div>
  );
}

export default RelevantNews;