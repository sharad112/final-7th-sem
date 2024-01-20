import React from 'react';
import { database } from '../../../firebase/firebase';
import styles from './history.module.css'
const History = () => {
  console.log(database,"firebase database");
  return (
    <div className={styles.history_wrapper} >
      <div className={styles.h_left}>
        <div className="h_lefttop">
          <h1>prediction history</h1>
          <input type="text" name="" id="" placeholder='search for predection' />
        </div>


        <div className="h_leftbottom">
          <div className="history_card">
              <h3>history from this date</h3>
          </div>
        </div>
      </div>

      <div className="h_right">
        <h1>history details tab</h1>
      </div>
    </div>
  )
}

export default History