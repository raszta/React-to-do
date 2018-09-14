import React from 'react';
import ReactDOM from 'react-dom';
import ListItem from './listItem.jsx';

class ToDoApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            toDo: [{ id: 1, activity: 'Learn some React'},
            { id: 2, activity: 'Learn CSS'},
            { id: 3, activity: 'Make love in the world!'},
            {id:4, activity: 'Make bed'}],
            newToDo: '',
            editing: false,
            editingIndex: null,
            notification: null        
        }        
    }

    handleChange = (e) =>{       
        this.setState({
            newToDo: e.target.value
        });       
    }

    addToDo = (e) =>{
        const newDo = {
            id: this.state.toDo.length>0 ? this.state.toDo[this.state.toDo.length-1].id +1 : 1,
            activity: this.state.newToDo
        };
        this.setState({
            toDo: [...this.state.toDo, newDo],
            newToDo: ''
        });
        this.msg("To do successfully added");
    }

    deleteToDo = (i) => {
        const toDo = this.state.toDo;
        toDo.splice(i,1);
        this.setState({
            toDo
        });
        this.msg("To do successfully deleted");
    }

    editToDo = (i) =>{
        const toDo = this.state.toDo[i];
        this.setState({
            editing: true,
            newToDo: toDo.activity,
            editingIndex: i
        });
    }

    updateToDo = () => {        
        const update = this.state.toDo;
        update[this.state.editingIndex].activity = this.state.newToDo;
        
        this.setState({
            editing: false,
            editingIndex: null,
            toDo: update,
            newToDo: ''
        });
        this.msg("To do successfully updated");
    }

    removeAll = () =>{
        this.setState({
            toDo : []
        });
        this.msg("All successfully deleted");
    }

    removeDone = () => {

    }

    msg = (notification) =>{
        this.setState({
            notification
        });

        setTimeout(()=>{
            this.setState({
                notification: null
            });
        }, 2000);
    }
       
    render(){
        const list = this.state.toDo.map((el, i) => {
            return <ListItem 
            key={el.id}
                el={el}
                editToDo={()=>{this.editToDo(i)}}
                deleteToDo={() => {this.deleteToDo(i)}} 
            />
        });

        return <div className="container">
            <h1 className="text-center m-5 font-weight-bold">
            To Do 
            </h1>         
            <div className="input-group my-3">
                <input type="text" className="form-control" placeholder="Add new to do..." onChange={this.handleChange} value={this.state.newToDo} />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary text-light bg-dark" onClick={this.state.editing ?  this.updateToDo : this.addToDo} id="button-addon2">
                    {this.state.editing ? "Edit to do" : "Add to do"}
                     </button>
                    </div>
            </div>  
            {
                this.state.notification &&
                <div className="alert alert-success">
                    {this.state.notification}
                </div>}             
            {
                !this.state.editing && 
            <div className="mt-5 ">              
                <ul className="list-group">
                    {list}
                </ul>           
                <button className="btn btn-info m-4 btn-sm" onClick={this.removeAll}>
                Remove all
                </button>         
                <button className="btn btn-info m-4 btn-sm" onClick={this.removeDone}>
                Remove done
                </button>
            </div> }
        </div>
    }
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <ToDoApp />,
        document.getElementById('app')
    );
});