import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import addContacto from "./resolvers/postContacto.ts";
import getContactos from "./resolvers/getContacto.ts"
import getContactobyDNI from "./resolvers/getContactobyDNI.ts";
import updateContacto from "./resolvers/putContactobyDNI.ts";
import deleteContactobyDNI from "./resolvers/deleteContactobyDNI.ts";

import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts"
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
app

.post("/api/contactos", addContacto)
.get("/api/contactos", getContactos)
.get("/api/contactos/:dni", getContactobyDNI)
.put("/api/contactos/:dni", updateContacto)
.delete("/api/contactos/:dni", deleteContactobyDNI)


app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });