import React from 'react';
import styles from './result.module.css'
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Result = ({props}) => {

  const location=useLocation();
  console.log(location.state.crop);

  return (
    <div className={styles.result_wrap}>
        <div className={styles.heading}>
            <h1>the recommended crop is</h1>
            <h2>{location.state.crop}</h2>
        </div>


        <div className={styles.button}>
          <NavLink to="/crops"><button>try again</button></NavLink>
        </div>
    </div>
  )
}

export default Result