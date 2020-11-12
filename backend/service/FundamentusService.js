'use strict';

const FormData = require('form-data');
const HOST = 'www.fundamentus.com.br';
const FUNDAMENTUS_URL = `http://${HOST}/resultado.php`;

const fetch = require('node-fetch');
class FundamentusService {
  static #LINK_REGEX = new RegExp(/<a [^>]+>(.*?)<\/a>/);
  static #CELL_REGEX = new RegExp(/<td>(.*?)<\/td>/);

  static async fetchStocks() {
    return new Promise((resolve, rejects) => {
      var formdata = new FormData();
      formdata.append("firma_ebit_min", "0");
      formdata.append("firma_ebitda_min", "0");
      formdata.append("liq_min", "200000");
      formdata.append("ordem", "1");

      const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.193 Safari/537.36',
          'Cookie': 'PHPSESSID=543dfeb728a30a16429ba7af187aa864',
        },
      };

      fetch(FUNDAMENTUS_URL, requestOptions)
        .then(response => response.arrayBuffer())
        .then(buffer => {
          let decoder = new TextDecoder("iso-8859-1");
          let text = decoder.decode(buffer);
          const tableData = FundamentusService.#parseData(text);
          resolve({ message: 'ok', data: tableData });
        }).catch(error => rejects(error));
    });
  }

  static #parseData = data => {
    const rows = data.split("\n");
    const header = FundamentusService.#getTableHeader(rows);
    const content = FundamentusService.#getTableContent(rows);

    const tableObj = { header, rows: [] };

    let index = 0;
    let obj = {};
    content.forEach(row => {
      obj[header[index++]] = row;

      if (index >= header.length) {
        index = 0;
        tableObj.rows.push(obj);
        obj = {};
      }
    });

    return tableObj;
  }

  static #getTableContent(rows) {
    return rows
      .filter(line => line.includes('</td>'))
      .map(line => (FundamentusService.#LINK_REGEX.exec(line) || FundamentusService.#CELL_REGEX.exec(line) || [])[1])
      .filter(line => line != null);
  }

  static #getTableHeader(rows) {
    return rows
      .filter(line => line.includes('</th>'))
      .map(line => (FundamentusService.#LINK_REGEX.exec(line) || [])[1])
      .filter(col => col != null);
  }
}

module.exports = FundamentusService;