import React,{Component}from "react";
import { StyleSheet, View,Text } from "react-native";
import {Svg, G, Line, Rect} from 'react-native-svg';
import * as d3 from 'd3';


const GRAPH_MARGIN = 20
const GRAPH_BAR_WIDTH = 5
const colors = {
  axis: '#E4E4E4',
  axis: '#E4E4E4',
  bars: '#15AD13'
}

var localdata

class ChartShow extends Component{
    
    constructor(props){
        super(props);
        this.state={
            students:[],
        }
    }

    componentDidMount(){
        d3.json("http://192.168.0.38:8080/student/getAll", function(jsonData) {
            localdata=jsonData;
            console.log(jsonData);  
    })
    }

    render() {
        const SVGHeight = 300
        const SVGWidth = 300
        const graphHeight = SVGHeight - 2 * GRAPH_MARGIN
        const graphWidth = SVGWidth - 2 * GRAPH_MARGIN
        const data = this.props.data
    
        // X scale point
        const xDomain = data.map(item => item.label)
        const xRange = [0, graphWidth]
        const x = d3.scalePoint()
          .domain(xDomain)
          .range(xRange)
          .padding(1)
    
        // Y scale linear
        const yDomain = [0, d3.max(data, d => d.value)]
        const yRange = [0, graphHeight]
        const y = d3.scaleLinear()
          .domain(yDomain)
          .range(yRange)


    return (
        <View style={styles.container}>
          <Svg width={SVGWidth} height={SVGHeight}>
            <G y={graphHeight}>
          {/* bars */}
          {data.map(item => (
            <Rect
              key={item.label}
              x={x(item.label) - (GRAPH_BAR_WIDTH / 2)}
              y={y(item.value) * -1}
              rx={2.5}
              width={GRAPH_BAR_WIDTH}
              height={y(item.value)}
              fill={colors.bars}
            />
          ))}

          {/* bottom axis */}
          <Line
            x1="0"
            y1="2"
            x2={graphWidth}
            y2="2"
            stroke={colors.axis}
            strokeWidth="0.5"
          />
        </G>
      </Svg>
      </View>
    );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});

export default ChartShow;