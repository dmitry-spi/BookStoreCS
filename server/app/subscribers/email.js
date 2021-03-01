import nodemailer from 'nodemailer';
import { emailSupport } from '../config/config';
import getEventEmitter from '../config/event.config';
import logger from '../config/logger.config';

const getTransporter = async () => {
    // should be reimplement on real project
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    return transporter;
};

const sendBookApproveMail = async (email, bookName) => {
    const transporter = await getTransporter();

    const result = await transporter.sendMail({
        from: `"Dmytro Spivak 👻" <${emailSupport}>`,
        to: email,
        subject: 'Your book is approved',
        text: `Your book ${bookName} is approved`,
    });

    return result;
};

const subcribeMails = () => {
    const eventEmitter = getEventEmitter();

    eventEmitter.on('bookAapproved', async (email, bookName) => {
        try {
            await sendBookApproveMail(email, bookName);
        } catch (e) {
            logger.error('Error sending mail', e);
        }
    });
};

export default subcribeMails;
