import React, { Component } from 'react';
import axios from 'axios';



class GetUser extends Component {
	constructor() {
		super();
		this.state = {
			displayData: []
		};
	}
		
		
		
	componentDidMount() {
		this.retrieveData();
	}
	retrieveData(){
		axios.get('http://localhost:5000/member', {
			params: {
				query: {}
			}
		})
			.then((response) => {
				this.props.displayData({}, [response.data["names"]].concat(response.data["result"]), response.data["orgName"], response.data["prim_key"]);
			});
	}

	getUser = (e) => {
			e.preventDefault();
			const formFields = [document.querySelector('#sel-memberID'), document.querySelector('#sel-mFirst'),
                document.querySelector('#sel-mLast'),document.querySelector('#sel-street'), 
                document.querySelector('#sel-streetNumber'), document.querySelector('#sel-postalCode'), 
                document.querySelector('#sel-mBirthdate')];
			const [ID, mFirst, mLast, street, streetNumber,postalCode, mBirthdate] = formFields.map((field) => field.value);
			formFields.map((field) => field.value = "");
			var selquer = {
				ID: ID,
				mFirst: mFirst,
                mLast: mLast,
                street: street,
                streetNumber: streetNumber,
                postalCode: postalCode,
				mBirthdate: mBirthdate
			};
			for (var x in selquer) {
				if (selquer[x] === "") {
					delete selquer[x];
				}
			}
			axios.get('http://localhost:5000/member', {
				params: {
					query: selquer
				}
			})
				.then((response) => {
					console.log("response");
					console.log(response.data);
					this.props.displayData(selquer, [response.data["names"]].concat(response.data["result"]), response.data["orgName"], response.data["prim_key"]);
				});
		};

		insUpdate = (e) => {
			e.preventDefault();
			const formFields = [document.querySelector('#sel-memberID'), document.querySelector('#sel-mFirst'),
                document.querySelector('#sel-mLast'),document.querySelector('#sel-street'), 
                document.querySelector('#sel-streetNumber'), document.querySelector('#sel-postalCode'), 
                document.querySelector('#sel-mBirthdate')];
			const [ID, mFirst, mLast, street, streetNumber,postalCode, mBirthdate] = formFields.map((field) => field.value);
			formFields.map((field) => field.value = "");
			var selquer = {
				ID: ID,
				mFirst: mFirst,
                mLast: mLast,
                street: street,
                streetNumber: streetNumber,
                postalCode: postalCode,
				mBirthdate: mBirthdate
			};
			for (var x in selquer) {
				if (selquer[x] === "") {
					delete selquer[x];
				}
			}
			axios.post('http://localhost:5000/member', selquer)
			.then((response) => {
				this.retrieveData();
				console.log(response);
			}).then((body) => {
				console.log(body);
			});
		};

	render() {
		return (
			<div className="GetUser">
				<h2>User Info</h2>
				<form>
					User ID: <input type="text" id="sel-memberID" />
					First Name: <input type="text" id="sel-mFirst" />
					Last Name: <input type="text" id="sel-mLast" />
                    Street: <input type="text" id="sel-street" />
                    Street No.: <input type="text" id="sel-streetNumber" />
                    Postal Code: <input type="text" id="sel-postalCode" />
					Birth Date : <input type="date" id="sel-mBirthdate" />
					<button onClick={this.getUser}>Get User</button>
				</form>
			</div>
		);
	}
}



export default GetUser;
