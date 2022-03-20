import { Contact } from "../../entities/contact";
import { ContactRepository } from "../../interfaces/repositories/contact-repository";
import { CreateContactUseCase } from "../../interfaces/use-cases/create-contact-use-case";

export class CreateContact implements CreateContactUseCase {
    contactRepository: ContactRepository;
    constructor(contactRepository: ContactRepository) {
        this.contactRepository = contactRepository;
    }

    async execute(contact: Contact): Promise<Contact> {
        return await this.contactRepository.createContact(contact);
    }
}