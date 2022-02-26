import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import styles from './TrafficTable.module.css';
import './Table.css';

function TrafficTable() {

    const [packages, setpackages] = useState([])

    const [hosts, setHosts] = useState([])

    const [click, setclick] = useState(false)

    useEffect(()=>{
       
        axios.get('http://localhost:3333/getPackages').then( response => {
            let data = response.data
            setpackages(data)
        })

    },[])

    const Show = () => {
        if (click == false){
        setclick(true)
        }
        else{
            setclick(false)
        }
    }



  return (
    <div>
        <button onClick={() => { Show() }}>SHOW FRAMES</button>
        <table>
            <thead>
                <tr>
                    <td>Адресс Хоста</td>
                    <td>Опасное / Безопасное соединение</td>
                    <td colSpan={3}>Возможная опасность</td>
                </tr>
            </thead>
        {
            packages.map( (el) => {
                return(
                    <tbody>
                        <tr> 
                            <td>{el.ip}</td> 
                            <td>{el.isSafe ? "Безопасно" : "Опасно"}</td> 
                            <td colSpan={3}>{el.dangerous == null ? "Опасность не определена": el.dangerous}</td>
                        </tr>
                        
                        {click? el.packages.map( el1 => {
                            return(
                                <tr>
                                    <td className='packages'>ip src: {el1.ip_src}</td>
                                    <td className='packages'>ip destination: {el1.ip_dst}</td>
                                    <td className='packages'>protocol using: {el1.protocols[el1.protocols.length - 1]}</td>
                                    <td className='packages'>mac src: {el1.mac_src}</td>
                                    <td className='packages'>mac destination: {el1.mac_dst}</td>
                                </tr>
                            )
                        }) : <tr></tr>}
                    </tbody>
                )
            })
        }
        </table>
    </div>
  )
}

export default TrafficTable