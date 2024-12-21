import React, { useState, useEffect, useContext } from "react";
import NoteItem from "./NoteItem";
import { UserContext } from "./UserContextProvider";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const { user } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchNotes = () => {
    setLoading(true);
    fetch(`http://localhost:5005/notes?userId=${user.id}`)
      .then((r) => r.json())
      .then((data) => {
        const sortedNotes = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setNotes(sortedNotes);
      })
      .catch((err) => {
        setError("Не удалось загрузить заметки. Попробуйте позже.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchNotes();
  }, [user, navigate]);

  const handleCreateNote = () => {
    navigate("/home/create-note");
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 flex flex-col items-center w-8/12">
      <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-8">Your Notes</h1>
        <button
          onClick={handleCreateNote}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-8"
        >
          Add New Note
        </button>
        <div className="space-y-6">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {notes.length === 0 ? (
            <p className="text-gray-500 text-center">No notes available.</p>
          ) : (
            notes.map((note) => (
              <NoteItem key={note.id} note={note} fetchNotes={fetchNotes} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
