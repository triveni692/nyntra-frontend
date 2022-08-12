import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { baseURL } from "../conf";
import { Auth } from "../utils";

 
const Contest = (props) => (
 <tr>
   <td>
     <Link className="btn btn-link" to={`/contest/${props.data._id}`}>{props.data.name}</Link>
   </td>
   <td>{props.data.starts_at}</td>
   <td>{props.data.topics.join(';')}</td>
   <td>
     <a href={props.data.u_contest_url} target="_blank">{props.data.u_contest_url}</a>
   </td>
   
 </tr>
);
 
export default function ContestList() {
 const [contests, setContests] = useState([]);
 
 // This method fetches the contests from the database.
 useEffect(() => {
   async function getContests() {
     const response = await fetch(`${baseURL}/contest`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const contests = await response.json() || [];
     contests.sort((a, b) => new Date(b.starts_at) - new Date(a.starts_at));
     setContests(contests);
   }
 
   if (Auth.isLoggedIn()) getContests();
 
   return;
 }, [contests.length]);
 
 
 // This method will map out the contests on the table
 function contestList() {
   return contests.map(contest => {
     return (
       <Contest
         data={contest}
         key={contest._id}
       />
     );
   });
 }
 
 if (!Auth.isLoggedIn()) {
    return <Navigate to="/login?next=contests" replace={true} />
 }
 // This following section will display the table with the contests of individuals.
 return (
   <div>
     <h3 align="center" className="margin-top-10">Contest List</h3>
     <table className="table table-striped margin-top-30">
       <thead>
         <tr>
           <th>Name</th>
           <th>Contest Time</th>
           <th>Topics</th>
           <th>External URL</th>
         </tr>
       </thead>
       <tbody>{contestList()}</tbody>
     </table>
   </div>
 );
}