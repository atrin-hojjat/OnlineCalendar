

class DB {
	login(usr, psw) {
		return false;
	}
}

var connection = new DB();

export {connection as DBmanager};
