import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [notes, setNotes] = useState([]);

  const handleUpload = async () => {
    if (!file) {
      alert("Select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/parse", formData);
      setResult(res.data.parsed_text);
      fetchNotes();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/notes");
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div
      style={{
        fontFamily: "Arial",
        padding: "30px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        📝 Handwritten Note Parser
      </h1>

      {/* Upload Box */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "500px",
          margin: "20px auto",
          textAlign: "center",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <br />
        <button
          onClick={handleUpload}
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Upload & Parse
        </button>
      </div>

      {/* Parsed Text */}
      {result && (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "700px",
            margin: "20px auto",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>📄 Parsed Text</h2>
          <pre>{result}</pre>
        </div>
      )}

      {/* History */}
      <div style={{ maxWidth: "700px", margin: "20px auto" }}>
        <h2>📚 History</h2>
        {notes.map((note) => (
          <div
            key={note.id}
            style={{
              background: "white",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
              boxShadow: "0 0 5px rgba(0,0,0,0.1)",
            }}
          >
            <b>{note.image_path}</b>
            <p>{note.parsed_text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;