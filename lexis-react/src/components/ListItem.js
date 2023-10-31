import React from 'react'
import {Link} from 'react-router-dom'

let getTitle = (note) => {
  if (note && note.body) {
    let title = note.body.split('\n')[0];
    if (title && title.length > 45) {
      return title.slice(0, 45);
    }
    return title;
  }
  return '';
};

let getContent = (note) => {
  if (note && note.body) {
    let title = getTitle(note);
    let content = note.body.replaceAll('\n', ' '); // remove newlines
    if (title) {
      content = content.replaceAll(title, ''); // remove title
    }
    if (content.length > 45) {
      return content.slice(0, 45) + '...';
    } else {
      return content;
    }
  }
  return '';
};

let getTime = (note) => {
  return new Date(note.updated).toLocaleDateString() //makes date simple format
}

const ListItem = ({note}) => {
  return (
    <Link to={`/note/${note.id}`}>
      <div className="notes-list-item">
        <h3>{getTitle(note)}</h3>
        <p><span>{getTime(note)}</span>{getContent(note)}</p>
      </div>
    </Link>
  )
}

export default ListItem