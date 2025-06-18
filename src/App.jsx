import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CreateGroupModal from './components/CreateGroupModal';
import HomePage from './components/HomePage';
import NotesPanel from './components/NotesPanel';
import './styles/index.css';

// ===============================layout==============================================================================
import { openDB } from 'idb';
import { dbPromise } from './db.js';

const saveGroupToDB = async (group) => {
  const db = await dbPromise;
  await db.put('groups', group);
};

const getGroupsFromDB = async () => {
  const db = await dbPromise;
  return await db.getAll('groups');
};
  

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);


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

    useEffect(() => {
    (async () => {
      const savedGroups = await getGroupsFromDB();
      setGroups(savedGroups);
    })();
  }, []);


    const createGroup = async (name, color) => {
    const id = name.toLowerCase().replace(/\s+/g, '-');
    const newGroup = { id, name, color };
    await saveGroupToDB(newGroup);
    setGroups([...groups, newGroup]);
    setIsModalOpen(false);
  };


  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Mobile Menu Button */}
      <button
        className="md:hidden absolute top-4 right-4 z-40 bg-white p-2 rounded shadow"
        onClick={() => setShowSidebar(true)}
      >
        <img src="https://img.icons8.com/?size=100&id=8113&format=png&color=000000" alt="menu" className="w-6 h-6" />
      </button>


      <div
        className={`w-72 bg-white shadow-lg fixed md:static top-0 left-0 h-full z-20 transform transition-transform duration-300
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
            <Sidebar 
              groups={groups} 
              onCreateClick={() => setIsModalOpen(true) }
              onDeleteGroup={deleteGroup}
              onClose={() => setShowSidebar(false)}
            />
      </div>

      {isModalOpen && (
        <CreateGroupModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          onCreateGroup={createGroup}
        />
      )}

       <div className="flex-1 overflow-auto max-w-full">
        <Outlet context={{ groups }} />
      </div>
      
    </div>
  );
};

// ==========================app===============================================

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'group/:groupId',
          element: <NotesPanel />,
        },
      ],
    },
  ],

  {
    future: {
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
        v7_partialHydration: true,
        v7_startTransition: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
    },
  }
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;










