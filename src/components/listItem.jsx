import React from 'react';

export default class ListItem extends React.Component{
    constructor(props) {
        super(props);
    }
    stopPropagation = (e) => {
        e.stopPropagation();
    }
    render(){
        let font='';
        if (this.props.el.done ==1){
            font="red";
        }        
        const pStyle = { color: font};        

        return <li className="list-group-item bg-transparent">
            <div className="row">
                <div className="col-auto">
                    <p className="list__text" style={pStyle}>{this.props.el.activity}</p>
                </div>
               
                <div className="col-auto">
                    <button className="btn btn-warning btn__list" onClick ={this.props.toDoDone}>
                        {this.props.el.done == 1 ? 'Undone' : 'Done'}
                    </button>
                </div>
                <div className="col-auto">
                    <button className="btn btn-info  btn-sm btn__list" onClick={this.props.editToDo} disabled={this.props.el.done == 1? true : false}>
                        Edit
                    </button>
                </div>
                <div className="col-auto">
                    <button className="btn btn-dark  btn-sm btn__list" onClick={this.props.deleteToDo} disabled={this.props.el.done == 1 ? true : false}>
                        <i className="fas fa-trash-alt" onClick={this.props.el.done == 1 ?this.stopPropagation : null}></i>
                    </button>
                </div>
            </div>
        </li>
    }
}
