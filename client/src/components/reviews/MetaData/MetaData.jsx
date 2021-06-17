import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

import { AppContext, ReviewsContext } from '../../../helpers/context';

// Import components
import ReviewPercentageAndStars from './ReviewPercentageAndStars.jsx';
import StarBarChart from './StarBarChart.jsx';
import ProductReviewChart from './ProductReviewChart.jsx';
import RecommendPercentage from './RecommendPercentage.jsx';

const { GITHUB_API_KEY } = require('../../../../../config');

const MetaData = () => {
  const { product } = useContext(AppContext);
  const [revsMetaData, setRevsMetaData] = useState({});

  const getAllRevsMetaData = (productID) => {
    axios
      .get('/api/reviews/meta', {
        headers: {
          Authorization: GITHUB_API_KEY
        },
        params: {
          product_id: productID
        }
      })
      .then((response) => {
        setRevsMetaData(response.data);
      });
  };

  useEffect(() => {
    getAllRevsMetaData(product.id);
  }, [product]);

  return (
    <ReviewsContext.Provider value={{ revsMetaData }}>
      <div>
        <ReviewPercentageAndStars />
        <RecommendPercentage />
        <StarBarChart />
        <ProductReviewChart />
      </div>
    </ReviewsContext.Provider>
  );
};

export default MetaData;
