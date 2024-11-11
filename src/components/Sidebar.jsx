import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GroupLink from './GroupLink';

const Sidebar = ({ groups, onCreateClick }) => {
  return (
    <div className=" w-72 bg-white shadow-lg">

    <div className="font-roboto p-4 h-24 pb-0 flex items-center justify-center">
          <h1 className="text-2xl font-bold">Pocket Notes</h1>
    </div>

      <div className="p-4 custom-scrollbar" style={{ maxHeight: 'calc(100vh - 128px)', overflowY: 'auto' }}>
        {groups.length > 0 ? (
          groups.map(group => (
            <GroupLink key={group.id} group={group} />
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