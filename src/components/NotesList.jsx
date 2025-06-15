import React from 'react'

function NotesList({notes}) {

  return (
    <div>
    {notes.map((note, index) => (
      <div key={index} className="p-2 my-2 bg-white color-black rounded">
        <p>{note}</p>
      </div>
    ))}
  </div>
  )
}

export default NotesList
