import React from 'react';
import Card from './Card/Card';
import { data } from './random';
import styles from './dash.module.css';
import Bottom from './bottom/Bottom';
const Dashboard = () => {
  return (
    <div>
      <div className="top">
      <div className={styles.top_heading}>
            <h1>basic datas</h1>
            <h3>view more</h3>
        </div>
        <div className={styles.top_cards}>
        {
            data.map((value)=>
            {
                return(
                    <Card/>
                )
            })
        }
        </div>
      </div>

      <div className="bottom">

        <div className="bottom_top">
            <h1>charts and visualization</h1>
        </div>
            <Bottom/>
      </div>
    </div>


  )
}

export default Dashboard