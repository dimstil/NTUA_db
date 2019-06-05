import React, { Component } from 'react';
import axios from 'axios';



class GetAuthor extends Component {
	constructor() {
		super();
		this.state = {
			displayData: []
		};
	}
		
		
		
	componentDidMount() {
		this.retrieveData()
	}
	retrieveData(){
		axios.get('http://localhost:5000/author', {
			params: {
				query: {}
			}
		})
			.then((response) => {
				this.props.displayData({}, [response.data["names"]].concat(response.data["result"]), response.data["orgName"], response.data["prim_key"]);
			});
	}

	getAuthor = (e) => {
			e.preventDefault();
			const formFields = [document.querySelector('#sel-authID'), document.querySelector('#sel-aFirst'),
			document.querySelector('#sel-aLast'), document.querySelector('#sel-aBirthdate')];
			const [ID, aFirst, aLast, aBirthdate] = formFields.map((field) => field.value);
		//	formFields.map((field) => field.value = "");
			var selquer = {
				ID: ID,
				aFirst: aFirst,
				aLast: aLast,
				aBirthdate: aBirthdate
			};
			for (var x in selquer) {
				if (selquer[x] === "") {
					delete selquer[x];
				}
			}
			axios.get('http://localhost:5000/author', {
				params: {
					query: selquer
				}
			})
				.then((response) => {
					if (response.data.errorMsg) {
						this.props.throwError(response.data.errorMsg);
					} else
					this.props.displayData(selquer, [response.data["names"]].concat(response.data["result"]), response.data["orgName"], response.data["prim_key"]);
				});
		};

		insUpdate = (e) => {
			e.preventDefault();
			const formFields = [document.querySelector('#sel-authID'), document.querySelector('#sel-aFirst'),
			document.querySelector('#sel-aLast'), document.querySelector('#sel-aBirthdate')];
			const [ID, aFirst, aLast, aBirthdate] = formFields.map((field) => field.value);
		//	formFields.map((field) => field.value = "");
			var selquer = {
				ID: ID,
				aFirst: aFirst,
				aLast: aLast,
				aBirthdate: aBirthdate
			};
			// for (var x in selquer) {
			// 	if (selquer[x] === "") {
			// 		delete selquer[x];
			// 	}
			// }
			axios.post('http://localhost:5000/author', selquer)
				.then((response) => {
					if (response.data.errorMsg) {
						this.props.throwError(response.data.errorMsg);
					} 
					this.retrieveData();
					
		})
	};

	render() {
		return (
			<div className="GetAuthor">
				<h2>Author Info</h2>
				<form>
					Author ID: <input type="text" id="sel-authID" />
					First Name: <input type="text" id="sel-aFirst" />
					Last Name: <input type="text" id="sel-aLast" />
					Birth Date : <input type="date" id="sel-aBirthdate" />
					<button onClick={this.getAuthor}>Get Author</button>
					<button onClick={this.insUpdate} className="formInput">Insert/Update</button>
				</form>
			</div>
		);
	}
}



export default GetAuthor;
