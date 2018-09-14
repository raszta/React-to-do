import React from 'react';
import Img from '../images/toDo.jpg';

export default class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <div style={{ height: '40vh', width: '100%' }} >
            <h1 style={{position:'absolute', zIndex: "2", top: '10%', left:'40%', fontSize: '4rem'}}>Make your own</h1>
            <img src={Img} alt="To do list image" style={{ height: '85%', width: '100%', position: 'relative'}}></img>
            <div className="input-group my-3">
                <input type="text" className="form-control" placeholder="Add new to do..." onChange={this.props.handleChange} value={this.props.newToDo} />
                <div className="input-group-append">
                    <button className="btn btn-success" onClick={this.props.editing ? this.props.update : this.props.add} id="button-addon2" disabled={this.props.newToDo.length < 5 ? true : false}>
                        {this.props.editing ? "Edit to do" : "Add to do"}
                    </button>
                </div>
            </div> 
        </div>
    }
}