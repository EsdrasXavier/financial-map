'use strict';

const FormData = require('form-data');
const http = require('http');
const HOST = 'www.fundamentus.com.br';
const FUNDAMENTUS_URL = `http://${HOST}/resultado.php`;

const FundamentusService = {

  async fetchStocks() {
    return new Promise((resolve, rejects) => {

      const form = new FormData();
      form.append('firma_ebit_min', 0);
      form.append('firma_ebitda_min', 0);
      form.append('liq_min', 200000);
      form.append('negociada', 'ON');
      form.append('ordem', 1);
      form.append('x', 26);
      form.append('y', 17);

      const options = {
        method: 'POST',
        port: 80,
        hostname: HOST,
        path: FUNDAMENTUS_URL,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.193 Safari/537.36',
          'Content-Type': 'application/json; charset=utf-8',
          'Cookie': 'PHPSESSID=543dfeb728a30a16429ba7af187aa864'
        }
      };

      const request = http.request(options, (res) => {
        res.setEncoding('utf-8');

        let data = '';

        res.on('data', chunk => data += chunk);

        res.on('end', () => {
          const linkRegex = new RegExp(/<a [^>]+>(.*?)<\/a>/);
          const cellRegex = new RegExp(/<td>(.*?)<\/td>/);
          const rows = data.split("\n");

          const header = rows
            .filter(line => line.includes('</th>'))
            .map(line => (linkRegex.exec(line) || [])[1])
            .filter(col => col != null);
          const content = rows
            .filter(line => line.includes('</td>'))
            .map(line => (linkRegex.exec(line) || cellRegex.exec(line) || [])[1])
            .filter(line => line != null);

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

          resolve({ message: 'ok', data: tableObj });
        });
      });

      request.on('error', error => {
        console.error(error);
        rejects(error);
      });

      form.pipe(request);
    });
  }
}

module.exports = FundamentusService;