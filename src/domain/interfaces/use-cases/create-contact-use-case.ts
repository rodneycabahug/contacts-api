import { Contact } from "../../entities/contact";

export interface CreateContactUseCase {
    execute(contact: Contact): Promise<Contact>;    
}