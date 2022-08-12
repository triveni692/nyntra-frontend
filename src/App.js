import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import QuestionList from "./components/questionList";
import Edit from "./components/edit";
import Create from "./components/create";
import Contest from "./components/contest";
import ContestList from "./components/contestList"; 
import Login from "./components/login";
 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<QuestionList />} />
       <Route path="/login" element={<Login />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
       <Route path="/contests" element={<ContestList />} />
       <Route path="/contest/:id" element={<Contest />} />
     </Routes>
   </div>
 );
};
 
export default App;