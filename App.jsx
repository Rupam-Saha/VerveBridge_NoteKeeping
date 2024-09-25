import {BrowserRouter} from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes} from "react-router-dom";
import { Register} from "./pages/Register";
import { Login } from "./pages/Login";
import { Forgot } from "./pages/Forgot";
import { Home } from "./pages/Home";
import { Addnote } from "./pages/Addnote";
import { Shownotes } from "./pages/Shownotes";
import { Personal } from "./pages/Personal";
import { Editinfo } from "./pages/Editinfo";
import { Editnote } from "./pages/Editnote";
import { Searchnote } from "./pages/Searchnote";
const App=()=>{
  if(localStorage.getItem("token")){
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot" element={<Forgot/>}/>
        <Route path="/home"  element={<Home/>}/>
        <Route path="/addnote" element={<Addnote/>}/>
        <Route path="/allnotes" element={<Shownotes/>}/>
        <Route path="/personalinfo" element={<Personal/>}/>
        <Route path="/editinfo" element={<Editinfo/>}/>
        <Route path="/editnote/:id" element={<Editnote/>}/>
        <Route path="/searchnote" element={<Searchnote/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )}
  else{
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot" element={<Forgot/>}/>
      </Routes>
    </BrowserRouter>
    </>    
  }
}
export default App;