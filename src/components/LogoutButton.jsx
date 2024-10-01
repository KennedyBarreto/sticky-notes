import { useAuth } from "../utils/AuthContext";
import Logout from "../icons/Logout"; // You'll need to create this icon

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <div id="logout-btn" onClick={handleLogout}>
      <Logout />
    </div>
  );
};

export default LogoutButton;
