import React from 'react';
import Card from './Card/Card';
import styles from './dash.module.css';
import Bottom from './bottom/Bottom';
import data from './data'
import img from './charts/matrix.png'
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
                    <Card name={value.name} data={value.data} />
                )
            })
        }
        </div>
      </div>

      <div className={styles.bottom}>

        <div className={styles.bottom_top}>
            <h1>confusion matrix and accuracy</h1>
        </div>
            <div className="bottom_bottom">
              <div className={styles.matrix}>
                <img src={img} alt="" srcset="" />
              </div>
            </div>
      </div>
    </div>


  )
}

export default Dashboard