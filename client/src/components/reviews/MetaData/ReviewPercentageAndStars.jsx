import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// helper functions
import { calcAvgRating, calcStarRating } from '../helperFunctions.jsx';

import { ReviewsContext } from '../../../helpers/context';
import StarRating from './StarRating.jsx';

const useStyles = makeStyles(() => ({
  parentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avgRating: {
    fontSize: 'xxx-large',
    padding: '10px'
  },
  reviewStarRating: {
    padding: '10px'
  }
}));

const ReviewPercentageAndStars = () => {
  const { revsMetaData } = useContext(ReviewsContext);
  const [avgRating, setAvgRating] = useState(0);

  const getAvgRating = () => {
    if (Object.keys(revsMetaData).length !== 0) {
      if (revsMetaData.ratings !== null && revsMetaData.ratings !== undefined && Object.keys(revsMetaData.ratings).length !== 0) {
        const ratingsObject = revsMetaData.ratings;
        setAvgRating(calcAvgRating(ratingsObject));
      }
    }
  };

  useEffect(() => {
    getAvgRating();
  }, [revsMetaData]);

  // useEffect(() => {
  //   setRevStarRating(calcStarRating(avgRating));
  // }, [avgRating]);

  const classes = useStyles();
  return (
    <div className={classes.parentContainer} id="starsAndPercent">
      <div className={classes.avgRating}>{avgRating.toFixed(1)}</div>
      <StarRating avgRating={avgRating} />
    </div>
  );
};

export default ReviewPercentageAndStars;
