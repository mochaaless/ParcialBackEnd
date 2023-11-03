// @ts-ignore <>
import { Request, Response } from "npm:express@4.18.2";
import ContactoModelType from "../db/contactos.ts";

const updateContacto = async (req: Request, res: Response) => {
  const dni = req.params.dni

  try {
    const {name, email, cpp, ISO_CODE} = req.body;

    const contacto = await ContactoModelType.findOne({dni})
    if (!contacto){
      res.status(404).send("Contacto no encontrado")
    }
    else{
      contacto.name = name || contacto.name
      contacto.email = email || contacto.email
      contacto.cpp = cpp || contacto.cpp
      contacto.ISO_CODE = ISO_CODE || contacto.ISO_CODE
      await contacto.save()
      res.status(200).send("Contacto actualizado!");
    }
    
  } catch{
    res.status(500).send("Error");
    return;
  }
};

export default updateContacto;