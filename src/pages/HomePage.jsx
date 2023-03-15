import React, { createContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import MainBox from '../components/MainBox/MainBox'
import styles from './HomePage.module.css'
import MainBoxEmpty from '../components/MainBoxEmpty/MainBoxEmpty';


const UserContext = createContext();
export default
    function HomePage() {
    const [showMain, setShowMain] = useState(false);

    const [dataAvailable, setDataAvailable] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(false);
    const [selectedNote, setSelectedNote] = useState({});
    const [selectedChip, setSelectedChip] = useState('');
    useEffect(() => {
        const tempData = localStorage.getItem('data');
        if (tempData) {
            setDataAvailable(true);
            // console.log("checking data availability in main");
        }
    }, [])



    return (
        <UserContext.Provider value={{
            showMain, setShowMain, selectedNote, setSelectedNote, selectedChip, setSelectedChip, dataAvailable, setDataAvailable
            , dataUpdate, setDataUpdate
        }}>
            <div className={styles.main}>
                <div className={styles.sideBar}>
                    <Sidebar />
                </div>
                <div className={styles.MainBox}>
                    {showMain ? < MainBox {...selectedNote} /> : <MainBoxEmpty />}

                </div>
            </div>
        </UserContext.Provider>

    )
}
export { UserContext };