import mysql from "mysql2/promise";

export async function main() {
    const connection = await mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "wassabyAdmin123",
        database: "movie-ui",
    });

    // const [] = await connection.execute(
    //     "SELECT * FROM `table` WHERE `name` = ? AND `age` > ?",
    //     ["Morty", 14]
    // );
}
