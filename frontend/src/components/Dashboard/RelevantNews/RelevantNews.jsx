import { Divider, List, notification } from 'antd';
import React, { useEffect, useState } from 'react';

const openNotification = error => {
  notification['error']({
    message: 'Erro ao buscar dados',
    description: `Erro ao ler ações: ${error.message}`
  });
};

const RelevantNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://127.0.0.1:3000/news')
      .then(response => response.json())
      .then(responseData => {
        const obj = Object.keys(responseData['articles']);
        let dataNews = [];
        for(let i in obj) {
          dataNews.push(responseData['articles'][i].title);
        }
        setNews(dataNews);
      }).catch(openNotification);
  }

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
        dataSource={news}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    </div>
  );
}

export default RelevantNews;