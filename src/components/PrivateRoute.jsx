import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = (props) => {
  const user = useSelector((state) => state.user);

  if (user.loggedIn) return <Outlet {...props} />;

  return <Navigate to="/login" />;
};
export default ProtectedRoute;
