import { Contact } from "../../../../src/domain/entities/contact";
import { ContactRepository } from "../../../../src/domain/interfaces/repositories/contact-repository";
import { GetAllContacts } from "../../../../src/domain/use-cases/contact/get-all-contacts";

describe("Get All Contacts Use Case", () => {
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

    test("should return all contacts", async () => {
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

        jest.spyOn(mockContactRepository, "getAllContacts").mockImplementation(() => Promise.resolve(expectedResult));
        const getAllContactsUseCase = new GetAllContacts(mockContactRepository);
        const result = await getAllContactsUseCase.execute();

        expect(result).toStrictEqual(expectedResult);
    })
});