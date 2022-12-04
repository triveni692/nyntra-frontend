import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useParams } from "react-router";
import { Auth, Api, formatTime, computeScore } from "../utils";
import Question from "./question";
import StartContest from "./startContest";
import "./index.css";

const GreenTick = "/icons/tick.png";
const RedCross = "/icons/cross.png";
 
export default function Contest() {
  const [attempts, setAttempts] = useState([]);
  const [contest, setContest] = useState({topics: []});
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
 
  // This method fetches the contest data from the database.
  useEffect(() => {
    const id = params.id.toString();
    async function getContestData() {
     
      const [a_res, c_res] = await Promise.all([
        Api.get(`/attempt?contest=${id}`),
        Api.get(`/contest/${id}`)
      ]);

      if (!a_res.ok || !c_res.ok) {
        const message = `An error occurred: ${a_res.statusText}`;
        window.alert(message);
        return;
      }
 
      const [contest, attempts] = await Promise.all([
        c_res.json() || [],
        a_res.json() || []
      ]);

      attempts.sort((x, y) => x.starts_at==y.starts_at?0:(x.starts_at<y.starts_at?1:-1));

      setAttempts(attempts);
      setContest(contest);
    }
 
    if (Auth.isLoggedIn()) getContestData();
    else navigate(`/login?next=contest/${id}/details`);
  }, [attempts.length]);

  async function deleteAttempt(a) {
    let res = await Api.delete(`/attempt/${a._id}`);
    if (!res.ok) {
      try {console.log(JSON.stringify(res));} catch(e) {};
      window.alert('Failed to delete, check console!');
    }
    else setAttempts([]);
  }

  const curr_t = new Date().toISOString();
  const showDelete = searchParams.get("delete") === "true";

  function renderAttempts() {
    const style = {textAlign: "center", width: `${showDelete?16:19}%`};
    return (
      <table className="table table-striped center margin-top-10">
        <thead><tr>
          <th style={{width: '5%'}}/>
          <th style={style}>Time</th>
          <th style={style}>Correct <img className="option-status" src={GreenTick}/> </th>
          <th style={style}>Incorrect <img className="option-status" src={RedCross}/> </th>
          <th style={style}>Unmarked </th>
          <th style={style}>Marks Scored/Total </th>
          {showDelete ? <th style={style}>Action</th>: ''}
        </tr></thead>
        <tbody>
          {attempts.map((a, idx) => (
            <tr key={a._id}>
              <td style={{width: '5%'}}>{idx+1}</td>
              <td style={style}>
                <a href={`/contest/${contest._id}/attempt/${a._id}`}>{formatTime(a.starts_at)}</a>
                {a.ends_at>curr_t? <span className='dot dot-sm dot-success blink'/>:''}
              </td>
              <td style={style}>{a.correct_n}</td>
              <td style={style}>{a.incorrect_n}</td>
              <td style={style}>{a.unmarked_n}</td>
              <td style={style}>{computeScore(a)}/{a.total_n * 2} </td>
              {showDelete? <td style={style}>
                <button className="btn btn-danger" onClick={()=>deleteAttempt(a)}>Delete</button>
              </td>: ''}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  function renderDetails() {
    const disabled = attempts.some(a => a.ends_at > curr_t);
    return (<>
      <h3 align="center" className="margin-top-10">{contest.name}</h3>
      <div align="center">({contest.q_n} Questions | {contest.duration} Minutes)</div>
      <ul style={{listStyleType: 'none'}}>
        <li>
          <h3>Instruction</h3>
          <div dangerouslySetInnerHTML={{ __html: contest.description }}/>
        </li>
        <li>
          <h3>Syllabus</h3>
          <ol>
          {contest.topics.map(t => <li key={t}>{t}</li>)}
          </ol>
        </li>
      </ul>
      <div align="center">
        {disabled?<div className="text-danger bg-light margin-bottom-30">(A contest is in progress, please finish it first!)</div>:''}
        <StartContest contest={contest} disabled={disabled}/>
      </div>
    </>);
  }
 

  // This following section will display the table with the contests of individuals.
  return (
    <div>
      <div className="margin-top-30">
        <div className="left-panel left-panel-wide">
          <h3 align="center"> Past Analysis </h3>
          <div align="center"> ({attempts.length} Attempts) </div>
          {renderAttempts()}
        </div>
        <div className="right-panel right-panel-small">
          {renderDetails()}
        </div>
      </div>
    </div>
  );
}