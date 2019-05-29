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
            query: {}
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            address: 'http://localhost:5000/' + props.type,
            displayedData: props.displayedData,
            displayedFields: props.displayedFields,
            query: props.query
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
                    this.setState({ displayedData: response.data.splice(1), displayedFields: response.data[0] });
                });
        }
    }

    render() {
        console.log(this.state.displayedData[0])
        const displayType = (this.state.displayedData.length === 1 ? (<p>No results found</p>) :
            (<table id="books">
                <thead>
                    {
                        (<TableHead onClick={this.orderBy} order="" values={this.state.displayedFields} object={this.state.displayedData[0]}></TableHead>)
                    }
                </thead>
                <tbody>
                    {
                        this.state.displayedData.slice(1).map((bookObj, i) =>
                            (<TableRow key={i} object={bookObj}></TableRow>))
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
                <td key={i} onClick={props.onClick} order={props.order} value={props.values[i]} >{domain}</td>
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
                    <td key={i}>{domain}</td>
                )}
            </tr>
        )
    }
    return null;
}

export default DisplayTable;
