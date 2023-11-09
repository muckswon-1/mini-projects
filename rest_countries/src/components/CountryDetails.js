import { ArrowLeft } from "react-bootstrap-icons";
import styles from '../styles/CountryDetails.module.css';

export default function CountryDetails(props){
    const darkMode = props.darkMode;
    const modeClass = darkMode ? "darkModeElement" : "lightModeElement";
    const modeText = darkMode ? "darkModeText" : "lightModeText";

    const country = props.country
    const nativeName = typeof country.nativeName === "object" ? Object.values(country.nativeName)[0].common : country.nativeName;
    const currencies = typeof country.currencies === 'object' ?  Object.values(country.currencies) : country.currencies;
    const languages =  typeof country.languages === "object" ? Object.values(country.languages) : country.languages;
    

    const icon = <ArrowLeft/>
    return (
        <div className={`${styles.container} ${modeText}`}>
            <button className={modeClass} 
             onClick={props.onClick}
            >{icon}Back</button>
            <div className={styles.details}>
                <img src={country.flag.image} alt={country.flag.alt}/>
                <div className={styles.specificsContainer}>
                    <div className={styles.specifics}>
                        <div className={styles.specifics1}>
                            <h2>{country.name}</h2>
                            <p><b>Native Name:</b> <span>{nativeName}</span></p>
                            <p><b>Population:</b> <span>{country.population}</span></p>
                            <p><b>Region:</b> <span>{country.region}</span></p>
                            <p><b>Sub Region:</b> <span>{country.subRegion}</span></p>
                            <p><b>Capital:</b> <span>{country.capital}</span></p>
                        </div>
                        <div className={styles.specifics2}>
                           <p><b>Top Level Domain:</b> <span></span></p>
                           <p><b>Currencies:</b>{
                            typeof currencies === "object" ? (
                                currencies.map((currency) => {
                                    return <span key={currency.symbol}>{currency.name}</span>
                                })
                            ): (<span>{currencies}</span>)
                           }</p>
                           <p><b>Languages:</b>{
                              typeof languages === "object" ? (
                                languages.map((language,index) => {
                                    return <span key={index}>{language} </span>
                                })
                              ):(<span>{languages}</span>)
                           }</p>
                        </div>
                    </div>

                    <div>
                        <p><b>Border Countries:</b> {
                            typeof country.borders === 'object' ? (
                                country.borders.map((border,index)=> {
                                   return  <span className={`${styles.borderCountry} ${modeClass}`}
                                     key={index}
                                    >{border}</span>
                                })
                            ): <span className={`${styles.borderCountry} ${modeClass}`}>{country.border}</span>
                        }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}