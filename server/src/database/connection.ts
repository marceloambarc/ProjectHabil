import { createConnection } from 'typeorm';

createConnection({
    type: "mysql",
    host: "192.168.15.12",
    port: 3306,
    username: "user",
    password: "@gr3m10@",
    database: "db",
    "entities": [
        "./src/models/*.ts"
    ],
    synchronize: true
});