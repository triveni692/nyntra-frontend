import React, { useEffect, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { Auth, Api, formatTime } from "../utils";
import StartContest from "./startContest";

const [externalLink, tick] = [
  "/icons/external_link.png",
  "/icons/tick.png",
];

const now = new Date().toISOString();

const Contest = ({ data: c, index }) => (
 <tr>
   <td>{index+1}</td>
   <td>
     <Link className={`btn-link ${c.starts_at>now?'disabled':''}`} to={`/contest/${c._id}/details`}>{c.name}</Link>
   </td>
   <td>{formatTime(c.starts_at)}</td>
   <td>{c.topics.join(';')}</td>
   <td style={{textAlign: 'center', paddingRight: `${c.attempted?0:30}px`}}>
     <a href={`/contest/${c._id}/view`}>View</a>
     {c.attempted?<img src={tick} className="option-status margin-left-10"/>:''}
   </td>
   <td style={{textAlign: 'center'}}>
     <StartContest contest={c} />
   </td>
   <td style={{textAlign: 'center'}}> 
     <a href={c.u_contest_url} target="_blank"><img src={externalLink} className="option-status"/> </a>
   </td>
   
 </tr>
);
 
export default function ContestList() {
 const [contests, setContests] = useState([]);
 const [searchParams, setSearchParams] = useSearchParams();
 const test_series = searchParams.get('test-series');

 // This method fetches the contests from the database.
 useEffect(() => {
   async function getContests() {
     const response = await Api.get(`/contest?test_series=${test_series}`);
 
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
   return contests.map((contest, idx) => {
     return (
       <Contest
         data={contest}
         index={idx}
         key={contest._id}
       />
     );
   });
 }
 
 if (!Auth.isLoggedIn()) {
    return <Navigate to="/login?next=test_series" replace={true} />
 }
 // This following section will display the table with the contests of individuals.
 return (
   <div>
     <h3 align="center" className="margin-top-10">Contest List</h3>
     <table className="table table-striped margin-top-30">
       <thead>
         <tr>
           <th style={{width: '2%'}} >No.</th>
           <th style={{width: '20%', textAlign: 'center'}}>Name</th>
           <th style={{width: '8%'}}>Contest Time</th>
           <th style={{width: '40%', textAlign: 'center'}}>Topics</th>
           <th style={{width: '10%', textAlign: 'center'}}>View Questions</th>
           <th style={{width: '10%', textAlign: 'center'}}>Participate</th>
           <th style={{width: '10%', textAlign: 'center'}}>External Link</th>
         </tr>
       </thead>
       <tbody>{contestList()}</tbody>
     </table>
   </div>
 );
}