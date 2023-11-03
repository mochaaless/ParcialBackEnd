// @ts-ignore <>
import { Request, Response } from "npm:express@4.18.2";
import ContactoModelType from "../db/contactos.ts";

const deleteContactobyDNI = async (req: Request, res: Response) => {
    const dni = req.params.dni

    try {
        const contacto = await ContactoModelType.findOne({dni}).exec();
        
        if (!contacto) {
          res.status(404).send("Contacto no encontrado");
          return;
        }
        
        else{
            contacto.deleteOne()
            res.status(200).send("Contacto eliminado");
        }
    }catch{
        res.status(500).send("Error");
    }
}

export default deleteContactobyDNI