import Plus from "../icons/Plus";
import colors from "../assets/colors.json";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import { db } from "../appwrite/databases";
import { useAuth } from "../utils/AuthContext";
import { useRef } from "react";

const AddButton = () => {
  const { setNotes } = useContext(NoteContext);
  const { user } = useAuth();
  const startingPos = useRef(10);
  const addNote = async () => {
    const payload = {
      position: JSON.stringify({
        x: startingPos.current,
        y: startingPos.current,
      }),
      colors: JSON.stringify(colors[0]),
      userid: user.userId,
    };

    startingPos.current += 10;

    const response = await db.notes.create(payload);
    setNotes((prevState) => [response, ...prevState]);
  };
  return (
    <div id="add-btn" onClick={addNote}>
      <Plus />
    </div>
  );
};

export default AddButton;
