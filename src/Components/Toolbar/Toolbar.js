import React,{ Component } from 'react';
import './Toolbar.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';



const Toolbar = props => (
        <header className="toolbar">
            <nav className="toolbar_navigation">
                <div className="toolbar_toggle-button"><DrawerToggleButton click={props.drawerClickHandler}/></div>
                <div className="toolbar_logo"><a onClick={props.home}>LOGO</a></div>
                <div className="spacer"></div>
                <div className="toolbar_navigation-items">
                    <ul>
                        <li><a onClick={props.changeType}>Books</a></li>
                        <li><a href="/">Authors</a></li>
                        <li><a href="/">Users</a></li>

                    </ul>
                </div>
            </nav>
        </header>
    );


export default Toolbar;