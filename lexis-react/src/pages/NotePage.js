import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'; 

const NotePage = () => {
    let params = useParams();
    let noteId = params.id
    let [note, setNote] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        getNote()
    }, [noteId])

    let getNote = async () => {
      if(noteId === 'new') return

      let response = await fetch(`/api/notes/${noteId}/`)
      let data = await response.json()
      setNote(data)
    }

    let createNote = async () => {
      fetch(`/api/notes/create/`,{
        method: "POST",
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(note)
      })
    }
    let updateNote = async () => {
      fetch(`/api/notes/${noteId}/update/`,{
        method: "PUT",
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(note)
      })
    }
    let deleteNote = async () => {
      fetch(`/api/notes/${noteId}/delete/`,{
        method: "DELETE",
        headers: {
          'Content-Type':'application/json'
        }
      })
      navigate('/')
    }

  //handle click
    let handleSubmit = () => {
      if(noteId !== 'new' && note.body === ''){
        deleteNote() //if note is empty delete it
      } else if(noteId !== 'new'){
        updateNote()
      } else if(noteId === 'new' && note.body !== null){
        createNote()
      } //if it is new and not empty create new note
      navigate('/') //get user back to home page
    }

  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit}/>
          </Link>
        </h3>
        {noteId !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea onChange={(e) => {setNote({...note, 'body': e.target.value})}} value={note?.body}>{note?.body}</textarea> 
    </div>
    //note?.body - if we have note?.body then pass it if not, then dont
    //on each key pressed when updating our area we call for setNote method to update note object, it's body specifically
  )
}

export default NotePage