import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Auth, Api } from "../utils";

const TestGroup = ({ data, index }) => (
 <tr>
   <td>{index + 1}</td>
   <td>
     <Link className={`btn btn-link`} to={`/contests?test-series=${data.name}`}>{data.name}</Link>
   </td>
   <td>{data.count}</td>
 </tr>
);
 
export default function TestSeries() {
 const [ts, setTs] = useState([]);
 
 // This method fetches the contests from the database.
 useEffect(() => {
   async function getTs() {
     const response = await Api.get(`/test_series`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const ts = await response.json() || [];
     setTs(ts);
   }
 
   if (Auth.isLoggedIn()) getTs();
 
   return;
 }, [ts.length]);
 
 
 // This method will map out the contests on the table
 function testList() {
   return ts.map((t, idx) => {
    // console.log(t,idx);
     return (
       <TestGroup
         data={t}
         index={idx}
         key={idx}
       />
     );
   });
 }
 
 if (!Auth.isLoggedIn()) {
    return <Navigate to="/login?next=test-series" replace={true} />
 }
 // This following section will display the table with the contests of individuals.
 return (
   <div>
     <h3 align="center" className="margin-top-10">Test Groups</h3>
     <table align="center" className="table table-striped margin-top-30">
       <thead>
         <tr>
           <th>Sl No.</th>
           <th>Test Series</th>
           <th>No of Tests</th>
         </tr>
       </thead>
       <tbody>{testList()}</tbody>
     </table>
   </div>
 );
}