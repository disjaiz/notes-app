import React from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import NotesGrpView from './NotesGrpView';

const NotesPanel = () => {
  const { groupId } = useParams();
  const { groups } = useOutletContext();
  const group = groups.find(g => g.id === groupId);
  
  if (!group) return null;
 
  return (
    <div className="h-full bg-skyblue relative">

        <NotesGrpView groupId={group.id} groupName={group.name} groupColor={group.color}/>

    </div>
  );
};

export default NotesPanel;






 