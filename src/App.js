import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Toolbar from './Components/Toolbar/Toolbar'
import { type } from 'os';
import GetBook from './Components/GetBook';
import SideDrawer from './Components/SideDrawer/SideDrawer';
import Backdrop from './Components/Backdrop/Backdrop';
class App extends Component {
  constructor() {
    super();
    this.state = {
      sideDrawerOpen: false,
      type: "homepage"
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
  }

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  }

  renderBasedOnType(){
    if (this.state[type] === "book"){
      return(<GetBook/>);
    } else {
      return(<div/>);
    }
  }

  render() {
  
    let backdrop;
    let renderType;
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler}/>;
    }

    if (this.state.type === "book"){
      renderType = <GetBook />;
    } else {
      renderType = <div />
    }

    return (
      <div className="App" style={{height: '100%'}}>
		    <Toolbar changeType={this.setBookType} home={this.setHomepageType} drawerClickHandler={this.drawerToggleClickHandler}/>
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
        <main style={{marginTop: '64px'}}>
          <div className="Content">
            {renderType}
          </div>
        </main>
        
      </div>
	 
    );
  }
}
export default App;
