import React from 'react'
import styles from './NameChip.module.css'

export default function NameChip(item) {
  const str = item.name;
  const rang = `color${item.color_id}`

  const initials = `${str.charAt(0).toLocaleUpperCase()}${str.charAt(1).toLocaleUpperCase()}`;
  return (
    <div className={styles.main}>
      <div className={`${styles.group}`}>
        <div className={`${styles.avatar} ${styles.avatarText}  ${styles[rang]}`} >
          {initials}
        </div>
        <p className={styles.text}>{str}</p>
      </div>
    </div>
  )
}
