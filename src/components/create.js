import React, { useState } from "react";
import { useNavigate } from "react-router";
import { arrayed } from "../utils";

 
export default function Create() {
 const [form, setForm] = useState({
   question: "",
   answer: "",
   options: [],
   tags: [],
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newQuestion = { ...form };
 
   await fetch("http://localhost:5000/question/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newQuestion),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ question: "", answer: "", options: [], "tags": [] });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Question</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="question">Question</label>
         <input
           type="text"
           className="form-control"
           id="question"
           value={form.question}
           onChange={(e) => updateForm({ question: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="answer">Answer</label>
         <input
           type="text"
           className="form-control"
           id="answer"
           value={form.answer}
           onChange={(e) => updateForm({ answer: e.target.value })}
         />
       </div>
       
       <div className="form-group">
         <label htmlFor="options">Options</label>
         <input
           type="text"
           className="form-control"
           id="options"
           value={form.options.join(';')}
           onChange={(e) => updateForm({ options: arrayed(e.target.value) })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="tags">Tags</label>
         <input
           type="text"
           className="form-control"
           id="tags"
           value={form.tags.join(';')}
           onChange={(e) => updateForm({ tags: arrayed(e.target.value) })}
         />
       </div>

       <br/>
       
       <div className="form-group">
         <input
           type="submit"
           value="Create Question"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}