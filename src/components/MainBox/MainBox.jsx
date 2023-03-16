import React, { useContext, useEffect, useState } from 'react'
import useWindowResize from '../../hooks/useWindowResize';
import { UserContext } from '../../pages/HomePage';
import NameChip from '../NameChip/NameChip'
import NoteChip from '../NoteChip/NoteChip'
import styles from './MainBox.module.css'

export default function MainBox(selectedItem) {

  let [newNote, setNewNote] = useState('');
  let [updateNotes, setUpdateNotes] = useState(true);

  let storedData = localStorage.getItem('data');
  let currData = storedData ? JSON.parse(storedData) : [];
  const { selectedNote } = useContext(UserContext);

  function handleChange(e) {

    setNewNote(e.target.value);
  }
  function addNote(date, time) {
    const addNoteData = {
      detail: newNote,
      time: time,
      date: date
    }
    const newData = currData.map((item) => {
      if (selectedItem.name === item.name) {

        selectedItem.notes.push(addNoteData);
        setNewNote('');

        return selectedItem;
      }
      else
        return item;
    })

    localStorage.setItem('data', JSON.stringify(newData));
    setUpdateNotes(true);
  }
  function createNote() {

    newNote = newNote.trim();

    if (newNote.length > 0) {
      var today = new Date();
      var date = today.getDate() + ' ' + today.toLocaleString('default', { month: 'long' }) + ' ' + today.getFullYear();

      var hours = today.getHours() > 12 ? today.getHours() - 12 : today.getHours();
      var am_pm = today.getHours() >= 12 ? "PM" : "AM";
      hours = hours < 10 ? "0" + hours : hours;
      var minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();

      var time = hours + ":" + minutes + " " + am_pm;
      var dateTime = date + ' ' + time;


      addNote(date, time);
    }

  }

  const [displayNotes, setDisplayNotes] = useState([]);


  useEffect(() => {

    if (updateNotes) {
      setDisplayNotes(
        selectedItem.notes.map((notes) => {
          return (
            <NoteChip {...notes} />
          )
        })
      )
      setUpdateNotes(false);
    }

  }, [updateNotes])

  useEffect(() => {
    setDisplayNotes(
      selectedItem.notes.map((notes) => {
        return (
          <NoteChip {...notes} />
        )
      })
    )
  }, [selectedNote])


  return (
    <>
      <div className={styles.main}>
        <div className={styles.box1}>
          <NameChip {...selectedItem} />
        </div>
        <div className={styles.box2}>
          {displayNotes}
        </div>
        <div className={styles.box3}>
          <div className={styles.box4}>
            <div className={styles.box5}>
              <textarea spellcheck="false" placeholder="Enter your text here..." className={styles.box7}
                onChange={handleChange}
                onKeyDown={(e) => {

                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    createNote();
                  }


                }}
                value={newNote}
              >

              </textarea>
            </div>
            <div className={styles.box6}>
              <div className={styles.box8} onClick={createNote}

              >
                <img className={styles.img1} src='../../Images/submitIcon.png'></img>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}
