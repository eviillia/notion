import React, { useContext } from 'react';
import { UserContext } from './UserContextProvider';
import { Link, Outlet } from 'react-router-dom';

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
        <div className="font-bold text-xl">{user.nickname}</div>
        <nav>
          <Link to="/home" className="hover:underline mr-4">Home</Link>
          <Link to="/home/notes" className="hover:underline mr-4">Notes</Link>
          <Link to="/login" className="hover:underline">Log out</Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col justify-center items-center px-4">
        <Outlet /> 
      </main>
      <footer className="bg-gray-800 text-white py-4 px-6 text-center">
        BSU: 2024
      </footer>
    </div>
  );
}
