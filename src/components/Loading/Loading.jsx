import React from 'react';
import styles from './Loading.module.css'; // Import the CSS file for styling

const Loading = ({ value }) => {
  return (
    <div className={styles.container}>
      <progress value={value} max={100}></progress>
      <label>Generating . . .</label>
    </div>
  );
};

export default Loading;
