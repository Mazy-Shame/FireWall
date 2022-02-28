import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './HostAcList.module.css';
import { useState } from 'react';

function HostAcList() {

    const dispatch = useDispatch()
    const state = useSelector(state => state.HostsReducer)

    const [checked, setchecked] = useState()


    const setAllowed = (allowed, ip) => {
        if (allowed) {
            dispatch({type: "SET-ALLOW", allowed: false, ip: ip})
        }
        else{
            dispatch({type: "SET-ALLOW", allowed: true, ip: ip})
        }
        console.log(state);
    }

    if (state.HostsList == null){
        return(
            <div> downloading</div>
        )
    }
    else{

        return (
            <div className={styles.ListContainer}>
                {
                    state.HostsList.map( el => {
                        return (
                            <div >
                                <label>
                                <input className={styles.optionInput} type='checkbox' name={'switch' + el.ip} checked={el.allowed? true: false} onChange={() => setAllowed(el.allowed,el.ip)} />
                                {el.ip}</label>
                            </div>
                        )
                    })
                }
            </div>
          )
    }

  
}

export default HostAcList