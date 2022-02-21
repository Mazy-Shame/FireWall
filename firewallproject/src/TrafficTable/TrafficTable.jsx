import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function TrafficTable() {

    const [packages, setpackages] = useState([])

    useEffect(()=>{
       
        axios.get('http://localhost:3333/getPackages').then( response => {
            let data = response.data
            setpackages(data)
        })

    },[])

  return (
    <div>
        {
            packages.map( (el) => {
                return(
                    <div>
                        <span>ip source: {el.ip_src}</span>
                        <span>ip destination: {el.ip_dst}</span>
                    </div>
                )
            })
        }
    </div>
  )
}

export default TrafficTable