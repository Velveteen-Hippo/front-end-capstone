import React, { useContext, useState, useEffect } from 'react';
import { Slider, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { ReviewsContext } from '../../../helpers/context';

// helper function
import { getCharLowHighVals, getMarks } from '../helperFunctions.jsx';


const useStyles = makeStyles(() => ({
  parentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '5%'
  },
  sliderChartsParent: {
    width: '100%'
  },
  sliderChart: {
    width: '100%',
    marginTop: '5%'
  },
  charLabels: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  charLabelText: {
    fontSize: '10px'
  }
}));

const ProductReviewSlider = withStyles({
  root: {
    // color: 'rgba(128,128,128, 1)', GREY COLOR
    color: 'rgba(63, 195, 128, 1)', // GREEN COLOR
    height: 10
  },
  thumb: {
    height: 20,
    width: 10,
    backgroundColor: 'rgba(38, 166, 91, 1)',
    border: '2px solid black',
    marginTop: -5,
    marginLeft: 0,
    marginRight: 0,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit'
    },
    borderRadius: '40%'
  },
  active: {},

  track: {
    height: 10,
    borderRadius: 0,
    margin: 0
  },
  rail: {
    height: 10,
    borderRadius: 0,
    margin: 0
  },
  mark: {
    backgroundColor: '#000000',
    marginTop: -0.5,
    height: 11,
    width: 5,
    borderRadius: '30%'
  },
  markActive: {
    opacity: 1,
    backgroundColor: '#000000'
  },
  disabled: {
    '& .MuiSlider-thumb': {
      height: 20,
      width: 10,
      backgroundColor: 'rgba(38, 166, 91, 1)',
      border: '2px solid black',
      marginTop: -5,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit'
      }
    },
    height: 10
  }
})(Slider);

function valuetext(value) {
  return `${value}`;
}

const ProductReviewChart = () => {
  const { revsMetaData } = useContext(ReviewsContext);
  const [charValPairs, setCharValPairs] = useState([]);
  const getChar = () => {
    const resultArr = [];
    const charKeys = Object.keys(revsMetaData.characteristics);
    charKeys.forEach((key) => {
      const charNumVal = revsMetaData.characteristics[key].value;

      const charArr = [key, Number(charNumVal).toFixed(2), getMarks(), getCharLowHighVals(key)];
      resultArr.unshift(charArr);
    });
    setCharValPairs(resultArr);
  };

  useEffect(() => {
    if (revsMetaData) {
      if (revsMetaData.characteristics) {
        getChar();
      }
    }
  }, [revsMetaData]);

  const classes = useStyles();

  return (
    <div className={classes.parentContainer}>
      <Typography id="discrete-slider" gutterBottom>
        Product Review Chart
      </Typography>

      <div className={classes.sliderChartsParent}>
        {charValPairs.map((item) => (
          <div key={item[0]} className={classes.sliderChart}>
            <Typography className={classes.chartTitles} gutterBottom>
              {item[0]}
            </Typography>
            <ProductReviewSlider
              defaultValue={item[1]}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="on"
              step={10}
              marks={item[2]}
              min={1.00}
              max={5.00}
              disabled
            />
            <div className={classes.charLabels}>
              <Typography className={classes.charLabelText}>
                {item[3][0].label}
              </Typography>
              <Typography className={classes.charLabelText}>
                {item[3][1].label}
              </Typography>
            </div>
          </div>
        ))}

        {/* End of innerContainer */}
      </div>

      {/* End of ParentContainer */}
    </div>
  );
};

export default ProductReviewChart;
