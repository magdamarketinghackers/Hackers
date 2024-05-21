const request = require('request');

export default (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

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
      return res.status(500).json({ error: error.message });
    }
    res.status(response.statusCode).json(body);
  });
};
