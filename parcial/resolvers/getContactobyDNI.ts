// @ts-ignore <>
import { Request, Response } from "npm:express@4.18.2";
import ContactoModelType from "../db/contactos.ts";
import { ScrapperCity, ScrapperCountry, ScrapperContinent, ScrapperWeather} from "./Scrappers.ts";


const getContactobyDNI = async (req: Request, res: Response) => {
    const dni = req.params.dni

    try {
        const contacto = await ContactoModelType.findOne({dni}).exec();
    
        if (!contacto) {
          res.status(404).send("Contacto no encontrado");
          return;
        }
        
        else{
            const state = await ScrapperCity(contacto.ISO_CODE, contacto.cpp)
            const country = await ScrapperCountry(contacto.ISO_CODE)
            const continent = await ScrapperContinent(contacto.ISO_CODE)
            const localtime = await ScrapperWeather(state)

            res.status(200).send({
                dni: contacto.dni,
                name: contacto.name,
                email: contacto.email,
                cpp: contacto.cpp,
                state: state,
                country: country,
                continent: continent,
                localtime: localtime
            
            });
        }
    }catch{
        res.status(500).send("Error");
    }
}

export default getContactobyDNI