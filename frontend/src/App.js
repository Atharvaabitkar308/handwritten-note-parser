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
      alert("Upload failed");
    }
  };

  const fetchNotes = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>✨ Handwritten Note Parser</h1>

      {/* Upload Card */}
      <div style={styles.glassCard}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.input}
        />
        <button onClick={handleUpload} style={styles.button}>
          Upload & Parse 🚀
        </button>
      </div>

      {/* Result Section */}
      <div style={styles.glassCard}>
        <h2>📄 Parsed Text</h2>
        <pre style={styles.text}>
          {result || "Upload an image to see extracted text"}
        </pre>
      </div>

      {/* History */}
      <div style={styles.glassCard}>
        <h2>📜 History</h2>
        {notes.length === 0 ? (
          <p>No history available</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} style={styles.noteCard}>
              <p><b>{note.image_path}</b></p>
              <p>{note.parsed_text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial",
    minHeight: "100vh",
    padding: "30px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },

  title: {
    textAlign: "center",
    color: "#fff",
    marginBottom: "30px",
  },

  glassCard: {
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    padding: "20px",
    marginBottom: "20px",
    color: "#fff",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  },

  input: {
    marginBottom: "10px",
    color: "#fff",
  },

  button: {
    background: "#00c6ff",
    backgroundImage: "linear-gradient(45deg, #00c6ff, #0072ff)",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },

  text: {
    whiteSpace: "pre-wrap",
  },

  noteCard: {
    background: "rgba(255,255,255,0.2)",
    padding: "10px",
    borderRadius: "10px",
    marginTop: "10px",
  },
};

export default App;