import React, { Component } from 'react';
import axios from 'axios';
import logo from '../logo.svg';


class GetBook extends Component {
	constructor() {
		super();
		this.state = {
			displayData: []
		};
		
		axios.get('http://localhost:5000/book', {
			params: {
				query: {}
			}
		})
			.then((response) => {
				this.setState({ displayData: response.data });
			});
	}

	getBook = (e) => {
		
		e.preventDefault();

		const isbn = document.querySelector('#sel-isbn').value;
		const title = document.querySelector('#sel-title').value;
		const pubYear = document.querySelector('#sel-pub-year').value;
		const numPage = document.querySelector('#sel-page-num').value;
		const pubName = document.querySelector('#sel-pub-name').value;
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
				this.setState({ displayData: response.data });
			});
	};

	renderRows = () => {
		for (var books in this.state) {

			this.renderObj(books);
		}
	}

	renderObj = (books) => {
		for (var infos in books) {
			this.renderInfo(infos);
		}
	}

	render() {
		this.state.displayData.map(() => { console.log('1') });
		return (
			<div className="BookTable">
				<div className="GetBook">
					<h2>Book Info</h2>

					ISBN: <input type="text" id="sel-isbn" />
					Title: <input type="text" id="sel-title" />
					Published on: <input type="text" id="sel-pub-year" />
					#pages : <input type="text" id="sel-page-num" />
					Published by: <input type="text" id="sel-pub-name" />
					<button onClick={this.getBook}>Get book</button>
				</div>
				<table id="books">
					<thead>
						<tr>
							<th>
								ISBN
				</th>
							<th>
								Title
				</th>
							<th>
								Published on
				</th>
							<th>
								No. of Pages
				</th>
							<th>
								Published by:
				</th>
							<th>
								No. of Copies
				</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.displayData.map((bookObj, i) => {
								return (<BookRow key={i} object={bookObj}></BookRow>)
							})
						}
					</tbody>
				</table>
			</div>
		);
	}
}

class BookRow extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (<tr>
			{Object.values(this.props.object).map((domain, i) => {
				return(<td key={i}>{domain}</td>)
			})}
		</tr>
		);
	}
}

export default GetBook;
