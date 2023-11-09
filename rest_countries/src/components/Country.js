import styles from '../styles/Country.module.css';

export default function Country(props){
    const darkMode = props.darkMode
    const darkModeClass = darkMode ? "darkModeElement" : "lightModeElement";
    return (
        <div className={`${styles.container} ${darkModeClass} countryDiv`}
        onClick={props.onClick}
        id={props.id}
        data-country={props.name}
        >
        
            <img src={props.flag}
            alt={props.alt}/>
            <div className={styles.info}>
                <h2>{props.name}</h2>
                <p>Population: <span>{props.population}</span></p>
                <p>Region: <span>{props.region}</span></p>
                <p>Capital: <span>{props.capital}</span></p>
            </div>
        </div>
    )
}