import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            toDo: [{ id: 1, activity: 'Learn some React'}, { id: 2, activity: 'Learn CSS'}, { id: 3, activity: 'Make love in the world!'},{id:4, activity: 'Make bed'}]
        }
    }
    render(){
        const list = this.state.toDo.map((el,i)=>{
            return <li className="list-group-item" key={el.id}>{el.activity}</li>
        })
        return <div className="jumbotron">
            <h1 className="text-center">To do Application</h1>
            <div className="container">
                <ul className="list-group">
                    {list}
                </ul>
            </div>
            
        </div>
    }
}

ReactDOM.render(<App />, document.getElementById('app'));