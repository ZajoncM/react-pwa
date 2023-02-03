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
  const { add } = useIndexedDB("notes");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleClick = () => {
    if (title && description) {
      add({
        title,
        description,
      }).then(() => {
        setTitle("");
        setDescription("");
        getAll().then((notes: Note[]) => {
          setNotes(notes);
        });
      });
    }
  };

  useEffect(() => {
    getAll().then((notes: Note[]) => {
      setNotes(notes);
    });
  }, []);

  return (
    <Layout>
      <div>
        <input
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          name="description"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <button onClick={handleClick}>Add</button>
      </div>
      <ul>
        {notes.map((person) => (
          <li key={person.id}>{person.title}</li>
        ))}
      </ul>
    </Layout>
  );
};

export default Offline;
