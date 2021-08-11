import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import './miniLoading.css';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '49.8%',
    '& > * + *': {
      marginTop: theme.spacing(6),
    },
  },
}));

function MiniLoading() {
    const classes = useStyles();
    return (
      <div className="background-container">
        <Container>
        <div className={classes.root}>
          <LinearProgress color="secondary" className="loading" />
        </div>   
        </Container>
      </div>
    )
}

export default MiniLoading;
