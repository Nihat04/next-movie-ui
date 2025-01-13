import { connection } from '../connection';

export class Table<T> {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    async getById(id: number): Promise<T> {
        return Table.getById(this.name, id);
    }

    async get(): Promise<T[]> {
        return Table.get<T>(this.name);
    }

    async create(obj: T) {
        return Table.create<T>(this.name, obj);
    }

    async update(id: number, obj: T) {
        return Table.update(this.name, id, obj);
    }

    async delete(id: number) {
        return Table.delete(this.name, id);
    }

    static async get<T>(name: string): Promise<T[]> {
        return Table.query(`SELECT * FROM ${name}`);
    }

    static async getById<T>(tableName: string, id: number): Promise<T> {
        const [data] = await connection.query(
            `SELECT * from ${tableName} WHERE id = ${id}`
        );

        if (!(data instanceof Array)) {
            throw new TypeError('data is not an expected type');
        }

        if (data.length === 0) {
            throw new ReferenceError('object not exist');
        }

        if (data.length > 1) {
            throw new RangeError('expected 1 object, but were found more');
        }

        return data[0] as T;
    }

    static async query<T>(query: string): Promise<T[]> {
        const [data] = await connection.query(query);

        return data as T[];
    }

    static async create<T>(tableName: string, obj: T) {
        const entries = Object.entries(obj as object);

        const columns = entries.map(([key]) => key).join(', ');
        const values = entries
            .map(([, value]) => {
                if (typeof value === 'object') {
                    return `'${JSON.stringify(value)}'`;
                }

                return `'${value}'`;
            })
            .join(', ');

        await connection.query(
            `INSERT INTO ${tableName} (${columns}) VALUES (${values});`
        );
    }

    static async update<T>(tableName: string, id: number, obj: T) {
        const entries = Object.entries(obj as object);

        const updates = entries
            .map(([key, value]) => {
                if (typeof value === 'object') {
                    return `${key} = '${JSON.stringify(value)}'`;
                }

                return `${key} = '${value}'`;
            })
            .join(', ');

        await connection.query(
            `UPDATE ${tableName} SET ${updates} WHERE id = ${id};`
        );
    }

    static async delete(tableName: string, id: number) {
        console.log(`DELETE FROM ${tableName} WHERE id = ${id}`);
        await connection.query(`DELETE FROM ${tableName} WHERE id = ${id}`);
    }
}
