import passport from 'passport';
import logger from '../config/logger.config';
import { generateJwtToken } from '../services/AuthService';
import { createUser, findUser } from '../services/UserService';

export const login = async (req, res) => {
    try {
        return passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err) {
                return res.status(400).json({
                    message: 'Body must contain username and password',
                    err,
                });
            }

            if (!user) return res.status(401).json(info);

            return req.login(user, { session: false }, (loginErr) => {
                if (loginErr) throw loginErr;

                const token = generateJwtToken(user);
                return res.json({ token });
            });
        })(req, res);
    } catch (e) {
        logger.error(e);
        return res.status(500).json({
            message: 'Interanal error',
        });
    }
};

export const registration = async (req, res) => {
    const {
        username, email, password, adminKey,
    } = req.body;

    // check password
    if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password))) {
        return res.status(400).json({
            message: 'Password should be at least 8 symbols, contain a number',
        });
    }

    try {
        const userExists = await findUser({ username, email });
        if (userExists) {
            return res.status(400).json({
                message: 'User with the same username or password already exists',
            });
        }

        const user = await createUser({ username, email, password }, adminKey);

        return req.login(user, { session: false }, (err) => {
            if (err) throw err;

            const token = generateJwtToken(user);
            return res.json({ token });
        });
    } catch (e) {
        logger.error(e);
        return res.status(500).json({
            message: 'Interansl error',
        });
    }
};
