import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import userRoles from './constants/userRoles';

export default {
    name: 'user',
    attributes: {
        username: {
            type: Sequelize.STRING,
            unique: true,
            notNull: true,
            notEmpty: true,
            isLowercase: true,
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            notNull: true,
            notEmpty: true,
            isEmail: true,
        },
        role: {
            type: Sequelize.ENUM(Object.values(userRoles)),
            notNull: true,
        },
        encryptedPassword: {
            type: Sequelize.STRING,
            get() {
                return undefined;
            },
        },
    },
    options: {
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['username', 'email'],
            },
        ],
        setterMethods: {
            password(value) {
                const hash = bcrypt.hashSync(value, 10);
                this.setDataValue('encryptedPassword', hash);
            },
        },
        getterMethods: {
            encryptedPassword() {
                return this.encryptedPassword;
            },
        },
        instanceMethods: {
            toJSON() {
                const values = { ...this.get() };
                delete values.encryptedPassword;
                return values;
            },
        },
    },
};
