import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import ListItem from './components/listItem.jsx';
import Header from './components/header.jsx';
import Loading from './images/loading.gif';
require ('./main.scss');

class ToDoApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            toDo: [], //table for data
            newToDo: '', //input value
            editing: false, // state of editing item
            editingIndex: null, //index of edited item
            notification: null,        //content of msg function    
            loading: true         //condition for loading gif    
        }    
        
        this.apiUrl = 'https://5b9b9b5d8d1635001482ccf4.mockapi.io/ToDoApp';
    }
//downloading data from api
    componentDidMount(){
        axios.get(`${this.apiUrl}`).then(response => {
            const activities = response.data;
                this.setState({
                    toDo: activities,
                    loading: false
                });         
         });               
    }
    
//set value from input to string which will be added to data
    handleChange = (e) =>{       
        this.setState({
            newToDo: e.target.value
        });       
    }
//adding new items to data
    addToDo = () =>{       
            axios.post(`${this.apiUrl}`, { activity: this.state.newToDo}).then(response => {
            const activity = response.data;
            this.setState({
                toDo: [...this.state.toDo, activity],
                newToDo: ''
            });
        }); 
        this.msg("Activity successfully added");
       
    }
//deleting item of certain id from data
    deleteToDo = (i) => {        
        const ans = confirm("Are you sure to delete this item?");
        if(ans){ 
        const del = this.state.toDo[i];
        const toDo = this.state.toDo;
        toDo.splice(i, 1);
        axios.delete(`${this.apiUrl}/${del.id}`).then(response => {
            this.setState({
                toDo: toDo
            });
        }); 
        this.msg("Activity successfully deleted");}
    }
//editing choosen item
    editToDo = (i) =>{
        const toDo = this.state.toDo[i];
        this.setState({
            editing: true,
            newToDo: toDo.activity,
            editingIndex: i
        });
    }
//updating choosen item
    updateToDo = () => { 
        const update = this.state.toDo[this.state.editingIndex];
        const toDo = this.state.toDo;
        axios.put(`${this.apiUrl}/${update.id}`, { activity: this.state.newToDo}).then(response => {  
            toDo[this.state.editingIndex] = response.data;
            this.setState({
                editing: false,
                toDo: toDo,
                newToDo: '',                
                editingIndex: null,
            });
        }); 
        this.msg("Activity successfully updated");
    }
//deleting all of items from data
    removeAll = () =>{
        const ans = confirm("Are you sure to delete all items?");
        if (ans) { 
        let toDo = this.state.toDo;
        toDo.forEach(el => {
            axios.delete(`${this.apiUrl}/${el.id}`);
        });
        this.setState({
            toDo: []
        });
        this.msg("All activities successfully deleted"); 
        }      
    }
//To Do doesn't refresh properly
    // allDone = () =>{ 
    //     let toDo = this.state.toDo;
       
    //     let arr =[];      
    //     for (var i = 0; i < toDo.length;i++){
    //      arr.push(!toDo[i].done)
    //     }
    //   console.log(toDo, 'oryginal');
    //   console.log(arr, 'po zmianie !');
    //     toDo.forEach((el,i) => {
    //         axios.put(`${this.apiUrl}/${el.id}`, { done: arr[i] })
    //         .then(response=>{toDo = response});  
    //     });  
                                 
    //     this.setState({
    //         toDo
    //     });
    // }

    removeAllDone = () =>{
        let toDo = this.state.toDo;       
        toDo.forEach(el => {            
            if(el.done ==1)
            {
                console.log(toDo.indexOf(el.id));
                axios.delete(`${this.apiUrl}/${el.id}`).then(response=>{
                toDo.splice(toDo.indexOf(response.data));
                    this.setState({
                        toDo
                    });     
                });                
            }                                                 
        });                       
    }
//function for alert the operation
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
//changing status of item ->done or no
    toDoDone = (i) => {
        const done = this.state.toDo;       
        axios.put(`${this.apiUrl}/${done[i].id}`, { done: !done[i].done }).then(response => {
            done[i] = response.data;
            this.setState({                
                toDo: done                
            });
        }); 
    }
       
    render(){
        const list = this.state.toDo.map((el, i) => {
            return <ListItem                         
                key={el.id}
                el={el}                
                editToDo={()=>{this.editToDo(i)}}
                deleteToDo={() => {this.deleteToDo(i)}} 
                toDoDone={()=>{this.toDoDone(i)}}/>
        });

        return <div className="container">
            <div className="row">
                <div className="col">
           <Header 
                newToDo={this.state.newToDo}
                handleChange={this.handleChange}
                editing={this.state.editing}
                update={this.updateToDo}
                add={this.addToDo}/>
                 </div>
            </div>
            <div className="row">
                <div className="col">
                    {
                        this.state.loading && //if true show gif
                        <img src={Loading} alt="Loading gif" className="app__img"/>
                    }
                    {
                        this.state.notification && //if true show alert
                        <div className="alert alert-success">
                            {this.state.notification}
                        </div>
                    }             
                    {
                        ( !this.state.editing || this.state.loading) && //if editing false
                        <div className="mt-5">              
                            <ul className="list-group">
                            {list}
                        </ul>           
                        <button className="btn btn-info m-4 btn-sm app__btn" onClick={this.removeAll} disabled={this.state.toDo.length>0 ?false:true}>
                        Remove all
                        </button>  
                            {/* <button className="btn btn-warning ml-3 btn-sm" onClick={this.allDone} disabled={this.state.toDo.length > 0 ? false : true}>
                            All  done
                        </button>    */}   
                            <button className="btn btn-warning m-4 btn-sm app__btn" onClick={this.removeAllDone} disabled={this.state.toDo.length > 0 ? false : true}>
                        Remove done
                        </button> 
                    </div>
                    }
                </div>
            </div>
        </div>
    }
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <ToDoApp/>,
        document.getElementById('app')
    );
});
