/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useState, useEffect } from "react";
import Spinner from "../icons/Spinner";
import { db } from "../appwrite/databases";
import { useAuth } from "../utils/AuthContext";
import { Query } from "appwrite"; // Import Query from appwrite

export const NoteContext = createContext();

const NotesProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState();
  const [selectedNote, setSelectedNote] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      init();
    }
  }, [user]);

  const init = async () => {
    if (user && user.userId) {
      try {
        const response = await db.notes.list([
          Query.equal("userid", user.userId),
        ]);
        setNotes(response.documents);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const contextData = { notes, setNotes, selectedNote, setSelectedNote };

  return (
    <NoteContext.Provider value={contextData}>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Spinner size="100" />
        </div>
      ) : (
        children
      )}
    </NoteContext.Provider>
  );
};
export default NotesProvider;
