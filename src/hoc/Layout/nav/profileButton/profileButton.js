import React from 'react';
import Aux from '../../../Auxiliary/Auxiliary.js';
import classes from "./profileButton.module.css";
import ProfileMenu from './profileMenu/profileMenu.js';
import withClass from '../../../withClass/withClass.js';
const ProfileButton = () => {


  return (
    <Aux>
        <button className={classes.profilePhotoButton}>
        </button>
    </Aux>
  );
};

export default withClass(ProfileButton , classes.profileButton);