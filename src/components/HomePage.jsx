import React from 'react';
import fivePeople from "../images/peoples.png";

const HomePage = () => {
  return (
    <div className="h-full bg-blue-50 flex items-center justify-center">
      
      <div className="text-center">
      <img src={fivePeople} alt="img" />
        <h2 className="text-2xl font-bold mb-2">Pocket Notes</h2>
        <p className="text-gray-600">
          Send and receive messages without keeping your phone online.
          <br />
          Use Pocket Notes on up to 4 linked devices and 1 mobile phone
        </p>
        <div className="mt-4 text-sm text-gray-500">
          🔒 end-to-end encrypted
        </div>
      </div>
    </div>
  );
};

export default HomePage;