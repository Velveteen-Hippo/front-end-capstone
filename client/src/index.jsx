import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Container from '@material-ui/core/Container';

import Banner from './components/Banner.jsx';
import ProductDisplay from './components/product-display/ProductDisplay.jsx';
import QuestionsAndAnswers from './components/qa/QuestionsAndAnswers.jsx';
import RatingsAndReviews from './components/reviews/RatingsAndReviews.jsx';

import { getProduct, getAllRevsMetaData } from './helpers/globalRequest';
import { AppContext } from './helpers/context';

function App() {
  const [product, setProduct] = useState({
    id: -1,
    campus: '',
    name: '',
    slogan: '',
    description: '',
    category: '',
    default_price: '',
    features: []
  });

  const [revsMetaData, setRevsMetaData] = useState({});

  useEffect(() => {
    getProduct()
      .then((productData) => {
        setProduct(productData);
      })
      // eslint-disable-next-line no-console
      .catch(() => console.log(new Error('Unable to get product')));
  }, []);

  useEffect(() => {
    if (product.id > -1) {
      getAllRevsMetaData(product.id)
        .then((reviewData) => {
          setRevsMetaData(reviewData);
        })
        // eslint-disable-next-line no-console
        .catch(() => console.log(new Error(`Unable to get review meta data using product id: ${product.id}`)));
    }
  }, [product]);

  return (
    <AppContext.Provider value={{ product, revsMetaData }}>
      <Container maxWidth="lg">
        <Banner />
        {/* <ProductDisplay /> */}
        <Container maxWidth="md" style={{ backgroundColor: '#f9f4f3', boxShadow: '0 4px 8px 0 rgb(0 0 0 / 5%), 0 6px 5px 0 rgb(0 0 0 / 4%)' }}>
          {/* <QuestionsAndAnswers /> */}
          <RatingsAndReviews />
        </Container>
      </Container>
    </AppContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
