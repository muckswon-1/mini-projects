// Logout.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../features/profile/profileSlice';
import { useNavigate } from 'react-router-dom';


function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPrompt, setShowPrompt] = useState(false);

  const handleLogout = () => {
    dispatch(signOut());
    // You may want to redirect er actions after logging outor perform oth
    navigate('/');
  };

  

  return (
    <>
    <div className="text-red-500 underline cursor-pointer" onClick={() => setShowPrompt((prevShowPrompt) => !prevShowPrompt)}>
      Logout</div>
    
      {showPrompt && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-4 rounded-md">
            <p>Are you sure you want to logout?</p>
            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 bg-red-500 text-white rounded-md mr-2" onClick={handleLogout}>
                Yes
              </button>

              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md" onClick={() => setShowPrompt((prevShowPrompt) => !prevShowPrompt)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Logout;
