import React , {useState, useEffect, useRef} from 'react';
import paperPlane from "../images/paperPlane.png";
import bluePlane from "../images/bluePlane.png";
import deleteIcon from "../images/delete-icon-dots.png";

import { openDB } from 'idb';
import { dbPromise } from '../db.js';

const saveNoteToDB = async (note) => {
  const db = await dbPromise;
  await db.put('notes', note);
};
const getNotesByGroupId = async (groupId) => {
  const db = await dbPromise;
  const allNotes = await db.getAll('notes');
  return allNotes.filter(note => note.groupId === groupId);
};

const deleteNoteFromDB = async (noteId) => {
  const db = await dbPromise;
  await db.delete('notes', noteId);
};

const NotesGrpView = ({ groupId, groupName, groupColor }) => {
  const [currentNote, setCurrentNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

   useEffect(() => {
    (async () => {
      const groupNotes = await getNotesByGroupId(groupId);
      setNotes(groupNotes);
    })();
  }, [groupId]);

  // Load notes for the current group
  const loadGroupNotes = () => {
    const allGroupNotes = JSON.parse(localStorage.getItem('groupNotes')) || {};
    const groupNotes = allGroupNotes[groupId] || [];
    setNotes(groupNotes);
  };

  const handleSave = async () => {
    if (currentNote.trim()) {
      const newNote = {
        id: `${groupId}-${Date.now()}`,
        content: currentNote.trim(),
        groupId,
        timestamp: new Date().toISOString(),
      };

      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      await saveNoteToDB(newNote);

      setCurrentNote('');
      if (textareaRef.current) {
        textareaRef.current.value = '';
      }
    }
  };

   const handleDelete = async (noteId) => {
    await deleteNoteFromDB(noteId);
    setNotes(notes.filter(note => note.id !== noteId));
  };
    const NotesList = ({ notes }) => (
    <div className="font-roboto space-y-4">
      {notes.map((note) => (
        <div key={note.id} className="relative bg-white p-3 rounded-sm shadow-lg shadow-gray-500/50">
          <button
            onClick={() => handleDelete(note.id)}
            className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            title="Delete note"
          >
            <img src={deleteIcon} alt="deleteNoteIcon" className='w-4'/>
          </button>
          <p className="text-black-900 text-sm break-words">{note.content}</p>
          <div className="flex justify-end mt-2">
            <p className="text-xs text-black-500">
              {formatDate(note.timestamp)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

    const handleChange = (e) => {
    setCurrentNote(e.target.value);
  };
    const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'AM' : 'PM';
    const formattedHours = hours % 12 || 12;
    return `${day} ${month} ${year} • ${formattedHours}:${minutes} ${ampm}`;
  }; 

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-blue-900 text-white sticky top-0 flex items-center gap-3 px-4 py-3">
        <div className={`w-10 h-10 ${groupColor} rounded-full flex items-center justify-center text-white font-medium`}>
          {groupName.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase()}
        </div>
        <h2 className="text-lg font-medium">{groupName}</h2>
      </div>

      {/* Notes List */}
      <div className="flex-1 p-4 custom-scrollbar overflow-y-auto w-full break-words overflow-hidden text-ellipsis">
        {notes.length > 0 ? (<NotesList notes={notes} /> ):(<p className="text-gray-500 text-center py-4"></p>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-navy-blue p-3.5">
      <div className="bg-white rounded-lg h-28 relative">
      <textarea
        rows="4"  
        cols="30" 
        value={currentNote}
        onChange={handleChange}
        ref={textareaRef}
        placeholder="Enter your note here..."
        className="w-full h-full px-4 py-4 rounded-lg focus:outline-none text-base placeholder:text-gray-400 resize-none bg-white" 
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(e)=>{
          if (e.key === "Enter") {
            handleSave()
          }
        }}
      />
      <button
        onClick={handleSave}
        className="absolute bottom-3 right-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <img 
          src={isFocused ? bluePlane : paperPlane} 
          className="h-5 w-5" 
        />
      </button>
  </div>
</div>
    </div>
  );
};

export default NotesGrpView;
