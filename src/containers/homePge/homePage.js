import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary.js';
import classes from './homePage.module.css';
import Spinner from '../../utilities/loading/loading.js'

const HomePageContainer = () => {

 // const count = useSelector((state) => state.counter.value);

  return (
    <Aux>
        <h2 className={classes.HomePageHeader}>Flame - HomePage</h2>
        <Spinner />
    </Aux>
  );
};

export default HomePageContainer;