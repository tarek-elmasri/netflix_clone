import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, removeUser } from "./features/userSlice";
import { firebaseApi } from "./api";
import { HomeScreen, LoginScreen } from "./pages/";
import { PrivateRoute } from "./components";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = firebaseApi.onUserStateChange((user) => {
      if (user) {
        dispatch(setUser({ email: user.email, id: user.uid }));
      } else {
        dispatch(removeUser());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  if (user.isLoading) return <h1 style={{ color: "red" }}>Loading ...</h1>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<HomeScreen />} />
        </Route>
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
