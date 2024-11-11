import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';

const GroupLink = ({ group }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = location.pathname === `/group/${group.id}`;
  
    const initials = group.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  
    return (
      <div
        className={` flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer mb-2 group-link ${
          isActive ? 'bg-gray-100' : '' }`}
        onClick={() => navigate(`/group/${group.id}`)}
      >

        <div className={`w-10 h-10 ${group.color} rounded-full flex items-center justify-center text-white font-medium`}>
          {initials}
        </div>
        <span className="text-sm font-medium">{group.name}</span>
      
      </div>
    );
  };

export default GroupLink;