// Importing required components and styles
import "./App.css";
import Dashboard from "./components/dashboard/dashboard";
import Homepage from "./components/homepage";
import Navbar from "./components/navbar";
import Welcome from "./components/welcome";
import { useContext } from "react";
import signinContext from "./components/context/signincontext";
import Alan from "./alan";

function App() {
  // Accessing the signincontext values
  const a = useContext(signinContext);
  
  // Render Navbar, Welcome, Dashboard, Homepage and Alan 
  // components based on the signin status
  return (
    <>
      <Navbar />
      {!a.ismemberlogin && !a.islibrarianlogin && <Welcome />}
      {a.islibrarianlogin && <Dashboard />}
      {a.ismemberlogin && <Homepage />}
      <Alan/>
    </>
  );
}

export default App;
