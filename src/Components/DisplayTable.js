import React, { Component } from 'react';
import axios from 'axios';
import './DisplayTable.css';
import { type } from 'os';

class DisplayTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type : "",
            address: "",
            displayedData: [],
            displayedFields: {},
            query: {},
            prim_key: {}
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            type: props.type,
            address: 'http://localhost:5000/' + props.type,
            displayedData: props.displayedData,
            displayedFields: props.displayedFields,
            query: props.query,
            prim_key: props.prim_key
        })
    }

    orderBy = (e) => {
        if (e.target.getAttribute("value") != "") {
            switch (e.target.getAttribute("order")) {
                case "":
                    e.target.setAttribute("order", "asc")
                    this.state.query["by"] = e.target.getAttribute("value") + ' ' + e.target.getAttribute("order");
                    break;
                case "asc":
                    e.target.setAttribute("order", "desc")
                    this.state.query["by"] = e.target.getAttribute("value") + ' ' + e.target.getAttribute("order");
                    break;
                case "desc":
                    e.target.setAttribute("order", "")
                    this.state.query["by"] = undefined;
                    break;
            }

            axios.get(this.state.address, {
                params: {
                    query: this.state.query
                }
            })
                .then((response) => {
                    this.setState({ displayedData: [response.data["names"]].concat(response.data["result"]), displayedFields: response.data["orgName"], prim_key: response.data["prim_key"] });
                });
        }
    }

    deleteEntry = (i) => {
      axios.delete(this.state.address,
        {
            params: i
        })
        .then(() => {
            axios.get(this.state.address, {
                params: {
                    query: this.state.query
                }
            })
            .then((response) => {
                  this.setState({ displayedData: [response.data["names"]].concat(response.data["result"]), displayedFields: response.data["orgName"], prim_key: response.data["prim_key"] });
              });
        })
   }

   bookCopy = (i,flag) => {
    if(flag){
    axios.post(this.state.address+"Copy",
      {
          params: i
      })
      .then(() => {
          axios.get(this.state.address, {
              params: {
                  query: this.state.query
              }
          })
          .then((response) => {
                this.setState({ displayedData: [response.data["names"]].concat(response.data["result"]), displayedFields: response.data["orgName"], prim_key: response.data["prim_key"] });
            });
      })
    } else {
        axios.delete(this.state.address+"Copy",
        {
            params: i
        })
        .then(() => {
            axios.get(this.state.address, {
                params: {
                    query: this.state.query
                }
            })
            .then((response) => {
                  this.setState({ displayedData: [response.data["names"]].concat(response.data["result"]), displayedFields: response.data["orgName"], prim_key: response.data["prim_key"] });
              });
            })
        }
    }

    render() {
        const displayType = (this.state.displayedData.length === 1 ? (<p>No results found</p>) :
            (<table id="books" className="Unit-Table">
                <thead>
                    {
                        (<TableHead onClick={this.orderBy} order="" values={Object.values(this.state.displayedFields)} 
                        object={this.state.displayedData[0]} addCopy={(this.state.type==="book")}/> 
                        )
                    }
                </thead>
                <tbody >
                    {
                        this.state.displayedData.slice(1).map((bookObj, i) =>
                            (<TableRow key={i} object={bookObj} clickFun={
                                () => this.deleteEntry(
                                    this.state.prim_key.map(
                                        (pkey)=> ({
                                            [pkey] : bookObj[pkey]
                                        })
                                    )
                                )
                            } addCopy={(this.state.type==="book")}
                                manCopy = {
                                    (flag) => this.bookCopy(
                                        (pkey)=> ({
                                            [pkey] : bookObj[pkey]
                                        },flag)
                                    )
                                }>
                            </TableRow>))
                    }
                </tbody>
            </table>));
        return (
            <div className="display">
                {displayType}
            </div>

        );
    }
}

const TableHead = (props) => {
    if (props.object !== undefined) {
    return (
        <tr>

            {Object.values(props.object).map((domain, i) =>
                <td key={i} onClick={props.onClick} order={props.order} value={props.values[i]} style={{cursor: 'pointer'}}>{domain}</td>
            )}
            <td>   </td>
            {(props.addCopy)?<td>Copies</td>:<></>}
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
                    <td key={i}>{domain}</td>
                )}
                <td onClick={props.clickFun} className="delSym"style={{cursor:'pointer'}}>x</td>
                {(props.addCopy)?<div>
                    <td><div onClick={() => {props.manCopy(true)}} className="addSym" style={{cursor:'pointer'}}>+</div></td>
                    <td><div onClick={() => {props.manCopy(false)}} className="redSym" style={{cursor:'pointer'}}>-</div>
                    </td></div>:
                    <></>}
            </tr>
        )
    }
    return null;
}

export default DisplayTable;
