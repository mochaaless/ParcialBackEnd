// @ts-ignore <>
import { Request, Response } from "npm:express@4.18.2";
import ContactoModelType from "../db/contactos.ts";

const addContacto = async (req: Request, res: Response) => {
  try {
    const {dni, name, email, cpp, ISO_CODE} = req.body;
    
    if (!dni || !name || !email || !cpp || !ISO_CODE) {
      res.status(500).send("Missing details in body");
      return;
    }

    const exist_contacto = await ContactoModelType.findOne({dni})
    if (exist_contacto){
      res.status(400).send("Contacto ya guardado en la base de datos anteriomente")
    }
    else{
      const newContacto = new ContactoModelType({dni, name, email, cpp, ISO_CODE});
      await newContacto.save()
      res.status(200).send("Added Contacto");
    }
    
  } catch{
    res.status(500).send("Error");
    return;
  }
};

export default addContacto;