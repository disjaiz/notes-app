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
      <Sidebar 
        groups={groups} 
        onCreateClick={() => setIsModalOpen(true) }
      />

      {isModalOpen && (
        <CreateGroupModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          onCreateGroup={createGroup}
        />
      )}

      {/* <div className="flex-1"> */}
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










