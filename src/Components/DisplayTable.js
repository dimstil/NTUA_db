import React, { Component } from 'react';
import axios from 'axios';
import './DisplayTable.css';
import { type } from 'os';

class DisplayTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            displayedData: [],
            displayedFields: {},
            query: {},
            prim_key: {}
        };
    }

    componentWillReceiveProps(props) {
      console.log(props)
        this.setState({
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
                  console.log(response);
                    this.setState({ displayedData: [response.data["orgName"]].concat(response.data["result"]), displayedFields: response.data["names"], prim_key: response.data["prim_key"] });
                    console.log(this.state);
                });
        }
    }

    deleteEntry = (i) => {
        console.log(i);
      axios.delete(this.state.address,
        {
            params: i
        })
   }

    render() {
        console.log(this.state.displayedData)
        const displayType = (this.state.displayedData.length === 1 ? (<p>No results found</p>) :
            (<table id="books">
                <thead>
                    {
                        (<TableHead onClick={this.orderBy} order="" values={Object.values(this.state.displayedFields)} object={this.state.displayedData[0]}></TableHead>)
                    }
                </thead>
                <tbody>
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
                            } ></TableRow>))
                    }
                </tbody>
            </table>));
            console.log(this.state.displayedFields);
        return (
            <div className="display">
                {displayType}
            </div>

        );
    }
}

const TableHead = (props) => {
    console.log(props.values);
    console.log(props.object);
    if (props.object !== undefined) {
    return (
        <tr>

            {Object.values(props.object).map((domain, i) =>
                <td key={i} onClick={props.onClick} order={props.order} value={props.values[i]}>{domain}</td>
            )}
            <td>del</td>
        </tr>
    )
}
return null;
}

const TableRow = (props) => {
    console.log(props.object);
    if (props.object !== undefined) {
        return (
            <tr>
                {Object.values(props.object).map((domain, i) =>
                    <td key={i}>{domain}</td>
                )}
                <td onClick={props.clickFun}></td>
            </tr>
        )
    }
    return null;
}

export default DisplayTable;
