import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router";
import { Auth, Api } from "../utils";
import Question from "./question";
import AnswerSheet from "./answerSheet";
import "./index.css";

 
export default function Contest() {
  const [data, setData] = useState({
    questions: [],
    options: [],
    contest: {},
    attempt: {}
  });
  const params = useParams();
 
  // This method fetches the contest data from the database.
  useEffect(() => {
    async function getContestData() {
      const cid = params.cid.toString();
      const aid = params.aid.toString();
     
      const [q_res, c_res, a_res, o_res] = await Promise.all([
        Api.get(`/combat_question?contest_id=${cid}`),
        Api.get(`/contest/${cid}`),
        Api.get(`/attempt/${aid}`),
        Api.get(`/options?attempt=${aid}`)
      ]);

      if (!q_res.ok || !c_res.ok) {
        const message = `An error occurred: ${q_res.statusText}`;
        window.alert(message);
        return;
      }
 
      const [contest, questions, attempt, options] = await Promise.all([
        c_res.json() || [],
        q_res.json() || [],
        a_res.json() || [],
        o_res.json() || []
      ]);

      if (attempt.contest_id !== cid) {
        window.alert("Attempt ID is different from Contest ID!");
        return ;
      }

      setData({ questions, contest, attempt, options });
    }
 
    if (Auth.isLoggedIn()) getContestData();
 
    return;
  }, []);
 
 
  // This method will map out the contests on the table
  function questionList(analysis) {
    return data.questions.map((question, index) => {
      return (
        <Question
          data={question}
          analysis={analysis}
          index={index}
          key={question._id}
        />
      );
    });
  }

  if (!Auth.isLoggedIn()) {
    return <Navigate to={`/login?next=contest/${params.id}`} replace={true}/>
  }
  
  const analysis = data.attempt.ends_at < new Date().toISOString();
  // This following section will display the table with the contests of individuals.
  return (
    <div style={{paddingLeft: '20%'}}>
      <h3 align="center" className="margin-top-10">{data.contest.name}</h3>
      <div align="center">({data.questions.length} Questions | {data.contest.duration} Minutes)</div>
      <div className="margin-top-30">
        <div className="left-panel">
          <AnswerSheet
            questions={data.questions}
            contest={data.contest}
            attempt={data.attempt}
            options={data.options}
            analysis={analysis}
          />
        </div>
        <div className="right-panel">
          <table className="table table-striped center margin-top-10">
            <tbody>{questionList(analysis)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}