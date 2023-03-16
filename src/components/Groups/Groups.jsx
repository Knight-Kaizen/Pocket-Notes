import React, { useContext, useEffect, useState } from 'react'
import styles from './Groups.module.css'
import NameChip from '../NameChip/NameChip';
import { UserContext } from '../../pages/HomePage';
export default function Groups(item) {

    //-----------------------Functionality-----------
    const { dataAvailable, setShowSidebar, selectedChip, setSelectedChip, setSelectedNote, dataUpdate, setDataUpdate, setShowMain } = useContext(UserContext);
    let storedData = localStorage.getItem('data');
    let currData = storedData ? JSON.parse(storedData) : [];
    let [chips, setChips] = useState(null);


    function handleClick(item, indx) {
        setSelectedChip(item.name);
        setShowMain(false);
        setShowMain(true);
        setSelectedNote(item);
        setShowSidebar(false);

    }



    function displayChips() {
        setChips(currData.map((item, indx) => {

            return (
                <div className={`${styles.setIt} ${item.name == selectedChip && styles.selected}`}

                    onClick={() => (handleClick(item, indx))}
                >
                    <NameChip
                        {...item}
                    />
                </div>
            )
        }))
    }

    useEffect(() => {
        if (dataAvailable) {
            displayChips();
        }
    }, [selectedChip])

    useEffect(() => {
        if (dataAvailable) {
            displayChips();
        }
    }, [dataAvailable])


    useEffect(() => {

        if (dataAvailable) {

            displayChips();

        }
        setDataUpdate(false);
    }, [dataUpdate])





    //-----------------------UI-----------------------




    return (
        <div className={styles.main}>
            {chips}
        </div>
    )
}
