import React from 'react';
import styles from './home.module.css';

const Home = () => {
  return (
    <div className={styles.home_wrapper} >
      <div className={styles.top}>
        <h1>Cultivate Prosperity: Precision Crop Recommendations, <br/> Your Future Yield Boost</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec lobortis tellus, interdum vulputate lacus. Mauris facilisis nisl ullamcorper massa porttitor pharetra.</p>
        
      </div>
      <div className="buttons">
      <button className={styles.recommend} >get recommendation</button>
      </div>
    </div>
  )
}

export default Home