import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { jwtSecret } from '../config/config';

export const checkCredentials = async (login, password) => {
    const user = await User.findOne({
        where: {
            // find by email or username
            [Op.or]: [{ username: login }, { email: login }],
        },
    });

    if (!user) return false;

    const samePassword = bcrypt.compare(password, user.encryptedPassword);

    return samePassword && user;
};

export const generateJwtToken = (user) => {
    if (!user || !user.id) throw Error('user is not defined');

    return jwt.sign({ sub: user.id }, jwtSecret);
};
