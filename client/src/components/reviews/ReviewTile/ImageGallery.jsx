import React, { useContext, useState, useEffect } from 'react';
import { Card, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ImageModal from '../../global/ImageDialog.jsx';

import { ReviewsContext } from '../../../helpers/context';

const useStyles = makeStyles((theme) => ({
  parentContainer: {
    padding: '10px',
    margin: '15px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19)',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    overflow: 'auto'
  },
  image: {
  }
}));

const ImageGallery = (props) => {
  const { reviewResults } = useContext(ReviewsContext);
  const [photosArr, setPhotosArr] = useState([]);

  const createImageGallery = () => {
    if (props.revPhotos !== null) {
      setPhotosArr(props.revPhotos);
    } else {
      setPhotosArr([]);
    }
  };
  useEffect(() => {
    createImageGallery();
  }, [reviewResults]);

  const classes = useStyles();
  if (photosArr.length > 0) {
    return (
      <Card className={classes.parentContainer}>
        <Grid className={classes.gridList}>
          {photosArr.map((photo) => (
            <ImageModal key={photo.id} url={photo.url} />
          ))}
        </Grid>
      </Card>
    );
  }
  return (
    <div />
  );
};

export default ImageGallery;
