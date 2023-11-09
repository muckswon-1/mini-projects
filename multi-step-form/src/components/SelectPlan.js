
import arcadeIcon from '../assets/images/icon-arcade.svg';
import advancedIcon from '../assets/images/icon-advanced.svg';
import proIcon from '../assets/images/icon-pro.svg';
import styles from './styles/SelectPlan.module.css';
import { useEffect, useState } from "react";


function Plan({plan,time,price,onClick,id,selected}){
    let icon = undefined;

    const borderStyle = selected === true ? styles.selectedPlan : styles.unselectedPlan;

    switch(plan){
        case "Arcade": icon = arcadeIcon;break;
        case "Advanced": icon = advancedIcon;break;
        case "Pro": icon = proIcon;break;
    }

    return(
        <div className={`${styles.plan} ${borderStyle}`}
        onClick={onClick}
        data-value={price}
        id={id}>
            <img src={icon} alt={`${plan} icon`}
            onClick={(event)=>{event.stopPropagation()}}/>
            <div className={styles.planAndPrice}
            onClick={(event)=>{event.stopPropagation()}}
            >
                <span className={styles.planName}>{plan}</span>
                {
                    time === "monthly" ? <span className={styles.planPrice}>{`$${price}/mo`}</span>:
                              <><span className={styles.planPrice}>{`$${price}/yr`}</span><span className={styles.monthsFree}>2 months free</span></>      
                }
            </div>
        </div>
    )
}

function MonthlyPlans({onClick,selected}){
    return (
        <div className={styles.plansContainer}>
             <Plan  plan="Arcade" 
             onClick={onClick}
                time="monthly"
                price={9}
                id="arcade"
                selected={selected === 1}
                />
                 <Plan plan="Advanced" 
                 onClick={onClick}
                time="monthly"
                price={12}
                id="advanced"
                selected={selected === 2}
                />
                 <Plan plan="Pro" 
                 onClick={onClick}
                time="monthly"
                price={15}
                id="pro"
                selected={selected === 3}/>
        </div>
    )
}

function YearlyPlans({onClick,selected}){
    return (
        <div className={styles.plansContainer}>
        <Plan plan="Arcade" 
        onClick={onClick}
           time="yearly"
           price={90}
           id="arcade"
           selected={selected === 1}
           />
            <Plan plan="Advanced" 
            onClick={onClick}
           time="yearly"
           price={120}
           id="advanced"
           selected={selected === 2}/>
            <Plan plan="Pro" 
            onClick={onClick}
           time="yearly"
           price={150}
           id="pro"
           selected={selected === 3}/>
   </div>
    )
}


export default function SelectPlan({formData,setFormData}){
    const [isChecked,setIsChecked] = useState(false);
    const [selected,setSelected]  = useState(0);


    const handleCheckboxChange = ({target}) => {
        const checkedValue = target.checked;
        setIsChecked(checkedValue);
        localStorage.setItem('checkboxValue',checkedValue);
        setFormData((prev) =>(
            {...prev,yearly:checkedValue}
        ));
    };

    const handlePlanClick = ({target}) => {
        const planId  = target.id;
        localStorage.setItem('selectedPlan',selected);
        if(planId === "arcade"){
            setSelected(() => {
                return 1;
            });
            setFormData((prev)=>(
                {
                    ...prev,planName:"Arcade",planPrice:formData.yearly ? 90 : 9
                }
            ))
        }else if(planId === "advanced"){
            setSelected(() => {
                return 2
            });
            setFormData((prev)=>(
                {
                    ...prev,planName:"Advanced",planPrice:formData.yearly ? 120 : 12
                }
            ))
        }else if(planId === "pro"){
            setSelected(() => {
                return 3
            });

            setFormData((prev)=>(
                {
                    ...prev,planName:"Pro",planPrice:formData.yearly ? 150 : 15
                }
            ))
        }

        
    };


    useEffect(()=> {
        const yearly = localStorage.getItem('checkboxValue');
        setIsChecked(yearly === "true");

        const selectedPlan = localStorage.getItem('selectedPlan');
        setSelected(selectedPlan);
        
    },[])
 


    
   
    const DisplayPlans = () => {
        if(isChecked){
            return <YearlyPlans onClick={handlePlanClick} selected={selected}/>
        }else {
            return <MonthlyPlans onClick={handlePlanClick} selected={selected}/>
        }
    }

    


   

    return (
        <div className={styles.container}>
            {DisplayPlans()}
           <div className={styles.checkboxDiv}>
           <span>Monthly</span> <input type="checkbox"
            className={styles.checkbox}
            checked={isChecked}
            value={formData.monthly}
            onChange={handleCheckboxChange}
            id="toggle"/>
            <label className={styles.label} htmlFor="toggle"></label>
            <span>Yearly</span>
           </div>

          
        </div>
    )
}