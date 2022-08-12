import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";

import { Auth } from "../utils";

const logo = window.location.origin + "/logo.png";
 
function logout() {
  Auth.logout();
  window.location.reload();
}

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
            <li class="nav-item">
              {Auth.isLoggedIn() && <button onClick={logout} class="navbar-brand btn btn-outline-danger">Logout</button>}
            </li>
        </ul>
     </nav>
   </div>
 );
}