import React from 'react'
import styles from './Navbar.module.css'
export default function Navbar(props) {
    return (
        <div className={styles.main}>
            <div className={styles.menuBox} onClick={props.handleChange}>
                <img className={styles.image} src='../../Images/hamburger.png'></img>
            </div>
            <div className={styles.titleBox}>
                <p className={styles.text}>Pocket Notes</p>
            </div>
        </div>
    )
}
