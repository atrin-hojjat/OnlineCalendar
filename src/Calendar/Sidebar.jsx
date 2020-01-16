import React from 'react'
import ReactDOM from 'react-dom'

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {data : []}
		this.load = this.load.bind(this);
		this.open = this.open.bind(this);
	}

	async componentDidMount() {
		await this.load();
	}

	async load() {
		console.log("Loading Calendars");
		fetch("http://localhost:3131/cal/calendars", {
			method: 'GET',
			headers: {'auth_token': this.props.auth_token}})
			.then(async res => {
				if(res.status !== 200) {
					console.log(res.status);
					return ;
				}

				res = await res.json();
				console.log(res);
				this.setState({data: res.calendars});
			}, err => {
				console.error(err.stack());
			});

	}

	open(id) {

		return fetch('http://localhost:3131/cal/tasks/get_all/' + id, {
			method: 'GET',
			headers: {
				'auth_token': this.props.auth_token,
				'Content-Type': 'text/plain'
			}
		}).then(async res => {
			console.log(res.status)
			if(res.status != 200) {
				this.props.upd("<h1> Internal Server Error </h1>");
				return -1;
			}
			res.json().then(js => {
				console.log(js);
				this.props.upd(js.values);
			});
		}, err => {
			console.log(err);
			this.props.upd("<h1> Connection Error </h1>");
		});

	}

	render () {
		let items = [];
		console.log(this.state);
		for(let x of this.state.data) {
			items.push(<li onClick={() => this.open(x.calendar_id)}> {x.cname} </li>)
		}
		return (
			<ul>
				{items}
			</ul>
		);
	}
}

export default Sidebar;
