import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './HostAcList.module.css';
import { useState } from 'react';
import Select from 'react-select';

function HostAcList() {

    const dispatch = useDispatch()
    const state = useSelector(state => state.HostsReducer)

    const [checked, setchecked] = useState()

    const [optvalue, setoptvalue] = useState([])
    const [optvalueun, setoptvalueun] = useState([])


    useEffect(() => {
        if (state.HostsList){

            let options = []

            state.HostsList.map( el => {
                if (el.allowed == true){
                    return(
                        options.push({value: el.ip, label: el.ip})
                    )
                }
            })

            setoptvalue(options)

            let optionsun = []

            state.HostsList.map( el => {
                if (el.allowed == false){
                    return(
                        optionsun.push({value: el.ip, label: el.ip})
                    )
                }
            })

            console.log(optionsun);
            setoptvalueun(optionsun)
            
        }
    }, [state.HostsList])



    const setAllowed = (allowed, ip) => {

    }

    const changeOption = (value,action) => {


        if ( action.action == 'remove-value'){

           let optionsNow = optvalue
           let optionsAfterdelete = optionsNow.filter(function(f) { return f !== action.removedValue })

            setoptvalueun([...optvalueun, action.removedValue])
            setoptvalue(optionsAfterdelete)
            dispatch({type:'SET-ALLOW', allowed: false, ip: action.removedValue.value})
        }
        else if (action.action == 'select-option'){
            let optionsNow = optvalueun
         
            let optionsAfterSelect = optionsNow.filter(function(f) { return f !== action.option })

            setoptvalueun(optionsAfterSelect)
            setoptvalue([...optvalue, action.option])
            dispatch({type:'SET-ALLOW', allowed: true, ip: action.option.value})

        }

    }


    if (state.HostsList == null){
        return(
            <div> downloading</div>
        )
    }
    else{


        //console.log(state.HostsList);

        return (
            <div className={styles.ListContainer}>
                <Select options={optvalueun} onChange={changeOption} isMulti={true} value={optvalue}/>
                {/* {
                    state.HostsList.map( el => {
                        return (
                            <div >
                                <label>
                                <input className={styles.optionInput} type='checkbox' name={'switch' + el.ip} checked={el.allowed? true: false} onChange={() => setAllowed(el.allowed,el.ip)} />
                                {el.ip}</label>
                            </div>
                        )
                    })
                } */}
            </div>
          )
    }

  
}

export default HostAcList