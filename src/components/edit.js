import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Navigate } from "react-router-dom";
import { arrayed, Auth, Api } from "../utils";
 
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
     const response = await Api.get(`/question/${params.id.toString()}`);
 
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
 
   if (Auth.isLoggedIn()) fetchData();
 
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

   await Api.post(`/update/${params.id}`, JSON.stringify(editedQuestion));
 
   navigate("/");
 }

 if (!Auth.isLoggedIn()) {
    return <Navigate to={`/login?next=edit/${params.id}`} replace={true}/>
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