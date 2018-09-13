import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            toDo: [{ id: 1, activity: 'Learn some React'}, { id: 2, activity: 'Learn CSS'}, { id: 3, activity: 'Make love in the world!'},{id:4, activity: 'Make bed'}],
            newToDo: ''          
        }        
    }

    handleChange = (e) =>{
        let name = e.target.value;
        this.setState({
            newToDo: name
        })        
    }

    addToDo = (e) =>{
        const newDo = {
            id: this.state.toDo[this.state.toDo.length-1].id +1,
            activity: this.state.newToDo
        };
        this.setState({
            toDo: [...this.state.toDo, newDo]
        });
    }
       
    render(){
        console.log(this.state.newToDo, this.state.toDo);

        return <div className="container">
            <h1 className="text-center my-5">To do Application</h1>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Add new to do..." onChange={this.handleChange} />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" onClick={this.addToDo} id="button-addon2">Add </button>
                    </div>
            </div>            
            <Activity toDo={this.state.toDo} />
        </div>
    }
}

class Activity extends React.Component{
    render(){

        const list = this.props.toDo.map((el, i) => {
            return <li className="list-group-item" key={el.id}>{el.activity}
              <button className="btn-info bd-highlight">Done</button>
              <button className="btn bd-highlight"><i className="fas fa-trash-alt"></i></button>  </li>
        });
        
        return <div className="mt-5 ">
            <ul className="list-group">
                {list}
            </ul>
        </div> 
    }
}

ReactDOM.render(<App />, document.getElementById('app'));