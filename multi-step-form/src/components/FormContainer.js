
import { useState } from 'react';
import styles from './styles/FormContainer.module.css';
import Aside from './Aside';
import PersonalInfo from './PersonalInfo';
import Header from './Header';
import Button from './Button';
import SelectPlan from './SelectPlan';
import AddOns from './AddOns';
import Summary from './Summary';
import Thankyou from './Thankyou';
import { isEmpty, validateEmail, validateKenyanPhoneNumber, validatePhone } from '../utils/utils';


export default function FormContainer(){
    const stepTitles = ["Personal Info","Select your Plan","Pick Add-Ons","Finishing up"];
    const description = [
        "Please provide your name, email address and phone number.",
        "You have the option of monthly or yearly billing.",
        "Add-ons help enhance your gaming experience",
        "Double check everything looks ok before confirming."
    ];
    const [step,setStep] = useState(0);
    const [formData,setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        yearly: false,
        planName: "",
        planPrice:0,
        addOns:[]
    });

  

    const [formError,setFormError] = useState ({
        nameError:"",
        emailError:"",
        phoneError:"",
    })

    const DisplayStep = () => {
        switch(step){
            case 0: return <PersonalInfo formData={formData} setFormData={setFormData} formError={formError}/>; break;
            case 1: return <SelectPlan formData={formData} setFormData={setFormData}/>; break;
            case 2: return <AddOns formData={formData} setFormData={setFormData}/>;break;
            case 3: return <Summary formData={formData}/>;break;
            default: return <Thankyou/>;break;
        }
    }


    const DisplayButtons = () => {
        switch(step){
            case 0: {
                return <Button text="Next Step" type="next" 
                         
                          onClick={() => {
                            if(isEmpty(formData.name) !== false){
                                setFormError((prev =>(
                                    {
                                        ...prev,nameError:isEmpty("")
                                    }
                                )));
                                return;
                            }else {
                    
                                setFormError((prev =>(
                                    {
                                        ...prev,nameError:""
                                    }
                                )));
                    
                            }
                    
                    
                            if(isEmpty(formData.email) !== false){
                                setFormError((prev =>(
                                    {
                                        ...prev,emailError:isEmpty("")
                                    }
                                )));
                                return;
                            }else {
                                setFormError((prev =>(
                                    {
                                        ...prev,emailError:""
                                    }
                                )));
                            }


                            if(validateEmail(formData.email) !==true){
                                setFormError((prev =>(
                                    {
                                        ...prev,emailError: validateEmail("")
                                    }
            
                                )));

                                return
                            }else {
                                setFormError((prev =>(
                                    {
                                        ...prev,emailError: ""
                                    }
            
                                )));
                            }
                    
                    
                            if(isEmpty(formData.phone) !== false){
                                setFormError((prev =>(
                                    {
                                        ...prev,phoneError:isEmpty("")
                                    }
                                )));
                                return;
                            }else {
                    
                                setFormError((prev =>(
                                    {
                                        ...prev,phoneError:""
                                    }
                                )));
                            }


                            if(validateKenyanPhoneNumber(formData.phone) !== true){
                                setFormError((prev =>(
                                    {
                                        ...prev,phoneError:"Invalid Phone Number"
                                    }
                                )));
                                return;
                            }else {
                                setFormError((prev =>(
                                    {
                                        ...prev,phoneError:""
                                    }
                                )));
                            }
                            setStep(step + 1);
                          }}/>;         
                 }
            case 1: {
                return (
                    <>
                    <Button text="Go Back" type="back"
                    onClick={() => {setStep(step - 1)}}/>
                    <Button text="Next Step" type="next"
                    onClick={() => {
                       
                        setStep(step + 1)}}/>
                    </>
                )
            }

            case 2: {
                return (
                    <>
                    <Button text="Go Back" type="back"
                    onClick={() => {setStep(step - 1)}}/>
                    <Button text="Next Step" type="next"
                    onClick={() => {setStep(step + 1)}}/>
                    </>
                )
            }
            case 3: {
                return (
                    <>
                    <Button text="Go Back" type="back"
                    onClick={() => {setStep(step - 1)}}/>
                    <Button text="Confirm" type="confirm"
                    onClick={() => {
                        console.log(formData);
                        setStep(step + 1)}
                        }/>
                    </>
                )
            }
            default: return <></>


        }
    }


    const handleSubmit = event => {
        event.preventDefault();
        
    }
    

    return(
        <div className={styles.container}>
            <Aside step={step}/>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Header title={stepTitles[step]} details={description[step]}/>
                {DisplayStep()}
                
                <div className={styles.buttons}>
                  {DisplayButtons()}
               </div>
        
            </form>
        </div>
    )
}