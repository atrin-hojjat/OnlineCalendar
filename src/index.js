import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Calendar/Calendar.jsx'
import './index.css';
// import App from './App.jsx';
import Login from './LoginPage/Login.jsx';
import {DBmanager} from './Database/database.js';
import * as serviceWorker from './serviceWorker';

class Main extends React.Component {
	constructor() {
		super();
		this.state = {loged: false, key: {}};
		this.checkLogin = this.checkLogin.bind(this);
	}

	checkLogin(key) {
		let st = this.state;
		st.loged = true; st.key = key;
		this.setState(st);
	}

  	render() {
		let logedin = this.state.loged;
		if(logedin) {
			console.log(this.state.key);
			return <Calendar auth_token={this.state.key}/>
		} else return <Login handler={this.checkLogin}/>
		//return (this.state.loged ? <h1> test </h1> : <Login handler={this.checkLogin()} />);
  	}
}

ReactDOM.render( <Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
