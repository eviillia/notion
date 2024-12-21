import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ViewNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5005/notes/${id}`)
      .then((res) => res.json())
      .then((data) => setNote(data));
  }, [id]);

  const handleDelete = () => {
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (confirmed) {
      fetch(`http://localhost:5005/notes/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          navigate("/home/notes");
        })
        .catch((error) => console.error("Ошибка при удалении заметки:", error));
    }
  };

  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b to-blue-50 flex items-center justify-center p-6 w-full">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-4xl p-8 transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-6">{note.title}</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">{note.body}</p>

        <div className="flex justify-between">
          <button
            onClick={() => navigate(`/home/edit/${note.id}`)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600 transition duration-300"
          >
            ✏️ Edit
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-300"
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewNote;
