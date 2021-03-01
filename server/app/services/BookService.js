import { Op } from 'sequelize';
import { Book, User, Comment } from '../models';
import userRoles from '../models/constants/userRoles';
import { getRandomImage } from './ImageService';
import getEventEmitter from '../config/event.config';
import { getUserById } from './UserService';

const eventEmitter = getEventEmitter();

const whereQueriesByRole = (user) => {
    const queries = {
        [userRoles.ADMIN]: { },
        [userRoles.GUEST]: {
            [Op.or]: [{ userId: user.id }, { approved: true }],
        },
    };

    return queries[user.role];
};

export const createBook = async (bookValues, user) => {
    const { title, description, author } = bookValues;
    const approved = user.role === userRoles.ADMIN;
    const image = await getRandomImage();
    const imageUrl = image && image.webformatURL;

    const book = await Book.create({
        title, description, author, approved, imageUrl, userId: user.id,
    });

    return book;
};

export const getAllBooks = async (user, page = 0, recordsPerPege = 10) => {
    const books = await Book.findAndCountAll({
        where: {
            ...whereQueriesByRole(user),
        },
        limit: recordsPerPege,
        offset: page,
    });

    return books;
};

export const getBookById = async (id, user) => {
    const book = await Book.findOne({
        where: {
            id,
            ...whereQueriesByRole(user),
        },
        include: [
            { model: User },
            { model: Comment },
        ],
    });

    return book;
};

export const approveBookById = async (id) => {
    const book = await Book.findOne({
        where: { id },
    });

    if (!book) return null;

    book.approved = true;
    await book.save();

    const user = await getUserById(book.userId);
    if (user) {
        eventEmitter.emit('bookAapproved', user.email, book.title);
    }

    return book;
};
