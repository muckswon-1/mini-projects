import styles from './styles/Button.module.css';
export default function Button({text,type,onClick}){

    let buttonClass = undefined;

    switch(type){
        case "back": buttonClass = styles.backButton;break;
        case "next": buttonClass = styles.nextButton;break;
        case "confirm": buttonClass = styles.confirmButton;break;
    }

    return <button
     className={`${styles.button} ${buttonClass}`}
     onClick={onClick}
     type="submit">{text}</button>
}