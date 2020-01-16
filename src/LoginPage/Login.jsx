import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import {DBmanager} from '../Database/database.js';
import {Popup} from './Elements/PopupNotification/PopupList.jsx';
import './Login.css';

// class LoginForm extends React.Component {
function LoginForm(props) {
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
		let bdy = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(psw);
		return fetch('http://localhost:3131/usr/login',{
			method: 'POST',
  			headers: {
    			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  			},
			body: bdy
		}).then(async res_ => {

				let key = (await res_.json()).auth_token;
				props.handler(key);
			}, err => {
				console.log(err);
				changeMsg({type: "ERROR", title: "Connection Error", msg: "Please try again later, or call the admin"})
			});
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
const SignupForm = (props) => {
	//TODO a total redo is probably necessary

	const [username, setusername] = useState("");
	const [psw, setpsw] = useState("");
	const [rpsw, setrpsw] = useState("");
	const [email, setemail] = useState("");
	const [ok, updstat] = useState(false);
	const [okT,updc] = useState({usr: false, psw: false, rpsw:false, em: false});
	const defaultMsg = {type: "NONE", title:"NONE", msg:"NONE"};
	const [msgUSR, setmsgUSR] = useState(defaultMsg);
	const [msgRPSW, setmsgRPSW] = useState(defaultMsg);
	const [msgEM, setmsgEM] = useState(defaultMsg);

	const clearMsgUSR = e => {
		setmsgUSR(defaultMsg);
	}
	const clearMsgRPSW = e => {
		setmsgRPSW(defaultMsg);
	}
	const clearMsgEM = e => {
		setmsgEM(defaultMsg);
	}

	const checkOK = e => {
		console.log(okT);
		if(okT.usr && okT.psw && okT.rpsw && okT.em)
			updstat(true);
	}

	const handleUsr = e => {
		if(!/([A-Z]?[a-z]?[0-9]?)*/g.test(e.target.value)) {
			setmsgUSR({type: "ERROR", title: "Your username can only consist of numbers and letters", msg: ""})
			updstat(false);
		} else {updc({usr : true}); clearMsgUSR(); }
		setusername(e.target.value);
		checkOK();
		// checkstat();
		// console.log("" + e.target.value + " " + ok);
	}

	const handlePsw = e => {
		if(e.target.value != "") updc({psw : false});
		else updc({psw : true})
		setpsw(e.target.value);
		checkOK();
	}
	const handleEmail = e => {
		if(!/(\w|\d)+@(\w|\d)+.(\w)+/g.test(e.target.value)) {
			setmsgEM({type: "ERROR", title: "Please Enter a valid Email address", msg: ""})
			updstat(false);
			updc({em : false})
		} else { updc({em : true});clearMsgEM() }
		setemail(e.target.value);
		checkOK();
	}

	const handleRPsw = e => {
		if(e.target.value != psw) {
			setmsgRPSW({type: "ERROR", title: "Your Passwords do not match", msg: ""})
			updstat(false);
			updc({rpsw : false})
		} else {updc({rpsw : true});clearMsgRPSW(); }
		setrpsw(e.target.value);
		checkOK();
	}

	const signup = e => {
		let bdy = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(psw)
				+ "&email=" + encodeURIComponent(email);
		return fetch('http://localhost:3131/usr/singup',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			body: bdy
		}).then(async res_ => {

				let res = await res_.json();
				console.log(res);
				if(res.status == 200) {
					props.handler(res.auth_token);
				} else {
					setmsgUSR({type: "ERROR", title: "Error", msg: res.message});
				}
			}, err => {
				console.log(err);
				setmsgUSR({type: "ERROR", title: "Connection Error", msg: "Please try again later, or call the admin"})
			});
	}
	// render() {
		return (
			<div className="form" id="signup">
				<h1>Sign up</h1>
				{msgUSR.type === "NONE" ? null : <Popup remove={clearMsgUSR} info={msgUSR}/>}
				<input type="text" value={username} onChange={handleUsr} placeholder="Username" />
				<input type="password" value={psw} onChange={handlePsw} placeholder="password" />
				{msgRPSW.type === "NONE" ? null : <Popup remove={clearMsgRPSW} info={msgRPSW}/>}
				<input type="password" value={rpsw} onChange={handleRPsw} placeholder="password" />
				{msgEM.type === "NONE" ? null : <Popup remove={clearMsgEM} info={msgEM}/>}
				<input type="text" value={email} onChange={handleEmail} placeholder="example@test.foo" />
				<button onClick={() => signup()} disabled={!ok}>Sign up</button>
			</div>
		);
	// }
}



class Login extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="platform">
			<LoginForm {...this.props}/>
			<SignupForm {...this.props}/>
			</div>
		);
	}
}

export default Login;
