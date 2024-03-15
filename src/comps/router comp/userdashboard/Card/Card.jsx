import React from 'react';
import styles from './dashboard.module.css';
import { CiMenuBurger } from "react-icons/ci";

const Card = ({name,data}) => {
  return (
    <div>
    <div className={styles.top_card}>
        <div className={styles.first_card}>
            <div className={styles.first_top}>
                <CiMenuBurger/>
                <h2>{name}</h2>
            </div>

            <div className={styles.first_bottom}>
                <h1>{data}</h1>
                {/* <h3>12% more than past month</h3> */}
            </div>
        </div>
        <div className="second-card">

        </div>
    </div>
    <div className="bottom_card">
        <div className="third-card">

        </div>

        <div className="fourth-card">

        </div>
    </div>
</div>
  )
}

export default Card