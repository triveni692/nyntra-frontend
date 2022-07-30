import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { arrayed } from "../utils";
 
export default function Edit() {
 const [form, setForm] = useState({
   question: "",
   answer: "",
   options: [],
   tags: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/question/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const question = await response.json();
     if (!question) {
       window.alert(`Question with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(question);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedQuestion = {
     question: form.question,
     answer: form.answer,
     options: form.options,
     tags: form.tags,
   };

   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedQuestion),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Question</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="question">Question: </label>
         <input
           type="text"
           className="form-control"
           id="question"
           value={form.question}
           onChange={(e) => updateForm({ question: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="answer">Answer: </label>
         <input
           type="text"
           className="form-control"
           id="answer"
           value={form.answer}
           onChange={(e) => updateForm({ answer: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="options">Options: </label>
         <input
           type="text"
           className="form-control"
           id="options"
           value={form.options.join(';')}
           onChange={(e) => updateForm({ options: arrayed(e.target.value) })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="tags">Tags: </label>
         <input
           type="text"
           className="form-control"
           id="tags"
           value={form.tags.join(';')}
           onChange={(e) => updateForm({ tags: arrayed(e.target.value) })}
         />
       </div>

       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Question"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}