import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import "./App.css";
import AssignMentor from "./components/AssignMentor";
import ChangeMentor from "./components/ChangeMentor";

import CreateMentor from "./components/CreateMentor";
import CreateStudent from "./components/CreateStudent";
import NavBar from "./components/NavBar";
import DashBoard from "./components/DashBoard";

function App() {
  return <>
  
  <BrowserRouter>
  {/* <UserProvider> */}
  <NavBar/>
 
  {/* <div style={{backgroundColor:"#222D3F" , height:"100vh"}}> */}
  <Routes>
     <Route path="/" element={<DashBoard/>}/>
     <Route path="create-student" element={<CreateStudent/>}/>
     <Route path="create-mentor" element={<CreateMentor/>}/>
     <Route path="assign-mentor" element={<AssignMentor/>}/>
     <Route path="change-mentor" element={<ChangeMentor/>}/>
           
      
  </Routes>
  {/* </div>  */}
  </BrowserRouter>
  </>
}

export default App;
