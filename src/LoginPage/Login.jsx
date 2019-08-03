import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import {DBmanager} from '../Database/database.js';
import {Popup} from './Elements/PopupNotification/PopupList.jsx';
import './Login.css';

// class LoginForm extends React.Component {
const LoginForm = () => {
	const [username, setusername] = useState("");
	const [psw, setpsw] = useState("");
	const defaultMsg = {type: "NONE", title:"NONE", msg:"NONE"};
	const [msg, setmsg] = useState(defaultMsg);

	const changeMsg = e => {
		setmsg(e);
	}

	const clearMsg = e => {
		setmsg(defaultMsg);
	}

	const handleUsr = e => {
		setusername(e.target.value);
	}

	const handlePsw = e => {
		setpsw(e.target.value);
	}

	const login = e => {
		if(DBmanager.login(username, psw)) {
		} else {
			changeMsg({type: "popupError", title: "Login Failed", message:"Incorrect Username or Password"});
		}
	}


	// render() {
		return (
			<div className="form" id="login">
				<h1>Log In</h1>
				{msg.type === "NONE" ? null : <Popup remove={clearMsg} info={msg}/>}
				<input type="text" value={username} onChange={handleUsr} placeholder="Username" />
				<input type="password" onChange={handlePsw} placeholder="password" />
				<button onClick={() => login()} disabled={!username || !psw} >Log In</button>
			</div>
		);
	// }
}

//class SignupForm extends React.Component {
const SignupForm = () => {
	const [username, setusername] = useState("");
	const [psw, setpsw] = useState("");
	const [rpsw, setrpsw] = useState("");
	const [email, setemail] = useState("");
	const [ok, updstat] = useState(false);



	const handleUsr = e => {
		setusername(e.target.value);
		// checkstat();
		if(e.target.value === "hello") updstat(true);
		else updstat(false);
		// console.log("" + e.target.value + " " + ok);
	}

	const handlePsw = e => {
		setpsw(e.target.value);
	}
	const handleEmail = e => {
		setemail(e.target.value);
	}

	const handleRPsw = e => {
		setrpsw(e.target.value);
	}

	const signup = e => {

	}
	// render() {
		return (
			<div className="form" id="signup">
				<h1>Sign up</h1>
				<input type="text" value={username} onChange={handleUsr} placeholder="Username" />
				<input type="password" value={psw} onChange={handlePsw} placeholder="password" />
				<input type="password" value={rpsw} onChange={handleRPsw} placeholder="password" />
				<input type="text" value={email} onChange={handleEmail} placeholder="example@test.foo" />
				<button onClick={() => signup()} disabled={!ok}>Sign up</button>
			</div>
		);
	// }
}



class Login extends React.Component {

	render() {
		return (
			<div className="platform">
			<LoginForm/>
			<SignupForm/>
			</div>
		);
	}
}

export default Login;
