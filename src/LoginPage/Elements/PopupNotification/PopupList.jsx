import React from 'react';
// import ReactDOM from 'react-dom';
import "./Popup.css"

class Popup extends React.Component {
	render() {
		return (<div className={"popupdiv " + this.props.info.type}>
			<div>
			<h2 className={"popuph2 " + this.props.info.type}>
			<button  className={"popupbutton " + this.props.info.type} onClick={this.props.remove}> x </button>
			{this.props.info.title}
			</h2>
			</div>
			<div><p className={"popupp " + this.props.info.type}> {this.props.info.message} </p></div>
		</div>
		)
	}
}

// var pps = [];
/*
const PopupList = () => {
	return (<div className="popups">
		{pps.forEach((x) => {
			console.log("test");
			// <Popup remove={remove(x.id)} info={x}/>
		})} </div>);
};

function add(jpop) {
	var id = 0;
	pps.forEach( (x) => {
		if(x.id >= id) id = x.id + 1;
	})
	jpop.id = id;
	pps.push(jpop);
	return id;
}

function create(typei, titlei, messagei) {
	// type = popupError, popupWarning, popupAlert, popupSuccess
	return add({type: typei, title: titlei, message: messagei});
}

function remove(id) {
	for(var i = 0; i < pps.size(); i++) {
		if(this.pps[i].id === id) {
			console.log("Removing  "+ this.pps[i].id+ " ...");
			console.log(this.pps[i]);
			this.pps.split(i, 1);
			break;
		}
	}
}*/

// export {PopupList};
export {Popup};
// export {add as addPopupJson, create as createPopup, remove as removePopup};
