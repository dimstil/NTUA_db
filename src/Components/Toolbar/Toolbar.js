import React,{ Component } from 'react';
import './Toolbar.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import logo from '../../logo.png'


const Toolbar = props => (
        <header className="toolbar">
            <nav className="toolbar_navigation">
                <div className="toolbar_toggle-button"><DrawerToggleButton click={props.drawerClickHandler}/></div>
                <div className="toolbar_logo"><a onClick={()=> props.changeType("homepage")}><img src={logo} alt="NTUA"/></a></div>
                <div className="spacer"></div>
                <div className="toolbar_navigation-items">
                    <ul>
                        <li><a onClick={()=>(props.changeType("book"))} style={{cursor: 'pointer'}}>Books</a></li>
                        <li><a onClick={()=>(props.changeType("author"))} style={{cursor: 'pointer'}}>Authors</a></li>
                        <li><a onClick={()=>(props.changeType("member"))} style={{cursor: 'pointer'}}>Users</a></li>
                        <li><a onClick={()=>(props.changeType("view2"))} style={{cursor: 'pointer'}}>Employees</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    );


export default Toolbar;