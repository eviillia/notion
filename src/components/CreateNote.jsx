import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContextProvider";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleCreate = () => {
    if (!title.trim()) {
      setError("Заголовок не может быть пустым!");
      return;
    }

    if (!body.trim()) {
      setError("Текст заметки не может быть пустым!");
      return;
    }

    const newNote = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      title,
      body,
      createdAt: new Date().toISOString(),
    };

    fetch("http://localhost:5005/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    }).then(() => {
      navigate("/home/notes");
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 w-8/12">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create a New Note</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <div className="mb-6">
          <textarea
            placeholder="Note text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          onClick={handleCreate}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Create Note
        </button>
      </div>
    </div>
  );
};

export default CreateNote;
