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
        const pStyle = { color: font, textAlign: "right" };

        return <li className="list-group-item bg-transparent">
            <div className="row">
                <div className="col col-md-auto">
                    <button className="btn btn-dark  btn-sm" onClick={this.props.deleteToDo} disabled={this.props.el.done == 1 ? true : false}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                 </div>
                <div className="col col-md-auto">
                    <button className="btn btn-warning  btn-sm" onClick ={this.props.toDoDone}>
                        {this.props.el.done == 1 ? 'Undone' : 'Done'}
                    </button>
                </div>
                <div className="col col-md-auto">
                    <button className="btn btn-info  btn-sm" onClick={this.props.editToDo} disabled={this.props.el.done == 1? true : false}>
                        Edit
                    </button>
                </div>
                <div className="col-6 col-md-auto">
                    <p className="flex-grow-1 font-weight-bold h5" style={pStyle}>{this.props.el.activity}</p>
                </div>
            </div>
        </li>
    }
}
