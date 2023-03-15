import React, { useContext, useEffect, useState } from 'react'
import styles from './Groups.module.css'
import NameChip from '../NameChip/NameChip';
import { UserContext } from '../../pages/HomePage';
export default function Groups(item) {

    //-----------------------Functionality-----------
    const { dataAvailable, selectedChip, setSelectedChip, setSelectedNote, dataUpdate, setDataUpdate, setShowMain } = useContext(UserContext);
    let storedData = localStorage.getItem('data');
    let currData = storedData ? JSON.parse(storedData) : [];
    let [chips, setChips] = useState(null);


    function handleClick(item, indx) {
        setSelectedChip(item.name);
        setShowMain(false);
        setShowMain(true);
        setSelectedNote(item);
        // console.log(item.name, " clicked");
    }



    function displayChips() {
        setChips(currData.map((item, indx) => {
            // console.log(item);
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
        // console.log('checking availability in groups')
        if (dataAvailable) {
            // console.log('groups: data available');
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
