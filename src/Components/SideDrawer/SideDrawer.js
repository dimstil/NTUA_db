import React from 'react';
import './SideDrawer.css'
const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if (props.show) {
        drawerClasses = 'side-drawer open';
    }
    return(
    <nav className={drawerClasses}>
        <ul>
            <li><a onClick ="select_from_table">Show</a></li>
            <li><a href="/">Import</a></li>


        </ul>
    </nav>
    );
}
export default sideDrawer;
