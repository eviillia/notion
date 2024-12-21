import React from "react";
import { useNavigate } from "react-router-dom";

const NoteItem = ({ note, fetchNotes }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      fetch(`http://localhost:5005/notes/${note.id}`, {
        method: "DELETE",
      })
        .then(() => {
          fetchNotes(); 
        })
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <h3
        className="text-xl font-bold text-blue-600 hover:underline cursor-pointer"
        onClick={() => navigate(`/home/view/${note.id}`)}
      >
        {note.title}
      </h3>
      <p className="text-sm text-gray-500 mb-2">
        Created at: {new Date(note.createdAt).toLocaleString()}
      </p>
      <div className="flex space-x-2">
        <button
          className="text-sm text-gray-600 hover:text-gray-800"
          onClick={() => navigate(`/home/edit/${note.id}`)}
        >
          ✏️ 
        </button>
        <button
          className="text-sm text-red-600 hover:text-red-800"
          onClick={handleDelete}
        >
          🗑 
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
