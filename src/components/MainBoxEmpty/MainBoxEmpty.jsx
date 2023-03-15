import React from 'react'
import styles from './MainBoxEmpty.module.css'
export default function MainBoxEmpty() {
    return (
        <div className={styles.main}>
            <div className={styles.imageBox}>
                <img className={styles.diary} src='../../Images/notebook.png'></img>
            </div>
            <div className={styles.box}>
                <p className={styles.text1}>Pocket Notes</p>
            </div>
            <div className={styles.box}>
                <p className={styles.text2}>Your world, organized!</p>
            </div>
            <div className={styles.box}>
                <p className={styles.text3}>
                    Get organized in notebook you can divide into color coded pages.
                </p>
            </div>
        </div>
    )
}
