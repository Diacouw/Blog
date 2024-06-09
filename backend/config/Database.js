import { Sequelize } from "sequelize";

const db = new Sequelize("project25", "Diaco", "at2754at", {
     host: "localhost",
     dialect: "mysql",
});


export default db;