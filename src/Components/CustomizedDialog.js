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
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
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
            type: props.type
        };
    }

    componentDidMount(){
        this.setState ({
            open:false,
            type: 0
        })
    }
    componentDidUpdate(prevProps) {
        console.log("didUpdate");
        console.log(this.props);
        if(prevProps!==this.props){
            this.setState({
                open :  (this.props.type!==0),
                type : this.props.type
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

  


  render() {
     var to_show;
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
                    to_show = <table className="Unit-Table">
                        <thead>
                            <TableHead 
                            object={response.data.names}/>
                        </thead>
                        <tbody>
                            { 
                                this.data.result.map((obj,i) =>
                                (
                                    <TableRow key={i} object={obj}/>
                                )
                                )
                            }
                        </tbody>
                    </table>
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
                        return <h6>Number of Members</h6>;
                    case(2):
                        return <h6>Number of Copies for each Book</h6>;
                    default:
                        return <h6>SUCKAh</h6>;
                }
                })()
            }

          </DialogTitle>
          <DialogContent dividers>
            {(to_show === undefined)?<h1>SHIT</h1>:to_show}

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Again
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

    if (this.props.object !== undefined) {
        return (
            <tr>
                {Object.values(this.props.object).map((domain, i) =>
                    <td key={i}> domain                        
                    </td>
                )}
               
            </tr>
        );
    }
}

export default CustomizedDialogs;