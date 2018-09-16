import React from 'react';

export default class ListItem extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        let font='';
        if (this.props.el.done ==1){
            font="red";
        }
        return <li className="list-group-item bg-transparent d-flex justify-content-end" 
        style={{ display: 'flex', justifyContent: "spaceAround"}}>
            <button className="btn btn-dark mx-3 btn-sm" onClick={this.props.deleteToDo} disabled={this.props.el.done == 1 ? true : false}>
                <i className="fas fa-trash-alt"></i>
            </button>
            <button className="btn btn-warning mx-3 btn-sm" onClick ={this.props.toDoDone}>
                Done
            </button>
            <button className="btn btn-info mx-3 btn-sm" onClick={this.props.editToDo} disabled={this.props.el.done == 1? true : false}>
                Edit
            </button>
            <p className=" bd-highlight flex-grow-1 text-right font-weight-bold h4" style={{ color:font}}>{this.props.el.activity}</p>
        </li>
    }
}
