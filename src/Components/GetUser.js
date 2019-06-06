import React, { Component } from 'react';
import axios from 'axios';
import './Form.css'



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
					if (response.data.errorMsg) {
						this.props.throwError(response.data.errorMsg);
					} else
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
			// for (var x in selquer) {
			// 	if (selquer[x] === "") {
			// 		delete selquer[x];
			// 	}
			// }
			axios.post('http://localhost:5000/member', selquer)
			.then((response) => {
				if (response.data.errorMsg) {
					this.props.throwError(response.data.errorMsg);
				} 
				this.retrieveData();
				console.log(response.data.errorMsg);
			});
		};

	render() {
		return (
			<div className="GetUser">
				<h2>Member Info</h2>
				<form>
					Member ID: <input type="text" id="sel-memberID" placeholder="Number"/><br/>
					First Name: <input type="text" id="sel-mFirst" placeholder="e.g Babis"/><br/>
					Last Name: <input type="text" id="sel-mLast" placeholder = "e.g Xaralabidis"/><br/>
                    Street: <input type="text" id="sel-street" placeholder = "e.g Hroon Politexneiou" /><br/>
                    Street No.: <input type="text" id="sel-streetNumber" placeholder="Number e.g. 232"/><br/>
                    Postal Code: <input type="text" id="sel-postalCode" placeholder="5 digit number e.g.6666"/><br/>
					Birth Date : <input type="date" id="sel-mBirthdate" /><br/>
					<button onClick={this.getUser}>Get Member</button>
					<button onClick={this.insUpdate} className="formInput">Insert Member</button>
				</form>
			</div>
		);
	}
}



export default GetUser;
