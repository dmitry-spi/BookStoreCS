import express from 'express';
import compression from 'compression';
import passport from 'passport';
import bodyParser from 'body-parser';

import logger from './config/logger.config';
import configPassport from './config/passport.config';
import subcribeMails from './subscribers/email';

// routes
import authRoutes from './routes/authRoutes';
import bookRoutes from './routes/bookRoutes';
import commentRoutes from './routes/commentRoutes';

configPassport();
subcribeMails();

const app = express();

// use compression middleware
app.use(compression());
// JSON parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/book', bookRoutes);
app.use('/comment', commentRoutes);

app.listen(3000, () => logger.info('Server started!'));
