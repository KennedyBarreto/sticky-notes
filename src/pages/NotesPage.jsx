import NoteCard from "../components/NoteCard";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import Controls from "../components/Controls";
const NotesPage = () => {
  const { notes } = useContext(NoteContext);
  return (
    <div>
      {notes && notes.length > 0 ? (
        notes.map((note) => <NoteCard note={note} key={note.$id} />)
      ) : (
        <p>No notes available. Create your first note!</p>
      )}
      <Controls />
    </div>
  );
};

export default NotesPage;
