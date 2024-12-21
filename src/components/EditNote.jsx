import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleCancel = () => {
    navigate("/home/notes");
  };

  useEffect(() => {
    fetch(`http://localhost:5005/notes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setNote(data);
          setTitle(data.title);
          setBody(data.body);
        } else {
          navigate("/404");
        }
      })
      .catch(() => {
        navigate("/404");
      });
  }, [id, navigate]);
  

  const handleSave = () => {
    const updatedNote = { ...note, title, body };

    fetch(`http://localhost:5005/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    }).then(() => {
      navigate("/home/notes");
    });
  };

  if (!note) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 w-8/12">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Edit Note</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="body">Note Body</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Note body"
            rows="6"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleSave}
            className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="py-3 px-6 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditNote;
