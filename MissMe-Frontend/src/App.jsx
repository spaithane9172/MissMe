import { useContext } from "react";
import Navbar from "./components/navigations/Navbar";
import { Context } from "./context/AppContext";

function App() {
  const { mode } = useContext(Context);
  return (
    <div className={`${mode ? "bg-white" : "bg-blue-950"}`}>
      <Navbar />
    </div>
  );
}

export default App;
