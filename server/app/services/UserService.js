import { User } from '../models';
import { adminSecret } from '../config/config';
import userRoles from '../models/constants/userRoles';

export const getUserById = async (id) => {
    const user = await User.findOne({ where: { id } });
    return user;
};

export const findUser = async (searchParams) => {
    const acceptedFields = ['username', 'email', 'role'];
    const where = acceptedFields.reduce((acc, val) => {
        if (searchParams[val]) acc[val] = searchParams[val];
        return acc;
    }, {});

    const user = await User.findOne({ where });

    return user;
};

export const createUser = async (userData, adminKey) => {
    const { username, email, password } = userData;

    const user = await User.create({
        username,
        email,
        role: adminKey === adminSecret ? userRoles.ADMIN : userRoles.GUEST,
    });
    user.password = password;
    await user.save();

    return user;
};
