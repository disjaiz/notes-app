import { useNavigate, useLocation } from 'react-router-dom';

import deleteIcon from "../images/delete-icon-dots.png";

const GroupLink = ({ group, onDelete }) => {
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
 <div className={`flex items-center justify-between gap-3 p-2 hover:bg-gray-100 cursor-pointer mb-2 group-link relative group  ${isActive ? 'bg-gray-100' : ''}`}
  onClick={() => navigate(`/group/${group.id}`)}
>
  {/* Left section: avatar + name */}
  <div className="flex items-center gap-3">
    <div className={`w-10 h-10 ${group.color} rounded-full flex items-center justify-center text-white font-medium`}>
      {initials}
    </div>
    <span className="text-sm font-medium">{group.name}</span>
  </div>

  {/* Delete button (only on hover) */}
   <div
    onClick={(e) => {
      e.stopPropagation();
      onDelete(group.id);
    }}
    className="group-hover:visible"
    title="Delete group"
    aria-label="Delete Group"
  >
    <img src={deleteIcon} alt="Delete icon" className="w-4 h-4 block" />
  </div>

</div>

    );
  };

export default GroupLink;