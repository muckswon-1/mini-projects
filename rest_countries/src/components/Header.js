 import styles from '../styles/Header.module.css';

import { BrightnessHighFill, MoonFill } from "react-bootstrap-icons"
export default function Header(props){
    
    const darkMode = props.darkMode;
    console.log(styles)
    const icon =  darkMode ? <MoonFill/> :<BrightnessHighFill/>;
    const text = darkMode ? "Light Mode" : "Dark Mode";
    return (
        <header className={darkMode ? "darkModeElement ": "lightModeElement"}>
            <h1>Where in the world</h1>
            <button className={darkMode ? "darkModeElement ": "lightModeElement"}
            onClick={props.onClick}> {icon} {text}</button>
        </header>
    )
}