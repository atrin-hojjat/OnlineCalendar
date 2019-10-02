const config = require("./config.json");

class DB {
	constructor() {
		this.test = false;
	}

	login(usr, psw) {
		let bdy = "username=" + encodeURIComponent(usr) + "&password=" + encodeURIComponent(psw);
/*		fetch({
			method: 'POST',
  			headers: {
    			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  			},
			body: bdy
		}).then(res_ => {

			console.log(res_.json());
		}).catch*/
		return true;
	}

	logedIn() {
		return this.test;
	}
}

var connection = new DB();

export {connection as DBmanager};
