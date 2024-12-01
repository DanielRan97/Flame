import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../../contexts/ThemeContext/ThemeContext';
import { useNavigate } from 'react-router-dom';
import classes from './nav.module.css';
import Aux from '../../Auxiliary/Auxiliary';
import withClass from '../../withClass/withClass';
import { signOut } from '../../../ridux/reducers/authSlice';

const Nav = () => {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isUserLogIn = useSelector((state) => state.auth.user);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme, isUserLogIn]);

    const navToAuth = (page) => () => {
        navigate(`/${page}`);
    };

    const handleSignOut = async () => {
        await dispatch(signOut());
    };

    const isObjEmpty = (obj) => JSON.stringify(obj) === '{}';

    return (
        <Aux>
            <nav>
                <h2 onClick={navToAuth('')} className={classes.NavHeader}>
                    Flame
                </h2>
                <button onClick={toggleTheme}>
                    Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
                </button>

                <button
                    className={classes.AuthButton}
                    onClick={isObjEmpty(isUserLogIn) ? navToAuth('auth') : handleSignOut}
                >
                    {isObjEmpty(isUserLogIn) ? 'Log in/Sign up' : 'Sign Out'}
                </button>
            </nav>
        </Aux>
    );
};

export default withClass(Nav, classes.Nav);
