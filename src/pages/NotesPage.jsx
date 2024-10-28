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
        <div className="empty-notes">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M7 7H17M7 12H17M7 17H13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <h2>No notes available</h2>
          <p>Create your first note by clicking the + button!</p>
        </div>
      )}
      <Controls />
    </div>
  );
};

export default NotesPage;
