import { initDB, useIndexedDB } from "react-indexed-db";
import { DBConfig } from "../db-config";
import Layout from "../layout/layout";
import { useState, useEffect } from "react";

initDB(DBConfig);

interface Note {
  id: number;
  title: string;
  description: string;
}

const Offline = () => {
  const { getAll } = useIndexedDB("notes");
  const [notes, setNotes] = useState<Note[]>([]);
  const { add, deleteRecord } = useIndexedDB("notes");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleClick = () => {
    if (title) {
      add({
        title,
      }).then(() => {
        setTitle("");
        setDescription("");
        getAll().then((notes: Note[]) => {
          setNotes(notes);
        });
      });
    }
  };

  const remove = (id: number) => {
    deleteRecord(id).then(() => {
      setTitle("");
      setDescription("");
      getAll().then((notes: Note[]) => {
        setNotes(notes);
      });
    });
  };

  useEffect(() => {
    getAll().then((notes: Note[]) => {
      setNotes(notes);
    });
  }, []);

  return (
    <Layout>
      <div style={{ width: "100%" }}>
        <input
          style={{ width: "100%", fontSize: "26px", marginBottom: "10px" }}
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <button onClick={handleClick}>Add</button>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.title} <button onClick={() => remove(note.id)}>delete</button>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Offline;
