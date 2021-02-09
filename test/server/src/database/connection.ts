import { createConnection } from 'typeorm';

createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "yhw7107",
    database: "test",
    "entities": [
        "./src/models/*.ts"
    ],
    synchronize: true
});