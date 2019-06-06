import React ,{Component}from 'react';
import './SideDrawer.css'
import CustomizedDialogs from '../CustomizedDialog';
class sideDrawer extends Component  {
    constructor(props){
        super(props);
        this.state = {
            query : 0,
            drawerClasses : (props.show)?"side-drawer open":"side-drawer"
        }

    }
    componentDidUpdate(prevProps) {
        if(prevProps!==this.props){
            this.setState({
                query : (this.props.show)?this.state.query:0,
                drawerClasses : (this.props.show)?"side-drawer open":"side-drawer"
            })
        }
    }
    changeType(ty){
        this.setState({
            query : ty,
            drawerClasses : this.state.drawerClasses
        })
    };
   

    render(){
    
       
        return(<div>
    <CustomizedDialogs type={this.state.query} throwError={this.props.throwError}/>
    
        <nav className={this.state.drawerClasses}>
        <a onClick={this.props.drawerClickHandler} id="slideBack">&#10094;</a> 
            <ul>
                <li><a onClick ={() => this.changeType(1)}>Query 1</a></li>
                <li><a onClick ={() => this.changeType(2)}>Query 2</a></li>
                <li><a onClick ={() => this.changeType(3)}>Query 3</a></li>
                <li><a onClick ={() => this.changeType(4)}>Query 4</a></li>
                <li><a onClick ={() => this.changeType(5)}>Query 5</a></li>
                <li><a onClick ={() => this.changeType(6)}>Query 6</a></li>
                <li><a onClick ={() => this.changeType(7)}>Query 7</a></li>
                <li><a onClick ={() => this.changeType(8)}>View</a></li>

                </ul>
            </nav>
        </div>
        );
    }
}
export default sideDrawer;
