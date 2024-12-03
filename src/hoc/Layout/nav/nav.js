import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../../contexts/ThemeContext/ThemeContext';
import { useNavigate } from 'react-router-dom';
import classes from './nav.module.css';
import Aux from '../../Auxiliary/Auxiliary';
import withClass from '../../withClass/withClass';
import { signOut } from '../../../ridux/reducers/authSlice';
import ProfileButton from "./profileButton/profileButton"

const Nav = () => {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isUserLoggedIn = useSelector((state) => state.auth.user?.uid);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const handleSignOut = async () => {
        const res = await dispatch(signOut());
        if (!res.payload) {
            navigate('/auth');
        }
    };

    const handleNavigation = (path) => () => {
        navigate(path);
    };

    return (
        <Aux>
            <header className={classes.NavHeaderWrapper}>
                <nav className={classes.NavBar}>
                    <h2 onClick={handleNavigation('/')} className={classes.NavHeader}>
                        Flame
                    </h2>
                    <button onClick={toggleTheme} className={classes.ThemeToggleButton}>
                        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
                    </button>
                    <button
                        className={classes.AuthButton}
                        onClick={isUserLoggedIn ? handleSignOut : handleNavigation('/auth')}
                    >
                        {isUserLoggedIn ? 'Sign Out' : 'Log in/Sign up'}
                    </button>
                    <ProfileButton />
                </nav>
            </header>
        </Aux>
    );
};

export default withClass(Nav, classes.Nav);