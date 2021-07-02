const express = require('express');
const axios = require('axios');

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'testing') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

// const { GITHUB_API_KEY } = process.env;

// , {
//   headers: {
//     Authorization: GITHUB_API_KEY
//   }
// }

const router = express.Router();
const url = 'http://18.117.186.33';

// Get request for a question with a default page of 1
router.get('/questions', (req, res) => {
  axios.get(`${url}/qa/questions`, {
    // headers: {
    //   Authorization: GITHUB_API_KEY
    // },
    params: {
      product_id: req.query.product_id,
      page: req.query.page || 1,
      count: req.query.count || 5
    }
  })
    .then((response) => response.data)
    .then((questions) => {
      res.send(questions);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      res.send();
    });
});

// Post request for a new question
router.post('/questions', (req, res) => {
  axios.post(`${url}/qa/questions`, {
    body: req.body.body,
    name: req.body.name,
    email: req.body.email,
    product_id: req.body.product_id
  }, {
    // headers: {
    //   Authorization: GITHUB_API_KEY
    // }
  })
    .then((response) => {
      res.status(201).send(response.data);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      res.send();
    });
});

// Update the helpfulness of a question
router.put('/questions/helpful', (req, res) => {
  axios.put(`${url}/qa/questions/${req.query.question_id}/helpful`, {})
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      res.send();
    });
});

// Report a question
router.put('/questions/report', (req, res) => {
  axios.put(`${url}/qa/questions/${req.query.question_id}/report`, {}, {
    // headers: {
    //   Authorization: GITHUB_API_KEY
    // }
  })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      res.send();
    });
});

// Get answers to a question
router.get('/answers', (req, res) => {
  axios.get(`${url}/qa/questions/${req.query.question_id}/answers`, {
    // headers: {
    //   Authorization: GITHUB_API_KEY
    // },
    params: {
      page: req.query.page || 1
    }
  })
    .then((response) => response.data)
    .then((answers) => {
      res.send(answers);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      res.send();
    });
});

// Post a new answer to a question
router.post('/answers', (req, res) => {
  axios.post(`${url}/qa/questions/${req.query.question_id}/answers`, {
    body: req.body.body,
    name: req.body.name,
    email: req.body.email,
    photos: req.body.photos
  }, {
    // headers: {
    //   Authorization: GITHUB_API_KEY
    // }
  })
    .then((response) => {
      res.status(201).send(response.data);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      res.send();
    });
});

// Update the helpfulness of an answer
router.put('/answers/helpful', (req, res) => {
  axios.put(`${url}/qa/answers/${req.query.answer_id}/helpful`, {}, {
    // headers: {
    //   Authorization: GITHUB_API_KEY
    // }
  })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      res.send();
    });
});

// Report an answer
router.put('/answers/report', (req, res) => {
  axios.put(`${url}/qa/answers/${req.query.answer_id}/report`, {}, {
    // headers: {
    //   Authorization: GITHUB_API_KEY
    // }
  })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      res.send();
    });
});

module.exports.router = router;
module.exports.url = url;
