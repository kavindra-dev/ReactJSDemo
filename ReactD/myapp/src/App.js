import React from 'react';
import logo from './logo.svg';
import './App.css';
import API from './utils/API';
import ChartEx from './ChartEx';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      students:[],
      id:0,
      name:'',
      marks:'',
    }
  }

  componentDidMount(){
    try {
    API.get("/getAll")
    .then((res) => {
      this.setState({
        students:res.data,
        id:0,
        name:'',
        marks:'',
      });
    })
  }catch (error) {
  console.log(`😱 Axios request failed: ${error}`);
  }
  }

  submit(evenet,id){
    console.log(id)
    evenet.preventDefault();
    try {
      if(id===0){
        API.post("/",{
          name:this.state.name,
          marks:this.state.marks,
        }).then(()=>{
          this.componentDidMount();
        })
      }else{
        API.put("/",{
          id:id,
          name:this.state.name,
          marks:this.state.marks,
        }).then(()=>{
          this.componentDidMount();
        })
      }
      
    } catch (error) {
      console.log(`😱 Axios request failed: ${error}`);
    }
    
  }


  delete(id){
    try {
      API.delete("/"+id)
      .then(()=>{
      this.componentDidMount();
     })
    } catch (error) {
      console.log(`😱 Axios request failed: ${error}`);
    }
    
  }

  edit(id){
    try {
      API.get("/"+id)
      .then((res)=>{
        this.setState({
          id:res.data.id,
          name:res.data.name,
          marks:res.data.marks,
        });
      }) 
    } catch (error) {
      console.log(`😱 Axios request failed: ${error}`);
    }
    
  }
  
  render(){
    return(
      <div className="container">
        <div className="row">
         <div className="col s6">
           <form onSubmit={(e) => this.submit(e,this.state.id)}>
           <div className="input-field col s12">
             <input type="text" id="autocomplete-input" className="autocomplete"
              value ={this.state.name} onChange={(e)=>this.setState({name:e.target.value})}/>
             <label htmlFor="autocomplete-input">Enter Name</label>
           </div>
           <div className="input-field col s12">
             <input type="text" id="autocomplete-input" className="autocomplete"
             value ={this.state.marks}  onChange={(e)=>this.setState({marks:e.target.value})}/>
             <label htmlFor="autocomplete-input">Enter Marks</label>
           </div>
           <button className="btn waves-effect waves-light right" type="submit" name="action">Submit</button>
           </form>
         </div>

         <div className="col s6">
          <table>
            <thead>
             <tr>
              <th>Name</th>
              <th>Marks</th>
              <th>Edit</th> 
              <th>Delete</th>
              </tr>
             </thead>

             <tbody>
               {
                 this.state.students.map(
                   student =>
                   <tr key= {student.id}>
                     <td>{student.name}</td>
                     <td>{student.marks}</td>
                     <td>
                     <button className="btn waves-effect waves-light" type="submit" 
                     name="action" onClick={(e)=>this.edit(student.id)}>Edit</button>
                    </td>
                    <td>
                     <button className="btn waves-effect waves-light" type="submit" 
                     name="action" onClick={(e)=>this.delete(student.id)}>Delete</button>
                    </td>
                   </tr>
                 )                  
               }
             </tbody>
            </table>
          </div>

          <ChartEx/>
        </div>
        <br/>
      </div>
       
    );
  }
}

export default App;
