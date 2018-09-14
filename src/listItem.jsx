import React from 'react';


export default class ListItem extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return <li className="list-group-item" style={this.props.ready==true ? {backgroundColor: "green"}: null}>{this.props.el.activity}
            <button className="btn btn-info ml-3 btn-sm" onClick={this.props.editToDo}>
                Change
                </button>
            <button className="btn btn-info ml-3 btn-sm">
                Done
            </button>
            <button className="btn ml-3 btn-sm" onClick={this.props.deleteToDo}>
                <i className="fas fa-trash-alt"></i>
            </button>
        </li>
    }
}
