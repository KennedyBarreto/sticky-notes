import AddButton from "./AddButton";
import LogoutButton from "./LogoutButton";
import colors from "../assets/colors.json";
import Color from "./Color";

const Controls = () => {
  return (
    <div id="controls">
      <AddButton />
      {colors.map((color) => (
        <Color key={color.id} color={color} />
      ))}
      <LogoutButton />
    </div>
  );
};

export default Controls;
