import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
  }

  insert = (e) => {
    e.preventDefault();
    const isbn = document.querySelector('#isbn').value;
    const title = document.querySelector('#title').value;
    const pubYear = document.querySelector('#pub-year').value;
    const numPage = document.querySelector('#page-num').value;
    const pubName = document.querySelector('#pub-name').value;
    axios.post('http://localhost:5000/book', {
      isbn: isbn,
      title: title,
      pubYear: pubYear,
      numPage: numPage,
      pubName: pubName
    })
    .then(function(response) {
      console.log(response);
    }).then(function(body) {
      console.log(body);
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Hello World!</h1>
        <form>
          ISBN: <input type="text" id="isbn" />
          Title: <input type="text" id="title" />
          Published on: <input type="text" id="pub-year" />
          #pages : <input type="text" id="page-num" />
          Published by: <input type="text" id="pub-name" />
          <button onClick={this.insert}>Add book</button>
        </form>
      </div>
    );
  }
}
export default App;
