import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Note from "./Note/Note";
import { Row, Spinner,Col } from "react-bootstrap";
import NoteModal from "./NoteModal";
import StackGrid from 'react-stack-grid'

function Notes({ setCurrentId, currentId,listView,tab }) {
  const notes = useSelector((state) => state.notes);
  console.log(notes, "bro I am here");
  const [modalShow, setModalShow] = useState(false);
  const user = JSON.parse(localStorage.getItem('profile'));


  

  const handleModal = () => {
    setModalShow(true);
  };




console.log(notes.length)

 


  return (
    <div>
      <Row style={{ marginTop: "40px" }}>
        <Col lg={listView ? {offset:2,span:7} : 12}>
          {!notes && <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>}
        {notes && notes.length === 0 ? (
          <div>
            No notes to Show
          </div>
        ) : (<> 
          {!listView ? <StackGrid columnWidth={220} gutterWidth={15} gutterHeight={15}>
            {notes && notes.map((note) => { 
              if(note.archive === false && tab === "first" && (user?.result?.googleId === note?.creator || user?.result?._id === note?.creator)){
              return (
                <Note
                  setCurrentId={setCurrentId}
                  handleModal={handleModal}
                  key={note._id}
                  note={note}
                />
              );} else if(note.archive === true && tab === "fourth" && (user?.result?.googleId === note?.creator || user?.result?._id === note?.creator)){
                return (
                  <Note
                    setCurrentId={setCurrentId}
                    handleModal={handleModal}
                    key={note._id}
                    note={note}
                  />
                );}
            })} 

          
            </StackGrid>:  <>
            {notes.map((note) => {
               if(note.archive === false && tab === "first" && (user?.result?.googleId === note?.creator || user?.result?._id === note?.creator)){
                return (
                  <div style={{marginBottom : "10px"}}>
                  <Note
                    setCurrentId={setCurrentId}
                    handleModal={handleModal}
                    key={note._id}
                    note={note}
                  />
                  </div>
                );} else if(note.archive === true && tab === "fourth" && (user?.result?.googleId === note?.creator || user?.result?._id === note?.creator)){
                  return (
                    <div style={{marginBottom : "10px"}}>
                    <Note
                      setCurrentId={setCurrentId}
                      handleModal={handleModal}
                      key={note._id}
                      note={note}
                    />
                    </div>
                  );}

            })}</> }

          </>)
        }
        </Col>
      </Row>
      <NoteModal
        currentId={currentId}
        show={modalShow}
        onHide={() => setModalShow(false)}
        notes={notes}
        setCurrentId={setCurrentId}
      />
    </div>
  );
}

export default Notes;