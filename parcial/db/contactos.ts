import mongoose from "npm:mongoose@7.6.3";
import { Contactos } from "../types.ts";


const Schema = mongoose.Schema;

const contactosSchema = new Schema(
  {
    dni: { type: String, required: true},
    name: { type: String, required: true },
    email:  { type: String, required: true },
    cpp: { type: String, required: true },
    ISO_CODE: { type: String, required: true },
  },
  { timestamps: true }
);

export type ContactosModelType = mongoose.Document & Omit<Contactos, "id">;

export default mongoose.model<Contactos>("Contactos", contactosSchema);