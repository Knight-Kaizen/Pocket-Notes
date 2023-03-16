import React, { createContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import MainBox from '../components/MainBox/MainBox'
import styles from './HomePage.module.css'
import MainBoxEmpty from '../components/MainBoxEmpty/MainBoxEmpty';
import useWindowResize from '../hooks/useWindowResize';
import Navbar from '../components/Navbar/Navbar';


const UserContext = createContext();
export default
    function HomePage() {
    const [showMain, setShowMain] = useState(false);

    const [dataAvailable, setDataAvailable] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(false);
    const [selectedNote, setSelectedNote] = useState({});
    const [selectedChip, setSelectedChip] = useState('');

    const { width, height } = useWindowResize();






    useEffect(() => {
        const tempData = localStorage.getItem('data');
        if (tempData) {
            setDataAvailable(true);

        }
    }, [])
    const [showSidebar, setShowSidebar] = useState(false);
    function handleChange(e) {

        setShowSidebar(showSidebar ? false : true);

    }

    return (
        <UserContext.Provider value={{
            showMain, setShowMain, selectedNote, setSelectedNote, selectedChip, setSelectedChip, dataAvailable, setDataAvailable
            , dataUpdate, setDataUpdate, setShowSidebar
        }}>

            <div className={width >= 600 ? styles.main : styles.main2}>
                <div className={width >= 600 ? styles.sideBar : styles.navBar}>
                    {width >= 600 && <Sidebar />}
                    {width < 600 && <Navbar handleChange={handleChange} />}
                </div>

                <div className={width >= 600 ? styles.MainBox : styles.MainBox2}>
                    {width < 600 && showSidebar ? <Sidebar /> :
                        showMain ? < MainBox {...selectedNote} /> : <MainBoxEmpty />}

                </div>
            </div>
        </UserContext.Provider>

    )
}
export { UserContext };