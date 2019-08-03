import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App.jsx';
import Login from './LoginPage/Login.jsx';
import * as serviceWorker from './serviceWorker';

function isLogedIn() {
	return false;
}

class Main extends React.Component {

  	render() {
    	if(isLogedIn()) {
			return <h1> test </h1>//<App />
		} else {
			return <Login />
		}
  	}
}

ReactDOM.render( <Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
