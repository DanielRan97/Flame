import React from 'react';
import Aux from '../../../../hoc/Auxiliary/Auxiliary.js';
import withClass from '../../../withClass/withClass.js';
import classes from "./profileButton.module.css";

const profileButton = () => {

  return (
    <Aux>
        <button></button>
    </Aux>
  );
};

export default withClass(profileButton , classes.profileButton);