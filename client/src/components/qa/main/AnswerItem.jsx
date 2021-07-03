import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Container, Grid, Typography, Button
} from '@material-ui/core';

import ImageModal from '../../global/ImageDialog.jsx';
import { markAnswerHelpful, reportAnswer } from '../helpers/qaRequests';
import useStyles from '../muiStyles';

export default function AnswerItem({ answer }) {
  // State for if buttons are disabled
  const [disableHelpful, setDisableHelpful] = useState(false);
  const [disableReport, setDisableReport] = useState(false);
  // State for helpfulness counter
  const [helpfulness, setHelpfulness] = useState(answer.helpfulness);

  const classes = useStyles();

  /**
   * Formats a date to Mon d, yyyy
   * @param {Date} date
   * @return {string} A string formatted as Mon d, yyyy
   */
  function formatDate(date) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr',
      'May', 'Jun', 'Jul', 'Aug',
      'Sep', 'Oct', 'Nov', 'Dec'];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  return (
    <Container className={classes.answerContainer}>
      <Typography className={classes.answerBody}>{answer.body}</Typography>

      <Grid container>
        {answer.photos.map((photo) => <ImageModal key={photo} url={photo} />)}
      </Grid>

      <Grid container direction="row" alignItems="baseline" className={classes.answerInfo}>
        <Typography
          className="user"
          variant="body2"
          style={{ borderRight: '1px solid #555', paddingRight: 8, marginRight: 8 }}
        >
          {`by ${answer.answerer_name}, ${formatDate(new Date(answer.date))}`}
        </Typography>

        <Typography variant="body2">
          Helpful?
        </Typography>
        <Button
          type="button"
          disabled={disableHelpful}
          className={classes.linkButton}
          onClick={() => {
            markAnswerHelpful(answer.answer_id);
            setHelpfulness(helpfulness + 1);
            setDisableHelpful(true);
          }}
        >
          Yes
        </Button>
        <Typography variant="body2" style={{ borderRight: '1px solid #555', paddingRight: 8 }}>
          {`(${helpfulness})`}
        </Typography>

        <Button
          type="button"
          disabled={disableReport}
          className={classes.linkButton}
          onClick={() => {
            reportAnswer(answer.answer_id);
            setDisableReport(true);
          }}
        >
          Report
        </Button>
      </Grid>
    </Container>
  );
}

AnswerItem.propTypes = {
  answer: PropTypes.shape({
    answer_id: PropTypes.number,
    body: PropTypes.string,
    helpfulness: PropTypes.number,
    answerer_name: PropTypes.string,
    date: PropTypes.string,
    // photos: PropTypes.arrayOf(PropTypes.shape({
    //   url: PropTypes.string
    // }))
  })
};

AnswerItem.defaultProps = {
  answer: {}
};
