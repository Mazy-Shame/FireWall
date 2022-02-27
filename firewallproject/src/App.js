import React, {useState, useEffect} from "react";
import './App.css'
// import GraphTraffic from "./GarphTraffic/GraphTraffic";
// import WhiteList from "./WhiteList/WhiteList";
// import "@progress/kendo-theme-material/dist/all.css";
import "hammerjs";
import axios from "axios";
import TrafficTable from "./TrafficTable/TrafficTable";
import HostAcList from "./HostsAcList/HostAcList";
import { useDispatch } from 'react-redux';


function App() {

  const dispatch = useDispatch()

  useEffect( () => {

    axios.get('http://localhost:3333/getPackages').then( response => {
            let data = response.data
            dispatch({type: "SET-HOSTS", hosts: data})
        })


  }, [])

  return (
    <div className="App">
      <h1 className="heading">Firewall management</h1>

      <div className="containerForm">


        <div className="WhiteArrContainer">
            
            <h2 className="WhiteListHead">Hosts List</h2>
            <HostAcList/>

  
        </div>

      </div>

      <div className="TrafficTable">

        <TrafficTable />

      </div>

    </div>
  );
}

export default App;
