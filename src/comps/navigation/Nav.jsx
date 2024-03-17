import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './nav.module.css';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import auth from '../../firebase/firebase';

const Nav = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    // Clean up subscription
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('User signed out');
      })
      .catch((error) => {
        // An error happened.
        console.error('Error signing out:', error);
      });
  };

  return (
    <div className={styles.nav_wrapper}>
      <div className={styles.heading}>
        <h1>crop</h1>
      </div>

      <div className={styles.menus}>
        <NavLink className={styles.nav} to="/">
          Home
        </NavLink>
        <NavLink className={styles.nav} to="/history">
          History
        </NavLink>
        <NavLink className={styles.nav} to="/dashboard">
          Dashboard
        </NavLink>

        <NavLink className={styles.nav} to="/threads">
          threads
        </NavLink>
        
      </div>

      <div className="buttons">
      {loggedIn ? (
          <button className={styles.login} onClick={handleSignOut}>
            Sign Out
          </button>
        ) : (
          <NavLink className={styles.login} to="/login">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Nav;
