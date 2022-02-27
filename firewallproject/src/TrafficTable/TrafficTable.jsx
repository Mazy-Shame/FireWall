import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import styles from './TrafficTable.module.css';
import './Table.css';
import { useDispatch, useSelector } from 'react-redux';

function TrafficTable(props) {

    const state = useSelector(state => state.HostsReducer)

    const [packages, setpackages] = useState([])

    const [click, setclick] = useState(false)


    const Show = () => {
        if (click == false){
        setclick(true)
        }
        else{
            setclick(false)
        }
    }



    if (state.HostsList == null){
        return(
            <div>downloading</div>
        )
    }
    else{

        return (
            <div>
                <h1>Traffic monitoring table</h1>
                <button onClick={() => { Show() }}>SHOW PACKAGES</button>
                <table>
                    <thead>
                        <tr>
                            <td>Адрес Хоста</td>
                            <td>Опасное / Безопасное соединение</td>
                            <td colSpan={3}>Возможная опасность</td>
                        </tr>
                    </thead>
                {
                    state.HostsList.map( (el) => {
                        if (el.allowed == true){

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
                                            <td className='packages' >IP отправителя: {el1.ip_src}</td>
                                            <td className='packages'>IP получателя: {el1.ip_dst}</td>
                                            <td className='packages'>Протокол: {el1.protocols[el1.protocols.length - 1]}</td>
                                            <td className='packages'>MAC адрес отправителя: {el1.mac_src}</td>
                                            <td className='packages'>MAC адрес получателя: {el1.mac_dst}</td>
                                        </tr>
                                    )
                                }) : <tr></tr>}
                            </tbody>
                        )
                        }
                        else{
                            return <div></div>
                        }
                    })
                }
                </table>
            </div>
          )

    }

  
}

export default TrafficTable