import {
    getAllBooks, getBookById, createBook, approveBookById,
} from '../services/BookService';
import logger from '../config/logger.config';

export const getBooks = async (req, res) => {
    const { user } = req;
    const { page, limit } = req.params;

    try {
        const bookList = await getAllBooks(user, page, limit);
        return res.json(bookList);
    } catch (e) {
        logger.error(e);
        return res.status(500).json({
            message: 'Internal error',
        });
    }
};

export const getBook = async (req, res) => {
    const { user } = req;
    const { bookId } = req.params;

    if (!bookId) {
        return res.status(401).json({
            message: 'Request should consist book ID',
        });
    }

    try {
        const book = await getBookById(bookId, user);

        if (!book) return res.status(404).json({ message: 'Book not found' });

        return res.json(book);
    } catch (e) {
        logger.error(e);
        return res.status(500).json({
            message: 'Internal error',
        });
    }
};

export const create = async (req, res) => {
    const { user } = req;

    const { title, description, author } = req.body;

    try {
        const book = await createBook({ title, description, author }, user);
        return res.json(book);
    } catch (e) {
        logger.error(e);
        return res.status(500).json({
            message: 'Internal error',
        });
    }
};

export const approveBook = async (req, res) => {
    const { bookId } = req.body;

    try {
        const book = await approveBookById(bookId);
        return res.json(book);
    } catch (e) {
        logger.error(e);
        return res.status(500).json({
            message: 'Internal error',
        });
    }
};
