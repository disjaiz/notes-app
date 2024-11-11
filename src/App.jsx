import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CreateGroupModal from './components/CreateGroupModal';
import HomePage from './components/HomePage';
import NotesPanel from './components/NotesPanel';
import './styles/index.css';

// ===============================layout==============================================================================

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [groups, setGroups] = useState([   
    { id: 'cn', name: 'CSS Notes', color: 'bg-pink-400' },
    { id: 'pn', name: 'Python Notes', color: 'bg-pink-500' },
  ]);

  const createGroup = (name, color) => {
    const id = name.toLowerCase().replace(/\s+/g, '-');
    setGroups([...groups, { id, name, color }]);
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
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

      <div className="flex-1">
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
    },
  }
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;










