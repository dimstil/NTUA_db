import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Toolbar from './Components/Toolbar/Toolbar'
import { type } from 'os';
import GetBook from './Components/GetBook';
import GetAuthor from './Components/GetAuthor';
import GetUser from './Components/GetUser';
import SideDrawer from './Components/SideDrawer/SideDrawer';
import Backdrop from './Components/Backdrop/Backdrop';
import DisplayTable from './Components/DisplayTable';
//import AlertDismissable from './Components/AlertDismissable';
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

  setType = (type) => {
    this.setState({
      sideDrawerOpen: false,
      type: type,
      displayedData: [],
      displayedFields: {},
      prim_key: {},
      query: {}
    });
  };

  setHomepageType = () => {
    this.setState({
      sideDrawerOpen: false,
      type: "homepage"
    });
  };

  displayData = (query, displayedData, displayedFields, prim_key) => {
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

    switch(this.state.type){
      case("homepage"):
        renderType = <div />;
        break;
      case("book"):
        renderType = <div className="App-Content">
          <GetBook displayData={this.displayData}/>
          <DisplayTable type={this.state.type} query={this.state.query} 
                  displayedData={this.state.displayedData} 
                  displayedFields={this.state.displayedFields} 
                  prim_key={this.state.prim_key}/></div>;
        break; 
      case("author"):
        renderType = <div className="App-Content">
          <GetAuthor displayData={this.displayData}/>
          <DisplayTable type={this.state.type} query={this.state.query} 
              displayedData={this.state.displayedData} 
              displayedFields={this.state.displayedFields} 
              prim_key={this.state.prim_key}/>
            </div>
        break;  
        case("member"):
        renderType = <div className="App-Content">
          <GetUser displayData={this.displayData}/>
          <DisplayTable type={this.state.type} query={this.state.query} 
              displayedData={this.state.displayedData} 
              displayedFields={this.state.displayedFields} 
              prim_key={this.state.prim_key}/>
            </div>
        break; 
      default:
        renderType = <h1>ERROR</h1>;  
    }

    return (
      <div className="App">
		    <Toolbar changeType={this.setType} home={this.setHomepageType} drawerClickHandler={this.drawerToggleClickHandler}/>
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
        <main>
          <div className="Content">
            {renderType}
          </div>
        </main>

      </div>

    );
  }
}

export default App;
