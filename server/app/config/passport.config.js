import passport from 'passport';
import jwtStrategy from 'passport-jwt';
import localStrategy from 'passport-local';
import { checkCredentials } from '../services/AuthService';
import { getUserById } from '../services/UserService';
import { jwtSecret } from './config';

const passportLocalStrategy = new localStrategy.Strategy(
    {
        usernameField: 'login',
        passwordField: 'password',
    },
    (login, password, done) => checkCredentials(login, password).then((user) => {
        if (user) return done(null, user);
        return done(null, false, { message: 'Wrong email and/or password' });
    }),
);
const opts = {
    jwtFromRequest: jwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
};
const passportJWTStrategy = new jwtStrategy.Strategy(
    opts,
    async (jwtPayload, done) => {
        try {
            const user = await getUserById(jwtPayload.sub);
            done(null, user);
        } catch (e) {
            done(e);
        }
    },
);

const configPassport = () => {
    passport.use(passportLocalStrategy);
    passport.use(passportJWTStrategy);
};

export default configPassport;
