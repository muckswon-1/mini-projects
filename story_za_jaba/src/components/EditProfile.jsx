import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, updateProfile } from '../features/profile/profileSlice';
import { useNavigate } from 'react-router-dom';
import { editUser } from '../features/users/usersSlice';

function EditProfileForm() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  

  const [editedProfile, setEditedProfile] = useState({
    username: currentUser.username || '',
    email: currentUser.email || '',
    profilePic: currentUser.profilePic || '',

  });

  const handleFieldChange = (fieldName, value) => {
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [fieldName]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        setEditedProfile((prevProfile) => ({
          ...prevProfile,
          profilePic: base64Data,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    // Dispatch an action to update the user's profile
    editedProfile.id = currentUser.id;
    dispatch(updateProfile(editedProfile));
    dispatch(editUser(editedProfile))
    navigate('/');

    // Add logic to update the user's profile in your data store or API

    // Close the edit form or navigate to another page if needed
  };

  return (
    <div className="w-6/12 mx-auto w-full bg-white p-4 rounded-md shadow-md mb-4 mt-48 z-10">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Edit Profile</h2>
      </div>
      <div className="flex flex-col">
        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={editedProfile.username}
          onChange={(e) => handleFieldChange('username', e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={editedProfile.email}
          onChange={(e) => handleFieldChange('email', e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
       
      <div className="mt-4">
        <label htmlFor="profilePic" className="block text-sm font-medium text-gray-600">
          Profile Picture
        </label>
        <input
          type="file"
          id="profilePic"
          accept="image/*"
          className="mt-1 p-2 border rounded-md w-full"
          onChange={handleFileChange}
        />
      </div>
      <button
        onClick={handleSaveChanges}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Save Changes
      </button>
    </div>
  );
}

export default EditProfileForm;
