import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './Sidebar.jsx'

class Calendar extends React.Component {
	constructor(props) {
		super(props);
		this.status = {data: ""};
		this.editData = this.editData.bind(this);
	}

	editData(nd) {
		let st = this.status;
		st.data = nd;
		this.setState(st);
	}

	render() {
		console.log("Calendar :");
		console.log(this.props);
		return (<div> 
				<Sidebar upd={this.editData} {...this.props}/>  {this.status.data}  
				</div>
		);
	}
}


export default Calendar;
