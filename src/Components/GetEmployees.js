import React, { Component } from 'react';
import axios from 'axios';
import './Form.css'



class GetEmployee extends Component {
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
		axios.get('http://localhost:5000/view2', {
			params: {
				query: {}
			}
		})
			.then((response) => {
				this.props.displayData({}, [response.data["names"]].concat(response.data["result"]), response.data["orgName"], response.data["prim_key"]);
			});
	}

	getEmployee = (e) => {
			e.preventDefault();
			const formFields = [document.querySelector('#sel-eFirst'),
                document.querySelector('#sel-eLast')];
			const [eFirst, eLast] = formFields.map((field) => field.value);
			formFields.map((field) => field.value = "");
			var selquer = {
				eFirst: eFirst,
                eLast: eLast
			};
			for (var x in selquer) {
				if (selquer[x] === "") {
					delete selquer[x];
				}
			}
			axios.get('http://localhost:5000/view2', {
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

		insert = (e) => {
			e.preventDefault();
			const formFields = [document.querySelector('#sel-eFirst'),
                document.querySelector('#sel-eLast')];
			const [eFirst, eLast] = formFields.map((field) => field.value);
			formFields.map((field) => field.value = "");
			var selquer = {
				eFirst: eFirst,
                eLast: eLast      
			};
			// for (var x in selquer) {
			// 	if (selquer[x] === "") {
			// 		delete selquer[x];
			// 	}
			// }
			axios.post('http://localhost:5000/view2', selquer)
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
			<div className="GetEmployee">
				<h2>Employee Info</h2>
				<form>
					First Name: <input type="text" id="sel-eFirst" placeholder="e.g Babis"/><br/>
					Last Name: <input type="text" id="sel-eLast" placeholder = "e.g Xaralabidis"/><br/>
					<button onClick={this.getEmployee}>Get Employee</button>
					<button onClick={this.insert} className="formInput">Insert Employee</button>
				</form>
			</div>
		);
	}
}



export default GetEmployee;
