import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary.js';
import classes from './homePage.module.css';

const HomePageContainer = () => {

  return (
    <Aux>
        <h2 className={classes.HomePageHeader}>Flame - HomePage</h2>
    </Aux>
  );
};

export default HomePageContainer;