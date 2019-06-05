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
        console.log(props);
    }
    componentDidUpdate(prevProps) {
        if(prevProps!==this.props){
            this.setState({
                query : this.state.query,
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
   
    //console.log(props)
    render(){
    
       
        return(<div>
    <CustomizedDialogs type={this.state.query} throwError={this.props.throwError}/>
        <nav className={this.state.drawerClasses}>
            <ul>
                <li><button onClick ={() => this.changeType(1)}>Query 1</button></li>
                <li><button onClick ={() => this.changeType(2)}>Query 2</button></li>
                <li><button onClick ={() => this.changeType("")}>Query 3</button></li>
                <li><button onClick ={() => this.changeType("")}>Query 4</button></li>
                <li><button onClick ={() => this.changeType("")}>Query 5</button></li>
                <li><button onClick ={() => this.changeType("")}>Query 6</button></li>
                <li><button onClick ={() => this.changeType("")}>Query 7</button></li>

                </ul>
            </nav>
        </div>
        );
    }
}
export default sideDrawer;
