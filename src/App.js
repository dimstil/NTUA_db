import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Toolbar from './Components/Toolbar/Toolbar'
import { type } from 'os';
import GetBook from './Components/GetBook';
import SideDrawer from './Components/SideDrawer/SideDrawer';
import Backdrop from './Components/Backdrop/Backdrop';
import DisplayTable from './Components/DisplayTable';
class App extends Component {
  constructor() {
    super();
    this.state = {
      sideDrawerOpen: false,
      type: "homepage",
      displayedData: [],
      displayedFields: {},
      prim_key: {},
      query: {}
    };
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };

  setBookType = () => {
    this.setState({
      sideDrawerOpen: false,
      type: "book"
    });
  };

  setHomepageType = () => {
    this.setState({
      sideDrawerOpen: false,
      type: "homepage"
    });
  };

  displayData = (query, displayedData, displayedFields, prim_key) => {
    console.log(query, displayedData, displayedFields, prim_key);
    this.setState({query: query, displayedData: displayedData, displayedFields: displayedFields, prim_key: prim_key});
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  };


  render() {
    let backdrop;
    let renderType;
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler}/>;
    }

    if (this.state.type === "book"){
      renderType = <GetBook displayData={this.displayData}/>;
    } else {
      renderType = <div />
    }

    return (
      <div className="App">
		    <Toolbar changeType={this.setBookType} home={this.setHomepageType} drawerClickHandler={this.drawerToggleClickHandler}/>
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
        <main>
          <div className="Content">
            {renderType}
          <DisplayTable type={this.state.type} query={this.state.query} displayedData={this.state.displayedData} displayedFields={this.state.displayedFields} prim_key={this.state.prim_key}/>
          </div>
        </main>

      </div>

    );
  }
}

export default App;
