import styles from './styles/AddOns.module.css';
import Header from "./Header";
import Button from './Button';
import { useEffect, useState } from 'react';

export default function AddOns({formData,setFormData}){
    const price = formData.yearly ? 10 : 1;
    const timeStr = formData.yearly ? "yr" : "mo";
    const [onlineServiceChecked,setOnlineServiceChecked] = useState(false);
    const [largerStorageChecked,setLargerStorageChecked] = useState(false);
    const [customizableProfileChecked,setCustomizableProfileChecked] = useState(false);

    const handleOnlineServiceChange = ({target}) => {
        setOnlineServiceChecked(target.checked);
        localStorage.setItem('onlineChecked',target.checked)
        setFormData(prev => ({
    
            ...prev,addOns:[...prev.addOns,"Online Service"]
        }))
    }

    const handleLargerStorageChange = ({target}) => {
        setLargerStorageChecked(target.checked);
        localStorage.setItem('largerStorageChecked',target.checked)
        setFormData(prev => ({
            ...prev,addOns:[...prev.addOns,"Larger Storage"]
        }))
    }

    const handleCustomizableProfileChange = ({target}) => {
        setCustomizableProfileChecked(target.checked);
        localStorage.setItem('customChecked',target.checked)
        setFormData(prev => ({
            ...prev,addOns:[...prev.addOns,"Customizable Profile"]
        }))
    }

    useEffect(()=>{
        const onlineAddon = localStorage.getItem('onlineChecked');
        setOnlineServiceChecked(onlineAddon === true);
        const largerStorageAddon = localStorage.getItem('largerStorageChecked');
        setLargerStorageChecked(largerStorageAddon === true);
        const customazableChecked = localStorage.getItem('customChecked');
        setCustomizableProfileChecked(customazableChecked === true);


    },[]);


    return(
        <div className={styles.container}>
           

            <div className={styles.addOns}>
               <div className={styles.addOnContainer}>
               <input id='online_service' type="checkbox"
               checked={onlineServiceChecked}
               onChange={handleOnlineServiceChange}/>
               <label htmlFor='online_service'>
                <span className={styles.addOnTitle}>Online Service</span>
                <span className={styles.addOnDescription}>Access to multiplayer games</span>
               </label>
                <span className={styles.addOnPrice}>{`+${price} / ${timeStr}`}</span>
               </div>

               <div className={styles.addOnContainer}>
               <input id='online_service' type="checkbox"
               checked={largerStorageChecked}
               onChange={handleLargerStorageChange}/>
               <label htmlFor='online_service'>
                <span className={styles.addOnTitle}>Larger Storage</span>
                <span className={styles.addOnDescription}>Extra 1TB cloud save</span>
               </label>
                <span className={styles.addOnPrice}>{`+${price} / ${timeStr}`}</span>
               </div>

               <div className={styles.addOnContainer}>
               <input id='online_service' type="checkbox"
               checked={customizableProfileChecked}
               onChange={handleCustomizableProfileChange}/>
               <label htmlFor='online_service'>
                <span  className={styles.addOnTitle}>Customizale Profile</span>
                <span className={styles.addOnDescription}>Custom Theme your profile</span>
               </label>
                <span className={styles.addOnPrice}>{`+${price} / ${timeStr}`}</span>
               </div>
            </div>

           
        </div>
    )
}