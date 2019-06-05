import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        // <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
        //   <CloseIcon />
        // </IconButton>
        <></>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

class CustomizedDialogs extends React.Component {
    constructor(props){
        super(props);    
        this.state = {
            open: false,
            type: props.type,
            fields: [],
            data:[]
        };
    }

    componentDidMount(){
        this.setState ({
            open:false,
            type: 0,
            fields: [],
            data:[]
        })
    }
    componentDidUpdate(prevProps) {
        console.log("didUpdate");
        console.log(this.props);
        if(prevProps!==this.props){
            this.setState({
                open :  (this.props.type!==0),
                type : this.props.type,
                fields: [],
                data:[]
            })
        }

    }


  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  to_show = () =>{ return( 
    <table className="Unit-Table">
    <thead>
        <TableHead 
        object={this.state.fields}/>
    </thead>
    <tbody>
        { 
            this.state.data.map((obj,i) =>
            (
                <TableRow key={i} object={obj}/>
            )
            )
        }
    </tbody>
    </table>);
  }


  render() {

     console.log(this.state)
     if(this.state.open)
        axios.get("http://localhost:5000/query",{
            params:{
                num : this.state.type
                } 
            })
            .then ((response) => {
                if(response.data.errorMsg)
                    this.props.throwError(response.data.errorMsg);

                else {
                    this.setState({
                        open: this.state.open,
                        type:this.state.type,
                        fields: response.data.names,
                        data: response.data.result
                    })
                   
                console.log(response.data)    
            }

            });
    return (
      <div>

        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >

          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            {(() => {
                switch(this.state.type){
                    case(1):
                        return <>Number of Members</>;
                    case(2):
                        return <>Number of Copies for each Book</>;
                    case(3):
                        return <>Books in Descendig Page Order</>;
                    case(4):
                        return <>Members who have more than 3 books borrowed and those Books</>;
                    case(5):
                        return <>ISBN of Books that are borrowed by 2 or more Members</>;
                    case(6):
                        return <>ISBN,title,category with a null field</>;
                    case(7):
                        return <>Authors of Books</>;
                    case(8):
                        return <>Members with owed books</>
                    default:
                        return <>SUCKAh</>;
                }
                })()
            }

          </DialogTitle>
          <DialogContent dividers>
            {this.to_show()}

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              <b style={{color:"#4CAF50"}}>Close</b>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const TableHead = (props) => {
    if (props.object !== undefined) {
    return (
        <tr>

            {Object.values(props.object).map((domain, i) =>
                <td key={i}  
                >{domain}</td>
            )}            
        </tr>
    )
}
return null;
}

const TableRow = (props) => {

    if (props.object !== undefined) {
        return (
            <tr>
                {Object.values(props.object).map((domain, i) =>
                    <td key={i}> {domain}                        
                    </td>
                )}
               
            </tr>
        );
    }
}

export default CustomizedDialogs;