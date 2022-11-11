import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import Edit from "./components/edit";
import Create from "./components/create";
import Attempt from "./components/attempt";
import ContestProblems from "./components/contestProblems";
import ContestDetails from "./components/contestDetails";
import ContestList from "./components/contestList";
import TestSeries from "./components/testSeries";
import Login from "./components/login";
 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<TestSeries />} />
       <Route path="/login" element={<Login />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
       <Route path="/contests" element={<ContestList />} />
       <Route path="/test-series" element={<TestSeries/>} />
       <Route path="/contest/:cid/attempt/:aid" element={<Attempt/>} />
       <Route path="/contest/:id/view" element={<ContestProblems />} />
       <Route path="/contest/:id/details" element={<ContestDetails />} />
     </Routes>
   </div>
 );
};
 
export default App;