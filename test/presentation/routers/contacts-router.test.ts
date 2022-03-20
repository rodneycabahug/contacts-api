import request from "supertest";
import { Contact } from "../../../src/domain/entities/contact";
import { CreateContactUseCase } from "../../../src/domain/interfaces/use-cases/create-contact-use-case";
import { GetAllContactsUseCase } from "../../../src/domain/interfaces/use-cases/get-all-contacts-use-case";
import ContactsRouter from "../../../src/presentation/routers/contacts-router";
import server from "../../../src/server";

class MockGetAllContactsUseCase implements GetAllContactsUseCase {
    execute(): Promise<Contact[]> {
        throw new Error("Method not implemented.");
    }
}

class MockCreateContactUseCase implements CreateContactUseCase {
    execute(contact: Contact): Promise<Contact> {
        throw new Error("Method not implemented.");
    }
}

describe("Contacts Router", () => {
    let mockGetAllContactsUseCase: GetAllContactsUseCase;
    let mockCreateContactUseCase: CreateContactUseCase;

    beforeAll(() => {
        mockCreateContactUseCase = new MockCreateContactUseCase();
        mockGetAllContactsUseCase = new MockGetAllContactsUseCase();
        server.use("/contacts", ContactsRouter(mockGetAllContactsUseCase, mockCreateContactUseCase));
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /contacts", () => {
        test("should return 200 with data", async () => {
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
            jest.spyOn(mockGetAllContactsUseCase, "execute").mockImplementation(() => Promise.resolve(expectedResult));

            const response = await request(server).get("/contacts");

            expect(mockGetAllContactsUseCase.execute).toBeCalledTimes(1);
            expect(response.status).toBe(200);
            expect(response.body).toStrictEqual(expectedResult);
        });

        test("should return 500 with error message", async () => {
            jest.spyOn(mockGetAllContactsUseCase, "execute").mockImplementation(() => Promise.reject(Error()));

            const response = await request(server).get("/contacts");

            expect(mockGetAllContactsUseCase.execute).toBeCalledTimes(1);
            expect(response.status).toBe(500);
            expect(response.body).toStrictEqual({ message: "Error fetching contacts" });
        });
    });

    describe("POST /contacts", () => {
        test("should return 201 with data", async () => {
            const inputData = {
                email: "rodney.cabahug@gmail.com",
                firstName: "Rodney",
                lastName: "Cabahug"
            };
            const expectedData = {
                id: "1",
                email: "rodney.cabahug@gmail.com",
                firstName: "Rodney",
                lastName: "Cabahug"
            };
            jest.spyOn(mockCreateContactUseCase, "execute").mockImplementation(() => Promise.resolve(expectedData));

            const response = await request(server).post("/contacts").send(inputData);

            expect(mockCreateContactUseCase.execute).toBeCalledTimes(1);
            expect(mockCreateContactUseCase.execute).toBeCalledWith(inputData);
            expect(response.status).toBe(201);
            expect(response.body).toStrictEqual(expectedData);
        });

        test("should return 500 with error message", async () => {
            const inputData = {
                id: "1",
                email: "rodney.cabahug@gmail.com",
                firstName: "Rodney",
                lastName: "Cabahug"
            };
            jest.spyOn(mockCreateContactUseCase, "execute").mockImplementation(() => Promise.reject(Error()));

            const response = await request(server).post("/contacts").send(inputData);

            expect(mockCreateContactUseCase.execute).toBeCalledTimes(1);
            expect(response.status).toBe(500);
            expect(response.body).toStrictEqual({ message: "Error creating contact" });
        });
    });
});