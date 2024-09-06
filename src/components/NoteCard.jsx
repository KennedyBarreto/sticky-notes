/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import { db } from "../appwrite/databases";
import Trash from "../icons/Trash";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils.js";

const NoteCard = ({ note }) => {
  // let position = JSON.parse(note.position);
  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef(null);
  const [position, setPosition] = useState(JSON.parse(note.position));
  let mouseStartPos = { x: 0, y: 0 };

  const cardRef = useRef(null);
  const colors = JSON.parse(note.colors);
  const body = bodyParser(note.body);
  const textAreaRef = useRef(null);

  const handleKeyUp = async () => {
    //1 - Initiate "saving" state
    setSaving(true);

    //2 - If we have a timer id, clear it so we can add another two seconds
    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    //3 - Set timer to trigger save in 2 seconds
    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value);
    }, 2000);
  };

  const mouseMove = (e) => {
    //1 - Calculate move direction
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    //2 - Update start position for next move.
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    //3 - Update card top and left position.
    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  };

  const mouseDown = (e) => {
    setZIndex(cardRef.current);
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    const newPosition = setNewOffset(cardRef.current);
    saveData("position", newPosition);
  };

  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };
    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.error(error);
    }
    setSaving(false);
  };

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  return (
    <div
      className="card"
      ref={cardRef}
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="card-header"
        onMouseDown={mouseDown}
        style={{ backgroundColor: colors.colorHeader }}
      >
        <Trash />
        {saving && (
          <div className="card-saving">
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          onKeyUp={handleKeyUp}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          onFocus={() => {
            setZIndex(cardRef.current);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
