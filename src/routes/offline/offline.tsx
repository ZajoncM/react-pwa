import { initDB, useIndexedDB } from "react-indexed-db";
import { DBConfig } from "../../db-config";
import Layout from "../../layout/layout";
import { useState, useEffect, useRef } from "react";

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
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (titleRef.current && descriptionRef.current) {
      add({
        title: titleRef.current.value,
        description: descriptionRef.current.value,
      }).then(() => {
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
        <input name="title" placeholder="title" ref={titleRef} />
        <br />
        <input
          name="description"
          placeholder="description"
          ref={descriptionRef}
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
