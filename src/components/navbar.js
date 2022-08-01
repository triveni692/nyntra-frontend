import React from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

const logo = window.location.origin + "/logo.png";
 
// Here, we display our Navbar
export default function Navbar() {
 return (
   <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <NavLink className="navbar-brand" to="/">
       <img style={{"width" : 30 + '%'}} src={logo}></img>
       </NavLink>

       <ul class="navbar-nav ms-auto">
            <li class="nav-item">
                <NavLink className="navbar-brand btn btn-outline-info btn-lg" to="/contests">
		       		Contests
		       </NavLink>
            </li>
        </ul>
     </nav>
   </div>
 );
}