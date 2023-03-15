import React from 'react'
import styles from './NoteChip.module.css'
export default function NoteChip(notes) {
  return (
    <div className={styles.main}>
      <div className={styles.time}>
        <p className={`${styles.text1} ${styles.text}`}>{notes.time}   </p>
        <p className={`${styles.text2} ${styles.text}`}>{notes.date}</p>
      </div>
      <div className={styles.note}>
        <p className={`${styles.text3} ${styles.text}`}>{notes.detail}</p>
      </div>
    </div>
  )
}
