import React,{useState} from 'react'
import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartValueAxis,
    ChartValueAxisItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartTitle,
    ChartLegend,
  } from "@progress/kendo-react-charts";
  import { COLORS } from "./../Constaints.js";
  

  var timer;

  var categories = [1]
  
  const GraphTraffic = (props) => {


    const [series, setseries] = useState([
        {
       name: "host1",
       data: [],
       color: COLORS.total,
        }]);


        const getTraffic = () => {

           timer = setInterval(() => {
                    let assign = {}
                    Object.assign( assign, series[0])
                    assign.data.push(Math.floor(Math.random() * 29))
                    let arrayassign = [assign]
    
                    categories.push(categories[categories.length - 1] + 1)
                    setseries(arrayassign)
    
                    
    
                }, 1000)


          }

        const stopTraffic = () => {

            clearInterval(timer)
        }


    return (
<div>

   <Chart pannable zoomable style={{ height: 350 }}>
   <ChartTitle text="Traffic from Hosts " />
   <ChartLegend position="top" orientation="horizontal" />
   <ChartValueAxis>
   <ChartValueAxisItem title={{ text: "Мбит" }} min={0} max={30} />
   </ChartValueAxis>
   <ChartCategoryAxis>
   <ChartCategoryAxisItem categories={categories} title={{text: "Секунды"}} />
   </ChartCategoryAxis>
   <ChartSeries>
   {series.map((item, idx) => (
   <ChartSeriesItem
   key={idx}
   type="line"
   tooltip={{ visible: true }}
   data={item.data}
   name={item.name}
   />
   ))}
   </ChartSeries>
   </Chart>
    
    <button onClick={() => getTraffic()}>SEARCH TRAFFIC</button>
    <button onClick={() => stopTraffic()}>STOP</button>
</div>
    
    );
  };
  
  export default GraphTraffic;
