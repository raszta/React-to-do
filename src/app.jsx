import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import ListItem from './listItem.jsx';

class ToDoApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            toDo: [],
            newToDo: '',
            editing: false,
            editingIndex: null,
            notification: null,
            done:false              
        }    
        
        this.apiUrl = 'https://5b9b9b5d8d1635001482ccf4.mockapi.io';
    }

    componentDidMount(){
        axios.get(`${this.apiUrl}/ToDoApp`).then(response => {
            const activities = response.data;
            console.log(response);
            
            this.setState({
                toDo: activities
            });
         });               
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
            newToDo: '',
            done:false
        });
        this.msg("Activity successfully added");      
    }

    deleteToDo = (i) => {
        const toDo = this.state.toDo;
        toDo.splice(i,1);
        this.setState({
            toDo
        });
        this.msg("Activity successfully deleted");
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
        this.msg("Activity successfully updated");
    }

    removeAll = () =>{
            this.setState({
            toDo : []
        });
        this.msg("All activities successfully deleted");       
    }

    allDone = () =>{ 
        this.setState({
        done: this.state.done == true ? false : true
        }); 
    }

    removeAllDone = () =>{
        this.state.done == true ? this.setState({
        toDo: []
        }) : null; 
       this.msg("All done activities successfully deleted");          
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
                ready={this.state.done}                 
                key={el.id}
                el={el}
                done={this.allDone}
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
                    <button className="btn btn-success" onClick={this.state.editing ?  this.updateToDo : this.addToDo} id="button-addon2" disabled={this.state.newToDo.length<5 ? true :false}>
                    {this.state.editing ? "Edit to do" : "Add to do"}
                     </button>
                    </div>
            </div> 
            {
                this.state.notification &&
                <div className="alert alert-success">
                    {this.state.notification}
                </div>
            }             
            {
                !this.state.editing && 
            <div className="mt-5 ">              
                <ul className="list-group">
                    {list}
                </ul>           
                <button className="btn btn-info m-4 btn-sm" onClick={this.removeAll} disabled={this.state.toDo.length>0 ?false:true}>
                Remove all
                </button>  
                    <button className="btn btn-warning ml-3 btn-sm" onClick={this.allDone} disabled={this.state.toDo.length > 0 ? false : true}>
                 All  done
                </button>       
                    <button className="btn btn-warning m-4 btn-sm" onClick={this.removeAllDone} disabled={this.state.toDo.length > 0 ? false : true}>
                Remove done
                </button>
            </div>
            }
        </div>
    }
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <ToDoApp />,
        document.getElementById('app')
    );
});
