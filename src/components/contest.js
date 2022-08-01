import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { baseURL } from "../conf";
import Question from "./question";
import "./contest.css";
 
export default function Contest() {
  const [questions, setQuestions] = useState([]);
  const [contest, setContest] = useState([]);
  const params = useParams();
 
  // This method fetches the contest data from the database.
  useEffect(() => {
    async function getContestData() {
      const id = params.id.toString();
     
      const [q_res, c_res] = await Promise.all([
        fetch(`${baseURL}/combat_question?contest_id=${id}`),
        fetch(`${baseURL}/contest/${id}`)
      ]);

      if (!q_res.ok || !c_res.ok) {
        const message = `An error occurred: ${q_res.statusText}`;
        window.alert(message);
        return;
      }
 
      const [contest, questions] = await Promise.all([
        c_res.json() || [],
        q_res.json() || []
      ]);

      setQuestions(questions);
      setContest(contest);
    }
 
    getContestData();
 
    return;
  }, [questions.length]);
 
 
  // This method will map out the contests on the table
  function questionList() {
    return questions.map((question, index) => {
      return (
        <Question
          data={question}
          index={index}
          key={question._id}
        />
      );
    });
  }
 
  // This following section will display the table with the contests of individuals.
  return (
    <div>
      <h3 align="center" className="margin-top-10">{questions.length} Questions</h3>
      <div align="center">({contest.duration} Minutes)</div>
      <table className="table table-striped center margin-top-10">
        <tbody>{questionList()}</tbody>
      </table>
    </div>
  );
}