import styles from './styles/Aside.module.css';
  
function Step({number,description,current}){
    const currentStyle = styles.stepCircleCurrent
    return (
        <div className={`${styles.stepContainer} `}>
            <div className={`${styles.stepCircle} ${current ? currentStyle : ''}`}>{number}</div>
            <div className={styles.stepDetails}>
                <span className={styles.stepNumber}>STEP {number}</span>
                <span className={styles.stepDescription}>{description}</span>
            </div>
        </div>
    )
}


export default function Aside({step}){

    return (
        <div className={styles.container}>
            <Step current={step == 0 } number={1} description="YOUR INFO"/>
            <Step current={step == 1} number={2} description="SELECT PLAN"/>
            <Step current={step == 2} number={3} description="ADD-ONS"/>
            <Step current={step == 3} number={4} description="SUMMARY"/>
        </div>
    )
}