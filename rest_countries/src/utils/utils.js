

export async function fetchAllCountries(url){
    const request = await fetch(url);
    const response = await request.json();


    const countriesProcessed = response.map(
        country => {
            return ({
                flag: {
                    image: country.flags.png,
                    alt: country.flags.alt
                },
                name: country.name.common,
                population:country.population,
                region: country.region,
                capital: typeof country.capital === 'object' ? country.capital[0] : country.capital ? country.capital : "Unknown",
                nativeName : country.name.nativeName ?  country.name.nativeName  : "Unknown" ,
                subRegion: country.subregion ? country.subregion : "None",
                topLevelDomain: "Unknown",
                currencies: country.currencies ? country.currencies : "Unknown",
                languages: country.languages ? country.languages : "Unknown",
                borders : country.borders ? country.borders : "None"

            });
        }
    );

    return countriesProcessed;
}

