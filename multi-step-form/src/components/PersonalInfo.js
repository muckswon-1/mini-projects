import { useState } from "react";
import styles from './styles/PersonalInfo.module.css'



function Error({text}){
  return (
    <span className={styles.error}>{text}</span>
  )
}

export default function PersonalInfo({formData,setFormData,formError}){


   const handleOnChange = ({target}) => {
       const {name,value} = target;
       setFormData((prev) => (
        {...prev, [name]:value}
       ))
   }
  
    return (
        <div className={styles.container}>
           
              <div className={styles.inputDiv}>
                <label htmlFor="name">Name 
                     <Error text={formError.nameError}/>
                </label>
                <input type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleOnChange}
                placeholder="e.g. Mucks Won"/>
              </div>


               <div className={styles.inputDiv}>
              <label htmlFor="email">Email Address  <Error text={formError.emailError}/></label>
                <input type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                placeholder="e.g mucks.won@softwares@gmail.com"/>
              </div>

             <div className={styles.inputDiv}>
             <label htmlFor="name">Phone number <Error text={formError.phoneError}/></label>
                <input type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleOnChange}
               placeholder="e.g. 0729493194"/>
             </div>       
  
        </div>
    )
}