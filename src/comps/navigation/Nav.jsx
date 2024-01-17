import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './nav.module.css';

const Nav = () => {
  return (
    <div className={styles.nav_wrapper}>
        <div className={styles.heading}>
            <h1>crop</h1>
        </div>

        <div className={styles.menus}>
        
        <NavLink className={styles.nav} to="/">Home</NavLink>

        <NavLink className={styles.nav} to="/history">history</NavLink>
        <NavLink className={styles.nav} to="/setting">settings</NavLink>
        <NavLink className={styles.login} to="/login">login</NavLink>
        </div>
    </div>
  )
}

export default Nav