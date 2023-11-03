// @ts-ignore <>
import { Request, Response } from "npm:express@4.18.2";
import ContactosModelType from "../db/contactos.ts";

const getContactos = async (_req: Request, res: Response) => {
    try {
      const contacto = await ContactosModelType.find().exec();
      res.status(200).send({contacto});
    } catch{
      res.status(404).send("Client not Found");
      return;
    }
  };
  
  export default getContactos;