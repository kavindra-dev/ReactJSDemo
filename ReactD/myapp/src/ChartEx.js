import React, { useState, useEffect } from 'react';
import {Bar} from 'react-chartjs-2';
import API from './utils/API';

const ChartEx = () =>{
    const [chartData,setChartData] = useState({});
    

    const chart = () =>{
        let studName = [];
        let studMarks = [];

        API.get("/getAll")
        .then(res => {
            console.log(res);
            for(const dataObj of res.data){
                studName.push(dataObj.name);
                studMarks.push(parseInt(dataObj.marks));
            }

            setChartData({
                labels: studName,
                datasets: [
                    {
                    label:"Marks",
                    data : studMarks,
                    }]
            });
        
        })
    };

    useEffect(() => {
        chart();
    },[]);

    return (
        <div>
            <h1>Chart Example</h1>
            <div style ={{width: '80%', height:"400px", display:"inline-flex"}}>
                <Bar
                redraw={true}
                data={chartData}
                options={{
                    maintainAspectRatio:false,
                    responsive: true,
                    title:{
                        text:"Overall Student Marks Graph out of 100", 
                        display:true
                    },
                    scales: {
                        yAxes :[{
                            ticks:{
                                beginAtZero: true,
                                fontSize:20,
                            },
                        }],
                        xAxes:[{
                            ticks:{
                                fontSize:20,
                            }
                        }]
                    }
                }}/>
            </div>
        </div>
    );

};

export default ChartEx;