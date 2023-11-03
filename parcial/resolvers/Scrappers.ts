import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts"

export const ScrapperCity = async (ISO_CODE: string, cpp: string) => {

    const url = `https://zip-api.eu/api/v1/info/${ISO_CODE}-${cpp}`;

    const response = await fetch(url);
    
    const info = await response.json();

    return info["state"]
}




export const ScrapperCountry = async (ISO_CODE: string) => {

    const url = `https://restcountries.com/v3.1/alpha/${ISO_CODE}`

    const response = await fetch(url);
    
    const info = await response.json();

    const country =  (info[0]["name"]["common"])
    //const continent = (info[0]["region"])

    return country
}

export const ScrapperContinent = async (ISO_CODE: string) => {

    const url = `https://restcountries.com/v3.1/alpha/${ISO_CODE}`

    const response = await fetch(url);
    
    const info = await response.json();

    //const country =  (info[0]["name"]["common"])
    const continent = (info[0]["region"])

    return continent
}


export const ScrapperWeather = async (state: string) => {

    const env = await load();

    const WEATHER_API_KEY = env.WEATHER_API_KEY || Deno.env.get("WEATHER_API_KEY");

    if (!WEATHER_API_KEY) {
    console.log("No mongo URL found");
    Deno.exit(1);
    }

    const url = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${state}`

    const response = await fetch(url);
    
    const info = await response.json();

    const localtime = (info.location.localtime)
    return localtime
}

ScrapperWeather("Madrid")