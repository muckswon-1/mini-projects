import { useEffect, useState } from 'react';
import styles from '../styles/Countries.module.css';
import { fetchAllCountries } from '../utils/utils';
import Country from './Country';
import CountryDetails from './CountryDetails';

export default function Countries(props){

    const [countries,setCountries] = useState([]);
    const [url,setUrl] = useState("https://restcountries.com/v3.1/all");
    const [region,setRegion] = useState('');
    const [search,setSearch] = useState('');
    const [selectedCountry,setSelectedCountry] = useState(null);
    const darkMode = props.darkMode;
    const elemModeClass = darkMode ? "darkModeElement" : "lightModeElement";

    const handleOptionChange = ({target}) => {
        setRegion(target.value);
    }

    const handleSearchChange = ({target}) => {
        setSearch(target.value);
    }

    const handleCountryClick = (event) =>{
        const countryName = event.currentTarget.getAttribute('data-country');
        setSelectedCountry(countryName);
    }

  

    async function processedData(){
          
        if(region){
            setUrl(`https://restcountries.com/v3.1/region/${region}`);
        }

        if(search) {
            setUrl(`https://restcountries.com/v3.1/name/${search}`);
        }

        const countryObjects = await fetchAllCountries(url);
        setCountries(countryObjects);
    }

    const getCountry = countryName => {
        return countries.filter(
            country => {
                return country.name === countryName;
            }
        )[0]
    }

  
    
    useEffect(()=> {
        processedData();
    })

    
    const countryToDetail = getCountry(selectedCountry);
    if(countryToDetail){
        console.log(countryToDetail);
       
       console.log();
    //    console.log(Object.values(countryToDetail.currencies))
    if( typeof countryToDetail.currencies === 'object'){
        console.log(Object.values(countryToDetail.currencies))
    }else {
        console.log(countryToDetail.currencies);
    }


     }
   

    
    return(

        <div className={styles.container}>

            {
                selectedCountry ? (
                    <CountryDetails darkMode={darkMode} 
                     country={countryToDetail}
                    onClick={() => setSelectedCountry(null)}/>
                ): (
                    <>
                    <div className={`${styles.userInput}`}>
                    <input className={`${styles.searchInput} ${elemModeClass}`} 
                    onChange={handleSearchChange}
                    value={search}
                    placeholder="Search for a country"/>
                    <select
                      onChange={handleOptionChange}
                      value={region}
                    className={`${styles.select} ${elemModeClass}`}>
                        <option value="">Filter by Region</option>
                        <option value="africa">Africa</option>
                        <option value="america">America</option>
                        <option value="europe">Europe</option>
                        <option value="asia">Asia</option>
                        <option value="oceania">Oceania</option>
                    </select>
                </div> 
                
                  <div className={styles.countries}>
                  {
                       countries.length === 0 ? (
                          <p>Loading ...</p>
                       ):
                       
                       (
                        countries.map(
                            (country,index) => {
                                return <Country key={index}
                                          flag={country.flag.image}
                                          alt ={country.flag.alt}
                                          name={country.name}
                                          population={country.population}
                                          region={country.region}
                                          capital={country.capital}
                                          darkMode={darkMode}
                                          onClick={handleCountryClick}
                                        />
                            }
                        )
                       )
                  }        
               </div>
               </>
                )
            }













            
        

        
        </div>
    )
}

