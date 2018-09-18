import React from 'react';

export default class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){ 

        return (
        <div className = "header" >
            <h1 className="header__title">make your own</h1>           
            <div className="input-group my-3 header__group">
                <input type="text" className="form-control header__input" placeholder="Add new to do..." onChange={this.props.handleChange} value={this.props.newToDo}/>
                <div className="input-group-append">
                    <button className="btn btn-success" onClick={this.props.editing ? this.props.update : this.props.add} disabled={this.props.newToDo.length < 5 ? true : false}>
                        {this.props.editing ? "Edit to do" : "Add to do"}
                    </button>
                </div>
                    <input className="form-control header__input--search" type="text" placeholder="Search for..." onChange={this.props.search} value={this.props.searchInput}/>
            </div> 
                
        </div>
        )
    }
}