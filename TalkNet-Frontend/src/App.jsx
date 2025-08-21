import { useContext } from "react";
import Navbar from "./components/navigations/Navbar";
import { Context } from "./context/AppContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  const { mode } = useContext(Context);
  return (
    <div
      className={`${
        mode ? "bg-white" : "bg-slate-800"
      } h-[100dvh] overflow-auto`}
    >
      <Router>
        <div>
          <Navbar />
        </div>
        <div>
          <div className="pt-[8vh] lg:pt-[10vh] overflow-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
