import { Book, User, Comment } from '../models';

export const createComment = async (text, bookId, user) => {
    const book = await Comment.create({ text, userId: user.id, bookId });

    return book;
};

export const getCommentsForBook = async (bookId, page = 0, recordsPerPege = 10) => {
    const books = await Comment.findAndCountAll({
        where: {
            bookId,
        },
        include: [
            { model: User },
            { model: Book },
        ],
        limit: recordsPerPege,
        offset: page,
    });

    return books;
};
