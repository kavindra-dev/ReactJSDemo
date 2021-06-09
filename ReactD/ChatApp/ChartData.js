import Axios from 'axios';
import React, {Component} from 'react';
import {View,Text} from 'react-native';

class ChartData extends Component{
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
        Axios.get("http://192.168.0.38:8080/student/getAll")
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

    render(){
        return(
            <View style={{margin:20}}>
                <Text style={{fontSize:20}}>Data :</Text>
                <View style={{marginLeft:40,backgroundColor:'#7fffd4',padding:10}}>
                {
                    this.state.students.map(student =>
                    <Text style={{fontSize:18}}>{student.name} ======== {student.marks}</Text>)
                }
                </View>
            </View>
        );
    }
}



export default ChartData;