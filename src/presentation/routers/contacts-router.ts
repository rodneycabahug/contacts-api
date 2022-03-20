import express from "express";
import { Request, Response } from "express";
import { CreateContactUseCase } from "../../domain/interfaces/use-cases/create-contact-use-case";
import { GetAllContactsUseCase } from "../../domain/interfaces/use-cases/get-all-contacts-use-case";

export default function ContactsRouter (
    getAllContactsUseCase: GetAllContactsUseCase,
    createContactUseCase: CreateContactUseCase 
) {
    const router = express.Router();

    router.get("/", async (request: Request, response: Response) => {
        try {
            const contacts = await getAllContactsUseCase.execute();
            response.send(contacts);
        } catch (error) {
            response.status(500).send({ message: "Error fetching contacts" });
        }
    });

    router.post("/", async (request:Request, response: Response) => {
        try {
            const contact = await createContactUseCase.execute(request.body);
            response.status(201).send(contact);
        } catch (error) {
            response.status(500).send({ message: "Error creating contact" });
        }
    });

    return router;
}