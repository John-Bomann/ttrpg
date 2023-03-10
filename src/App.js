import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Clocks from "./Clocks/Clocks";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
import Tables from "./Tables/Tables";
import { useContext, useEffect, useState } from "react";
import Login from "./Login";
import { UserContext } from "./userContext";
import PrivateRoute from "./PrivateRoute";
import Loading from "./Loading";
import { CssBaseline } from "@mui/material";
import Notes from "./Notes/Notes";
import Reference from "./Reference/Reference";

function App() {
  const [loading, setLoading] = useState(true);
  const { fetchUser } = useContext(UserContext);
  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      await fetchUser();
      setLoading(false);
    };
    getUser();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <CssBaseline>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bitd" element={<NavBar />}>
              <Route path="clocks" element={<Clocks />} />
              <Route path="tables" element={<Tables />} />
              <Route path="notes" element={<Notes />} />
              <Route path="reference" element={<Reference />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </CssBaseline>
    </div>
  );
}

export default App;
