/* eslint-disable no-console */
const express = require('express');
const axios = require('axios');

const router = express.Router();

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'testing') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

// var baseUrl = 'http://18.223.238.72/reviews/';
var baseUrl = 'http://localhost:3001/reviews'

router.get('/revs', (req, res) => {
  axios
    .get(baseUrl, {
      params: {
        product_id: req.query.product_id,
        count: req.query.count,
        page: req.query.page,
        sort: req.query.sort
      }
    })
    .then((response) => response.data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

router.post('/revs', (req, res) => {
  axios.post(baseUrl, {
    product_id: req.body.product_id,
    rating: req.body.rating,
    summary: req.body.summary,
    body: req.body.body,
    recommend: req.body.recommend,
    name: req.body.name,
    email: req.body.email,
    photos: req.body.photos,
    characteristics: req.body.characteristics
  })
    .then((response) => {
      res.status(201);
      res.send(response.data);
      console.log('post success');
    })
    .catch((err) => {
      console.log('Post failed');
      console.log(err);
      //res.send();
    });
});

router.get('/meta', (req, res) => {
  axios
    .get(baseUrl + '/meta', {
      params: {
        product_id: req.query.product_id
      }
    })
    .then((response) => response.data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

router.put('/revs/helpful', (req, res) => {
  axios.put(baseUrl + `${req.query.review_id}/helpful`, {})
    .then(() => {
      res.status(204);
      res.send();
    })
    .catch((err) => {
      console.log(err);
      res.send();
    });
});

router.put('/report', (req, res) => {
  axios.put(baseUrl + `${req.query.review_id}/report`, {})
    .then(() => {
      res.status(204);
      res.send();
    })
    .catch((err) => {
      console.log(err);
      res.send();
    });
});

module.exports.router = router;
