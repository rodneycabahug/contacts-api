import { Db } from "mongodb";
import { Database } from "../../interfaces/data-sources/database";

export class MongoDatabase implements Database {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    async find(query: object): Promise<any[]> {
        return await this.db.collection("contacts").find(query).toArray();
    }
    
    async insertOne(doc: any): Promise<any> {
        return await this.db.collection("contacts").insertOne(doc);
    }

}