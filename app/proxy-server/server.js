const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/proxy/salesmanago', (req, res) => {
  const options = {
    url: 'https://app3.salesmanago.com/api/contact/upsert',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept': 'application/json'
    },
    json: req.body
  };
  
  request(options, (error, response, body) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.status(response.statusCode).send(body);
  });
});

app.listen(3000, () => {
  console.log('Proxy server listening on port 3000');
});