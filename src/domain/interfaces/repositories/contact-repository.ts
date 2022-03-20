import { Contact } from "../../entities/contact";

export interface ContactRepository {
    createContact(contact: Contact): Promise<Contact>;
    getAllContacts(): Promise<Contact[]>;
}