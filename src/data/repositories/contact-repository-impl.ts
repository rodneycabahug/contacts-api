import { Database } from "../interfaces/data-sources/database";
import { Contact } from "../../domain/entities/contact";
import { ContactRepository } from "../../domain/interfaces/repositories/contact-repository";

export class ContactRepositoryImpl implements ContactRepository {
    database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    async createContact(contact: Contact): Promise<Contact> {
        const result = await this.database.insertOne(contact);
        return {
            id: result.insertedId.toString(),
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email
        };
    }

    async getAllContacts(): Promise<Contact[]> {
        const result = await this.database.find({});
        return result.map(contact => ({
            id: contact._id.toString(),
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email
        }));
    }

}