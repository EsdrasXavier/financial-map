'use strict';
const fetch = require('node-fetch');

const HG_URL = `https://api.hgbrasil.com/finance`;
const API_KEY = '17e9cec0';

class HGService {
  static async fetchCurrencies() {
    return new Promise((resolve, rejects) => {

      fetch(`${HG_URL}?key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          const result = data['results']['currencies'];
          resolve({ status: 'ok', data: result });
        }).catch(error => rejects(error));
    });
  }
}

module.exports = HGService;