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
import AlertDismissable from './Components/AlertDismissable';
import Carousel from './carousel/Carousel';
import './Components/Form.css'
import GetEmployees from './Components/GetEmployees';


class App extends Component {
  constructor() {
    super();
    this.state = {
      sideDrawerOpen: false,
      type: "homepage",
      displayedData: [],
      displayedFields: {},
      prim_key: {},
      query: {},
      errorMsg:""
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
      query: {},
      errorMsg: this.state.errorMsg
    });
  };

  setErrorMsg = (e) => {
    this.setState({
      sideDrawerOpen: false,
      type: this.state.type,
      displayedData: this.state.displayedData,
      displayedFields: this.state.displayedFields,
      prim_key: this.state.prim_key,
      query: this.state.query,
      errorMsg: e
    });
    console.log(this.state);
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
        renderType = <div><Carousel/></div>;
        break;
      case("book"):
        renderType = <div className="App-Content">
          <GetBook displayData={this.displayData} throwError={this.setErrorMsg}/>
          <DisplayTable type={this.state.type} query={this.state.query} 
                  displayedData={this.state.displayedData} 
                  displayedFields={this.state.displayedFields} 
                  prim_key={this.state.prim_key}
                  throwError={this.setErrorMsg}/></div>;
        break; 
      case("author"):
        renderType = <div className="App-Content">
          <GetAuthor displayData={this.displayData} throwError={this.setErrorMsg}/>
          <DisplayTable type={this.state.type} query={this.state.query} 
              displayedData={this.state.displayedData} 
              displayedFields={this.state.displayedFields} 
              prim_key={this.state.prim_key}
              throwError={this.setErrorMsg}
              />
            </div>
        break;  
        case("member"):
        renderType = <div className="App-Content">
          <GetUser displayData={this.displayData} throwError={this.setErrorMsg}/>
          <DisplayTable type={this.state.type} query={this.state.query} 
              displayedData={this.state.displayedData} 
              displayedFields={this.state.displayedFields} 
              prim_key={this.state.prim_key}
              throwError={this.setErrorMsg}/>
            </div>
        break; 
        case("view2"):
        renderType = <div className="App-Content">
          <GetEmployees displayData={this.displayData} throwError={this.setErrorMsg}/>
          <DisplayTable type={this.state.type} query={this.state.query} 
          displayedData={this.state.displayedData} 
          displayedFields={this.state.displayedFields} 
          prim_key={this.state.prim_key}
          throwError={this.setErrorMsg}/>
        </div>
        break;
      default:
        renderType = <h1>ERROR</h1>;  
    }
    console.log(this.state.errorMsg);
    return (
      <div className="App">
        <Toolbar changeType={this.setType} style={{zIndex:'20'}} //home={this.setHomepageType} 
        drawerClickHandler={this.drawerToggleClickHandler}
        style={{zIndex:"600"}}/>
        <SideDrawer changeType={this.setType} show={this.state.sideDrawerOpen}
         drawerClickHandler={this.drawerToggleClickHandler} throwError={this.setErrorMsg}/>
        {backdrop}
        <main>
          
          <div className="Content">
          <AlertDismissable className="Alert" msg={this.state.errorMsg}
          style= {{position: "relative", top: "56px", display: "flex",
          background: "red"  
        }}
          handleDism ={() => this.setErrorMsg("")}/>
            {renderType}
          </div>
        </main>

      </div>

    );
  }
}

export default App;
