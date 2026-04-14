// Modelo de usuário
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const UserAdmin = sequelize.define('users_admin', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type:DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password:  {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

}, {
    tableName: 'users_admin',
    timestamps: false
});

export default UserAdmin;