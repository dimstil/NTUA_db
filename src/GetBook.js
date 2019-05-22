import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';


class GetBook extends Component {
  constructor() {
    super();
	this.state = {};
  }

  insert = (e) => {
    e.preventDefault();
	
    const isbn = document.querySelector('#isbn').value;
    const title = document.querySelector('#title').value;
    const pubYear = document.querySelector('#pub-year').value;
    const numPage = document.querySelector('#page-num').value;
    const pubName = document.querySelector('#pub-name').value;
    var selquer = {
      isbn: isbn,
      title: title,
      pubYear: pubYear,
      numPage: numPage,
      pubName: pubName
    }
	for(x in selquer){
		if (selquer[x] === ""){
			delete selquer[x];
		}
	}
	
	axios.get('http://localhost:5000/book', selquer)
    .then(function(response) {
		this.state = response.data;
	 });
  };
  
  renderRows = () =>{
	  for(books in this.state) {

		renderObj(books);
			
		);
	}
  }
  
  renderObj = (books) =>{
	  for (infos in books){
		  renderInfo(infos);

  render() {
    return (
		<div className="BookTable">
		  <div className="GetBook">
			<h2>Book Info</h2>
			
			  ISBN: <input type="text" id="isbn" />
			  Title: <input type="text" id="title" />
			  Published on: <input type="text" id="pub-year" />
			  #pages : <input type="text" id="page-num" />
			  Published by: <input type="text" id="pub-name" />
			  <button onClick={this.getBook}>Get book</button>			
		  </div>
		  <table id="books">
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
			{
				renderRows();
			}
		</table>
    );
  }
}
export default GetBook;
