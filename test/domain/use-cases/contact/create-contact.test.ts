import { Contact } from "../../../../src/domain/entities/contact";
import { ContactRepository } from "../../../../src/domain/interfaces/repositories/contact-repository";
import { CreateContact } from "../../../../src/domain/use-cases/contact/create-contact";

describe("Create Contact Use Case", () => {
    class MockContactRepository implements ContactRepository {
        createContact(contact: Contact): Promise<Contact> {
            throw new Error("Method not implemented.");
        }
        getAllContacts(): Promise<Contact[]> {
            throw new Error("Method not implemented.");
        }

    };

    let mockContactRepository: ContactRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockContactRepository = new MockContactRepository();
    });

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

        jest.spyOn(mockContactRepository, "createContact").mockImplementation(() => Promise.resolve(expectedContact));
        const createContactUseCase = new CreateContact(mockContactRepository);
        const result = await createContactUseCase.execute(inputContact);

        expect(mockContactRepository.createContact).toHaveBeenCalledTimes(1);
        expect(mockContactRepository.createContact).toHaveBeenCalledWith(inputContact);
        expect(result).toStrictEqual(expectedContact);
    });
});