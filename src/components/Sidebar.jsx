import { useNavigate} from 'react-router-dom';
import GroupLink from './GroupLink';
import { useState } from 'react';

// =======
import { dbPromise } from '../db.js';
const deleteGroup = async (groupId) => {
  const db = await dbPromise;
  await db.delete('groups', groupId);

  // Optional: delete all notes with this groupId
  const allNotes = await db.getAll('notes');
  const groupNotes = allNotes.filter(note => note.groupId === groupId);
  for (let note of groupNotes) {
    await db.delete('notes', note.id);
  }

  // Update UI
  const updatedGroups = groups.filter(g => g.id !== groupId);
  setGroups(updatedGroups);
};
// ======

const Sidebar = ({ groups, onCreateClick }) => {
  const navigate = useNavigate();

// ========
  return (
    <div className=" w-72 bg-white shadow-lg">

    <div className="font-roboto p-4 h-24 pb-0 flex items-center justify-center">
          <h1 className="text-2xl font-bold" onClick={()=>{navigate('/')}}>Pocket Notes</h1>
    </div>

      <div className="p-4 custom-scrollbar" style={{ maxHeight: 'calc(100vh - 128px)', overflowY: 'auto' }}>
        {groups.length > 0 ? (
          groups.map(group => (
            <GroupLink key={group.id} group={group} onDelete={deleteGroup} />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <p>Create your first note group</p>
          </div>
        )}

        <button
          onClick={onCreateClick}
          className="w-12 h-12 bg-navy-blue text-white rounded-full fixed bottom-4 left-56 flex items-center justify-center text-2xl shadow-lg  create-button"
        >
          +
        </button>
      </div>

    </div>
  );
};

export default Sidebar;