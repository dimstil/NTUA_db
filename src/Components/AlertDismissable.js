import Alert from 'react-bootstrap/Alert';
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

      if(prevProps.msg!== this.props.msg){

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

      
      return (
        <>
          <Alert show={this.state.show} variant="danger" 
        //   style={{ background: "#AA3939",  position: "relative", top: "56px", display: "flex",
        //  outlineColor:"#9A2929", outlineWidth: "thick"}}
          style={{    position: 'relative',
            top:'66px',
            left: '2%',
            width: '94%',
            padding: '1% 1%',
            marginBottom: '0.1rem',
            border: '2px groove' ,
            borderColor: "#f5c6cb",
            background: "#f8d7da",
            color:'#721c24',
            }}>
           
            <Alert.Heading style={{
             // position: 'static',
              display:'inline-block',
              right:'0.1rem'    }}
            >
              <strong style={{
              position: 'static',
              left:'0.1rem',
              display:'inline',
              textAlign:'left'    }}> ERROR !</strong>
            </Alert.Heading>
            <a style={{ position: 'relative' ,left: '45%',textAlign:"right", cursor:'pointer', display:'inline-block'}}
              onClick={handleHide}
              ><strong>x</strong></a>

            <p style={{ background: "#f8d7da"  }}>
                  {this.state.errorMsg}
            </p>

          </Alert>
  
        </>
      );
    }
  }
  

  export default AlertDismissible;