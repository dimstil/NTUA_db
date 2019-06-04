import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import React from 'react';

class AlertDismissible extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        show: (props.msg)?true:false,
        errorMsg: props.msg
      }
    }
  
    componentDidUpdate(prevProps){
      console.log("BIKA");
      console.log(prevProps.msg+"-"+this.props.msg);
      if(prevProps.msg!== this.props.msg){
        //console.log(prevProps.msg+"-"+this.props.msg);
        this.setState({
          show: (this.props.msg)?true:false,
          errorMsg : this.props.msg
        })
      }
        
    }
    
  //  handleShow = () => this.setState({show:true});
    
    render() {
      const handleHide = () => {
        this.setState({ show: false, errorMsg:"" });
        this.props.handleDism();
      }
      console.log(this.state);
      
      return (
        <>
          <Alert show={this.state.show} variant="danger" 
        //   style={{ background: "#AA3939",  position: "relative", top: "56px", display: "flex",
        //  outlineColor:"#9A2929", outlineWidth: "thick"}}
          style={{    position: 'relative',
            top:'56px',
            padding: '1% 1%',
            marginBottom: '0.1rem',
            border: '2px groove' ,
            borderColor: "#f5c6cb",
          //  display: 'flex',
            background: "#f8d7da",
            color:'#721c24'}}>
            <Alert.Heading style={{
             // position: 'static',
            //  display:'block',
              right:'0.1rem'    }}
            ><strong style={{
              position: 'relative',
              left:'0.1rem',
          //    display:'block',
              textAlign:'left'    }}> Insert Failed!</strong>
              <a style={{ textAlign:"right"}}
              onClick={handleHide}>x</a>
            </Alert.Heading>
            <p style={{ background: "#f8d7da"  }}>
                Fill all necessary fields and try again!
                {this.props.show}
            </p>

          </Alert>
  
        </>
      );
    }
  }
  

  export default AlertDismissible;