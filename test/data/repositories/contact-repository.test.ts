import { Contact } from "../../../src/domain/entities/contact";
import { ContactRepository } from "../../../src/domain/interfaces/repositories/contact-repository";
import { ContactRepositoryImpl } from "../../../src/data/repositories/contact-repository-impl";
import { Database } from "../../../src/data/interfaces/data-sources/database";

class MockDatabase implements Database {
    find(query: object): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
    insertOne(doc: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
}

describe("Contact Repository", () => {
    let mockDatabase: Database;

    beforeEach(() => {
        jest.clearAllMocks();
        mockDatabase = new MockDatabase();
    });

    describe("getAllContacts", () => {
        test("should return data", async () => {
            const databaseResult = [
                {
                    _id: "1",
                    email: "rodney.cabahug@gmail.com",
                    firstName: "Rodney",
                    lastName: "Cabahug"
                },
                {
                    _id: "2",
                    email: "claudette.cabahug@outlook.com",
                    firstName: "Claudette",
                    lastName: "Cabahug"
                }
            ];
            const expectedResult = [
                {
                    id: "1",
                    email: "rodney.cabahug@gmail.com",
                    firstName: "Rodney",
                    lastName: "Cabahug"
                },
                {
                    id: "2",
                    email: "claudette.cabahug@outlook.com",
                    firstName: "Claudette",
                    lastName: "Cabahug"
                }
            ];

            jest.spyOn(mockDatabase, "find").mockImplementation(() => Promise.resolve(databaseResult));
            const contactRepository: ContactRepository = new ContactRepositoryImpl(mockDatabase);
            const result = await contactRepository.getAllContacts();

            expect(result).toStrictEqual(expectedResult);            
        });
    });

    describe("createContact", () => {
        test("should return true", async () => {
            const inputContact = {
                email: "rodney.cabahug@gmail.com",
                firstName: "Rodney",
                lastName: "Cabahug"
            };
            const expectedContact = {
                id: "1",
                email: "rodney.cabahug@gmail.com",
                firstName: "Rodney",
                lastName: "Cabahug"
            };

            jest.spyOn(mockDatabase, "insertOne").mockImplementation(() => Promise.resolve(1));
            const contactRepository: ContactRepository = new ContactRepositoryImpl(mockDatabase);
            const result = await contactRepository.createContact(inputContact);

            expect(mockDatabase.insertOne).toHaveBeenCalledTimes(1);
            expect(mockDatabase.insertOne).toHaveBeenCalledWith(inputContact);
            expect(result).toStrictEqual(expectedContact);
        });
    });
});