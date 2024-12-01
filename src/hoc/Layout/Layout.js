import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import withClass from '../../hoc/withClass/withClass';
import classes from './Layout.module.css';
import Nav from './nav/nav';
import RouterHandler from '../../router/router';



const Layout = () => {

  return (
    <Aux>
      <header>
        <Nav/>
      </header>

      <main>
        <RouterHandler/>
      </main>
    </Aux>
  );
};

export default withClass(Layout, classes.Layout);