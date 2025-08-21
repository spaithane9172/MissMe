import mongoose from "mongoose";
import ContactSchema from "../schema/ContactSchema.js";
const ContactModel = mongoose.model("Contacts", ContactSchema);
export default ContactModel;
