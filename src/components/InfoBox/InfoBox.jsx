import React from 'react';
import styles from './InfoBox.module.css';

const InfoBox = ({ title, value }) => {
  return (
    <div className={styles.infoBox}>
      <p className={styles.title}>{title}</p>
      <p className={styles.value}>{value}</p>
    </div>
  );
};

export default InfoBox;