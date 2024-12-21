import React, { useContext } from 'react';
import { UserContext } from './UserContextProvider'; 
import { useNavigate } from 'react-router-dom';

const HomeContent = () => {
  const { user } = useContext(UserContext); 
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl p-12 max-w-3xl w-full text-center">
    <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
      Hello, <span className="text-sky-600">{user.nickname}</span> 👋
    </h1>
    <p className="text-gray-700 text-lg mb-6">
      <span className="font-bold">Email:</span> {user.email}
    </p>
    <p className="text-gray-700 text-lg mb-10">
      <span className="font-bold">Date signed up:</span> {user.createdAt}
    </p>
    <button
      className="bg-sky-600 text-white font-bold text-lg py-4 px-8 rounded-xl transform transition-transform duration-300 hover:scale-105"
      onClick={() => navigate("/home/create-note")}
    >
      ✍️ Create a New Note
    </button>
  </div>
  
  );
};

export default HomeContent;
