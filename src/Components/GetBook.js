import React, { Component } from 'react';
import axios from 'axios';
import logo from '../logo.svg';


class GetBook extends Component {
	constructor() {
		super();
		this.state = {};
	}

	componentDidMount() {
		this.retrieveData()
	}
	retrieveData() {
		axios.get('http://localhost:5000/book', {
			params: {
				query: {}
			}
		})
			.then((response) => {
				this.props.displayData({}, [response.data["names"]].concat(response.data["result"]), response.data["orgName"], response.data["prim_key"]);
			});
	}

	getBook = (e) => {
		e.preventDefault();
		const formFields = [document.querySelector('#sel-isbn'), document.querySelector('#sel-title'),
		document.querySelector('#sel-pub-year'), document.querySelector('#sel-page-num'),
		document.querySelector('#sel-pub-name')];
		const [isbn, title, pubYear, numPage, pubName] = formFields.map((field) => field.value);
		
		var selquer = {
			isbn: isbn,
			title: title,
			pubYear: pubYear,
			numPages: numPage,
			pubName: pubName
		};
		for (var x in selquer) {
			if (selquer[x] === "") {
				delete selquer[x];
			}
		}
		axios.get('http://localhost:5000/book', {
			params: {
				query: selquer
			}
		})
			.then((response) => {
				if (response.data.errorMsg) {
					this.props.throwError(response.data.errorMsg)
				} else {
					this.props.displayData(selquer, [response.data["names"]].concat(response.data["result"]), response.data["orgName"], response.data["prim_key"]);
				}
			});
	};

	insUpdate = (e) => {
		e.preventDefault();
		const formFields = [document.querySelector('#sel-isbn'), document.querySelector('#sel-title'),
		document.querySelector('#sel-pub-year'), document.querySelector('#sel-page-num'),
		document.querySelector('#sel-pub-name')];
		const [isbn, title, pubYear, numPage, pubName] = formFields.map((field) => field.value);

		formFields.map((field) => field.value = "");
		var selquer = {
			isbn: isbn,
			title: title,
			pubYear: pubYear,
			numPages: numPage,
			pubName: pubName
		};

		// Object.keys(selquer).forEach((field)=>{
		// 	if(selquer[field] === null){
		// 		this.props.error('Important Field is Empty');
		// 		return;
		// 	}
		// });
		//formFields.map((field) => field.value = "");

		// for (var x in selquer) {
		// 	if (selquer[x] === "") {
		// 		delete selquer[x];
		// 	}
		// }
		axios.post('http://localhost:5000/book', selquer)
			.then((response) => {
				if (response.data.errorMsg) {
					this.props.throwError(response.data.errorMsg);
				} 
					this.retrieveData();
			})
	};

	render() {
		return (
			<div className="GetBook">
				<h2>Book Info</h2>
				<form>
					ISBN: <input type="text" id="sel-isbn" placeholder ="Digits(13 for insert or less for get)"/><br/>
					Title: <input type="text" id="sel-title" placeholder = "e.g Bible"/><br/>
					Year Published: <input type="text" id="sel-pub-year" placeholder="e.g 1997" /><br/>
					#pages : <input type="text" id="sel-page-num" placeholder="e.g 500"/><br/>
					Published by: <input type="text" id="sel-pub-name" placeholder="e.g OfhsProd"/><br/>
					<button onClick={this.getBook}>Get book</button>
					<button onClick={this.insUpdate} className="formInput">Insert Book</button>
				</form>
			</div>
		);
	}
}

export default GetBook;
