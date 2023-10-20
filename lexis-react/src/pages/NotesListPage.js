import React, {useState, useEffect} from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'

const NotesListPage = () => {

    let [notes, setNotes] = useState([]) //this only triggers at element mount

    // use state always returns [current state, function that allows us to change our state]
    // useState([DEFAULT STATE VALUE]) - [] means null
    // Doing something like this means DEFAULT STATE VALUE will be equal to what we return:
    // let [count, setCount] = useState (() => {
    //     console. log('run function')
    //     return
    //     })
    // it is a correct way because it only done once instead with let [notes, setNotes] = useState(5) 5 will be set every time
    //наск я понимаю мы создаем переменную notes и функцию setNotes которая описана ниже
    useEffect(() => {
        // При первой загрузке страницы мы дергаем getNotes() который в фоне пытается получитьданные сервиса. useEffect ждет пока он их получит
        getNotes()
    }, [])

    let getNotes = async () => {
        let response = await fetch('/api/notes/') // removed http://127.0.0.1:8000/api/notes/ because proxy is set in package.json
        let data = await response.json()
        setNotes(data)
        // setNotes(data) updates the notes state with the fetched data. 
        // This triggers a re-render of the component with the updated state.
    }      

    return (
        <div className="notes">
            <div className="notes-header">
                <h2 className="notes-title">&#9782; Notes</h2>
                <p className="notes-count">{notes.length}</p>
            </div>
            <div className="notes-list">
                {notes.map((note, index) => (
                    <ListItem key={index} note={note} />
                ))}
            </div>
            <AddButton />
        </div>
    )
}

export default NotesListPage