import React from 'react';
import Img from '../images/toDo.jpg';

export default class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const divStyle = { height: '40vh', width: '100%', background: `url(${Img})` };
        const h1Style = { position: 'absolute', zIndex: "2", top: '10%', left: '40%', fontSize: '4rem', textShadow: '10px 10px 10px  black' };
        const imgStyle = { height: '85%', width: '100%', position: 'relative' };
        const inputStyle = {opacity: '0.8'};

        return <div style={divStyle} >
            <h1 style={h1Style}>Make your own</h1>
            <img src={Img} alt="To do list image" style={imgStyle}></img>
            <div className="input-group my-3">
                <input type="text" className="form-control" placeholder="Add new to do..." onChange={this.props.handleChange} value={this.props.newToDo} style={inputStyle}/>
                <div className="input-group-append">
                    <button className="btn btn-success" onClick={this.props.editing ? this.props.update : this.props.add} id="button-addon2" disabled={this.props.newToDo.length < 5 ? true : false}>
                        {this.props.editing ? "Edit to do" : "Add to do"}
                    </button>
                </div>
            </div> 
        </div>
    }
}