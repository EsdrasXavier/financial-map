'use strict';
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('18d3dc3a0c5b4d159f9a41c7c2bf3e9a');

class NewsService {
  static async fetchAllNews() {
    return new Promise((resolve, rejects) => {
      newsapi.v2.topHeadlines({
        category: 'business',
        language: 'pt',
        country: 'br'
      }).then(response => {
        resolve(response);
      }).catch(err => rejects(err));
    });
  }

  static async fetchNewsForStock(stock) {
    return new Promise((resolve, rejects) => {
      newsapi.v2.everything({
        q: stock,
        sortBy: 'publishedAt',
        language: 'pt'
      }).then(response => {
        resolve(response);
      }).catch(err => rejects(err));
    });
  }
}

module.exports = NewsService;