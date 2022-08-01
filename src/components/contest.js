import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { baseURL } from "../conf";
 
const Question = (props) => (
 <tr>
   <td>{props.index}</td>
   <td>{props.data.content}</td>
   <td>{props.data.choices.join(';')}</td>
   <td>{props.data.correctAnswer}</td>
   
 </tr>
);
 
export default function Contest() {
 const [questions, setQuestions] = useState([]);
 const params = useParams();
 
 // This method fetches the contests from the database.
 useEffect(() => {
   async function getQuestions() {
     const id = params.id.toString();
     console.log(id);
     const response = await fetch(`${baseURL}/combat_question?contest_id=${id}`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const questions = await response.json() || [];
     // question.sort((a, b) => new Date(b.starts_at) - new Date(a.starts_at));
     setQuestions(questions);
   }
 
   getQuestions();
 
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
     <h3>Question List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Q No.</th>
           <th>Question</th>
           <th>Options</th>
           <th>Answer</th>
         </tr>
       </thead>
       <tbody>{questionList()}</tbody>
     </table>
   </div>
 );
}