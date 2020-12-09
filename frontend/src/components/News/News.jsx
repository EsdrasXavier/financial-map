import React, { useEffect, useState } from 'react';
import { Col, Row, notification, Card } from 'antd';

const { Meta } = Card;

const openNotification = error => {
  notification['error']({
    message: 'Erro ao buscar dados',
    description: `Erro ao ler Notícias: ${error.message}`
  });
};

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://127.0.0.1:3000/news')
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData.articles[0]);
        console.log(responseData.articles[0].content);
        console.log(responseData.articles[0].description);
        console.log(responseData.articles[0].publishedAt);
        console.log(responseData.articles[0].url);
        console.log(responseData.articles[0].urlToImage);

        // Imagem
        // Titulo - description
        // Descricao - content 
        // Data e Hora - publishedAt
        // Url - url

        const obj = Object.keys(responseData['articles']);
        let dataNews = [];
        for (let i in obj) {
          dataNews.push({ title: responseData['articles'][i].title, description: responseData.articles[i].content, urlImage: responseData.articles[i].urlToImage, Url: responseData.articles[i].url, published: responseData.articles[i].publishedAt });
        }
        console.log(dataNews);
        setNews(dataNews);
      }).catch(openNotification);
  }

  return (

    <div className="main">
      <h2>Notícias</h2>
      <div className="news">
        {news.map(({ title, description, urlImage, Url, published }, key) => (
          <Col span={4}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={urlImage} />}
            >
              <Meta title={title} description={description} />
            </Card>

            {/* <Col span={3}> 
              <img alt="news" src={urlImage} style={{ width: 150, height: 100}} />
              <h5>{published}</h5>
            </Col>
            <Col span={20}>
              <h3>{title}</h3>
              <h4>{description}
                <a href={Url}>Ler mais...</a>
              </h4>
            </Col> */}
          </Col>
        ))}
      </div>
    </div>
  );
}

export default News;