import React,{useState} from 'react'
import styles from './AddForm.module.css'


function AddForm() {

    const [name, setname] = useState("")
    const [mac, setmac] = useState("")
    const [ip, setip] = useState("");
    const [vlan, setvlan] = useState("");


    const addNewAcsess = () => {
        if ( name == '' || mac == '' || ip == '' || vlan == ''){
            alert('Введите все параметры')
        }
        else{
        setname('')
        setmac('')
        setip('')
        setvlan('')
        }
    }

    return (
        <div className={styles.FormBlock}>

         HOST NAME<div><input placeholder="Enter name of host" className={styles.inputBlock} value={name} onChange={(e) => setname(e.target.value)} /></div> 
        
         MAC<div><input placeholder="Enter mac adress" className={styles.inputBlock} value={mac} onChange={(e) => setmac(e.target.value)}/></div> 

         IP<div><input placeholder="Enter ip adress" className={styles.inputBlock} value={ip} onChange={(e) => setip(e.target.value)} pattern="^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$"/></div> 

        VLAN<div><input placeholder="Enter number of VLAN" className={styles.inputBlock} value={vlan} onChange={(e) => setvlan(e.target.value)}/></div> 

                <button onClick={ () => addNewAcsess()} className={styles.buttonform}>Add to white List</button>

        </div>
    )
}

export default AddForm
