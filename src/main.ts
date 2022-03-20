import server from "./server";
import ContactsRouter from "./presentation/routers/contacts-router";
import { GetAllContacts } from "./domain/use-cases/contact/get-all-contacts";
import { ContactRepositoryImpl } from "./data/repositories/contact-repository-impl";
import { CreateContact } from "./domain/use-cases/contact/create-contact";
import { MongoClient } from "mongodb";
import { Database } from "./data/interfaces/data-sources/database";
import { MongoDatabase } from "./data/data-sources/mongodb/mongoDatabase";

(async () => {
    const client: MongoClient = new MongoClient("mongodb://localhost:27017/contacts");
    await client.connect();
    const db = client.db("CONTACTS_DB");

    const contactRepository = new ContactRepositoryImpl(new MongoDatabase(db));

    const contactMiddleware = ContactsRouter(
        new GetAllContacts(contactRepository),
        new CreateContact(contactRepository)
    );

    server.use("/contacts", contactMiddleware);
    server.listen(4000, () => console.log("Running on port 4000"));
})();
