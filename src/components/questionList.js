import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Api, Auth } from "../utils";

const Question = ({ question, deleteQuestion, disabled }) => (
 <tr>
   <td>{question.question}</td>
   <td>{question.answer}</td>
   <td>{question.options.join(';')}</td>
   <td>{question.tags.join(';')}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${question._id}`}>Edit</Link> |
     <button className={`btn btn-link ${disabled&&'disabled'}`}
       onClick={() => {
         deleteQuestion(question._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function QuestionList() {
 const [questions, setQuestions] = useState([]);
 
 // This method fetches the questions from the database.
 useEffect(() => {
   async function getQuestions() {
     const response = await Api.get(`/question/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const questions = await response.json();
     setQuestions(questions);
   }
 
   getQuestions();
 
   return;
 }, [questions.length]);


 // This method will delete a question
 async function deleteQuestion(id) {
   await Api.delete(`/${id}`);
 
   const newQuestions = questions.filter((el) => el._id !== id);
   setQuestions(newQuestions);
 }
 
 // This method will map out the questions on the table
 function questionList() {
   const disabled = !Auth.isLoggedIn();
   return questions.map((question) => {
     return (
       <Question
         question={question}
         deleteQuestion={() => deleteQuestion(question._id)}
         key={question._id}
         disabled={disabled}
       />
     );
   });
 }
 
 // This following section will display the table with the questions of individuals.
 return (
   <div>
     <h3 align="center" className="margin-top-10">Question List</h3>
     <table style={{ width: '100%' }} className="table table-striped margin-top-30">
       <thead>
         <tr>
           <th>Question</th>
           <th>Answer</th>
           <th>Options</th>
           <th>Tags</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{questionList()}</tbody>
     </table>
   </div>
 );
}