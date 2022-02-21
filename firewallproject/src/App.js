import React, {useState, useEffect} from "react";
import AddForm from "./AddForm/AddForm";
import './App.css'
import GraphTraffic from "./GarphTraffic/GraphTraffic";
import WhiteList from "./WhiteList/WhiteList";
import "@progress/kendo-theme-material/dist/all.css";
import "hammerjs";
import axios from "axios";
import TrafficTable from "./TrafficTable/TrafficTable";


function App() {

  const [WhiteArr, setWhiteArr] = useState([
    
  ])

  useEffect(() => {
    axios.get('http://localhost:3333/whitelist').then( response => {
      setWhiteArr(response.data)
    })
  }, [])
  

  return (
    <div className="App">
      <h1 className="heading">Add allowed addresses</h1>

      <div className="containerForm">

        <AddForm/>

        <div className="separator"></div>

        <div className="WhiteArrContainer">
        <h2 className="WhiteListHead">White List</h2>
        {WhiteArr.map( el => {
          return(
            <WhiteList/>
          )
        })
        }
        </div>

      </div>

      <div className="TrafficTable">

        <TrafficTable/>

      </div>

    </div>
  );
}

export default App;
