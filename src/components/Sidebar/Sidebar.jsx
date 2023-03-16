import React, { useContext, useEffect, useRef, useState } from 'react'
import Groups from '../Groups/Groups';

import styles from './Sidebar.module.css'
import { UserContext } from '../../pages/HomePage';
import NameChip from '../NameChip/NameChip';
import useWindowResize from '../../hooks/useWindowResize';
export default function Sidebar() {

  //--------------------------Functionality-----------------------

  const { showMain, setSelectedChip, setSelectedNote, setShowMain, dataAvailable, setDataAvailable, dataUpdate, setDataUpdate } = useContext(UserContext);
  const { width } = useWindowResize();
  let newGroupName = '';
  let newGroupColor = 1;

  const [modalDisplay, setModalDisplay] = useState(false);


  let storedData = localStorage.getItem('data');
  let currData = storedData ? JSON.parse(storedData) : [];
  const [isBlank, setIsBlank] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  function handleChange(e) {
    newGroupName = e.target.value;

  }
  function createGroup(e) {

    setIsBlank(false);
    setIsRepeat(false);
    newGroupName = newGroupName.trim();
    let blankLocal = false, repeatLocal = false;

    if (newGroupName.length == 0)
      blankLocal = true;

    currData.map((item) => {
      if (item.name == newGroupName)
        repeatLocal = true;
    })

    if (blankLocal == false && repeatLocal == false) {
      const newData = {
        name: newGroupName,
        color_id: newGroupColor,
        notes: []
      }
      currData.push(newData);
      localStorage.setItem('data', JSON.stringify(currData));
      setModalDisplay(false);
      setDataAvailable(true);
      setDataUpdate(true);
      setSelectedNote(newData);
      setSelectedChip(newData.name);
      setShowMain(true);
    }
    else {
      if (blankLocal)
        setIsBlank(true);
      if (repeatLocal)
        setIsRepeat(true);
    }

  }
  //-------------------------------UI--------------------------------

  const Modal = () => (
    <div className={styles.modalarea}>
      <div className={width >= 600 ? styles.newModal : styles.newModal2}>

        <div className={styles.modalBox1}>
          <p className={styles.modalText3}>Create New Notes</p>
          <p className={`${width >= 600 ? styles.modalText3 : styles.modalText31} ${width >= 600 ? styles.closeBtn : styles.closeBtn2}`} onClick={(e) => { setModalDisplay(false) }}>X</p>
        </div>
        <div className={width >= 600 ? styles.modalBox2 : styles.modalBox22}>
          <p className={styles.modalText1}>Group Name</p>

          <input className={styles.modalInput1} type='text' spellCheck='false' placeholder='Enter your group name...'
            onChange={handleChange}
          // onClick = {(e)=>{

          // }}
          ></input>


        </div>
        <div className={width >= 600 ? styles.modalValidation : styles.modalValidation2}>{<p className={styles.validationText}>{isBlank ? 'Feild can\'t be blank!' : isRepeat ? 'Group with same name exists' : ''}</p>}</div>
        <div className={width >= 600 ? styles.modalBox3 : styles.modalBox32}>
          <p className={styles.modalText1}>Choose color</p>
          <div className={styles.modalColorBox}>
            <div className={`${styles.color1} ${width >= 600 ? styles.color : styles.color22}`} onClick={() => { newGroupColor = 1 }}></div>
            <div className={`${styles.color2} ${width >= 600 ? styles.color : styles.color22}`} onClick={() => { newGroupColor = 2 }}></div>
            <div className={`${styles.color3} ${width >= 600 ? styles.color : styles.color22}`} onClick={() => { newGroupColor = 3 }}></div>
            <div className={`${styles.color4} ${width >= 600 ? styles.color : styles.color22}`} onClick={() => { newGroupColor = 4 }}></div>
            <div className={`${styles.color5} ${width >= 600 ? styles.color : styles.color22}`} onClick={() => { newGroupColor = 5 }}></div>
            <div className={`${styles.color6} ${width >= 600 ? styles.color : styles.color22}`} onClick={() => { newGroupColor = 6 }}></div>
          </div>
        </div>
        <div className={styles.modalBox4}>
          <div className={styles.button2} onClick={createGroup}>
            <p className={styles.text4}>Create</p>
          </div>
        </div>
      </div>
    </div>
  )


  return (
    <>
      <div className={styles.main}>
        {width >= 600 && <div className={styles.box1}>
          <p className={styles.text1}>Pocket Notes</p>
        </div>}
        <div className={styles.box2}>
          <div className={styles.button1} onClick={() => {
            setModalDisplay(true);

          }}>

            <pre className={styles.text2}><p className={styles.text3}>+</p> Create Notes</pre>
          </div>
        </div>
        <div className={styles.box3}>
          <Groups />
        </div>
      </div>
      {modalDisplay && <Modal />}
    </>
  )
}
