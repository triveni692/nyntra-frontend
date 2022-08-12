import React from "react";
import { Navigate } from "react-router-dom"
import { Auth, Api } from "../utils";

function next() {
	let s = window.location.search;
	if(!s || s[0]!=='?') return '';
	for (let e of s.substr(1).split('&')) {
		const qs = e.split('=');
		if (qs.length === 2 && qs[0] === 'next') return qs[1];
	}
	return '';
}


class Login extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email: "",
			password: "",
			redirect: Auth.isLoggedIn()
		}
	}

	handleSubmit = async e => {
		e.preventDefault();
		
		const res = await Api.post(`/login`, JSON.stringify({
				email: this.state.email,
				password: this.state.password
		}))
		.catch(e => {
   		console.log(e);
   		alert("Some error occured!");
   	});

   	const data = await res.json();
   	
   	if(res.status == 200) {
   		this.setState({
   			invalid_email: false,
   			invalid_pass: false,
   			redirect: true,
   			success: true
   		});
   		Auth.login(data);
   		window.location.reload();
   	}
   	else {
   		const newState = {
   			err: data.message, 
   			invalid_email: false, 
   			invalid_pass: false, 
   		};
   		newState[data.reason] = true;
   		this.setState(newState);
   	}

	}

	render() {
		const {invalid_email, invalid_pass, err, success } = this.state;

		if (this.state.redirect) {
			return <Navigate to={"/" + next()} replace={true}/>
		}

		return (
			<div align="center" className="margin-top-30">
				<h1>Login To View</h1>
				<form style={{width: "600px"}} onSubmit={this.handleSubmit}>
				  <div class="mb-3">
				    <input
				    	type="email"
				    	class={`form-control ${invalid_email?'border-danger':''}`}
				    	placeholder="Email Address"
				    	value={this.state.email}
				    	onChange={e => this.setState({ email: e.target.value })}
				    />
				  </div>
				  <div class="mb-3">
				    <input 
				    	type="password"
				    	className={`form-control ${invalid_pass?'border-danger':''}`}
				    	placeholder="Password"
				    	value={this.state.password}
				    	onChange={e => this.setState({ password: e.target.value })}
				    />
				  </div>
				  {err && <div className="text-danger">Login failed! { err }</div> }
				  {success && <div className="text-success">Login successful! Redirecting ...</div> }
				  <button type="submit" class="btn btn-primary margin-top-30">Login</button>
				</form>
			</div>
		);
	}
}

export default Login;