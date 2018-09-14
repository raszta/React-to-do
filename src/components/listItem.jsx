import React from 'react';

export default class ListItem extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return <li className="list-group-item bg-transparent d-flex justify-content-end" style={this.props.ready == true ? { textDecoration: "line-through", color: "red" } : null} style={{display:'flex', justifyContent: "spaceAround"}}>
            <button className="btn btn-dark mx-3 btn-sm" onClick={this.props.deleteToDo}>
                <i className="fas fa-trash-alt"></i>
            </button>
            <button className="btn btn-warning mx-3 btn-sm">
                Done
            </button>
            <button className="btn btn-info mx-3 btn-sm" onClick={this.props.editToDo}>
                Change
            </button>
            <p className=" bd-highlight flex-grow-1 text-right font-weight-bold h4">{this.props.el.activity}</p>
        </li>
    }
}
