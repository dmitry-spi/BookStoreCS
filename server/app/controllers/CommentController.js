import { createComment, getCommentsForBook } from '../services/CommentService';
import logger from '../config/logger.config';

export const create = async (req, res) => {
    const { user } = req;

    const { text, bookId } = req.body;

    try {
        const comment = await createComment(text, bookId, user);
        return res.json(comment);
    } catch (e) {
        logger.error(e);
        return res.status(500).json({
            message: 'Internal error',
        });
    }
};

export const getComments = async (req, res) => {
    const { bookId, page, limit } = req.params;

    try {
        const comments = await getCommentsForBook(bookId, page, limit);
        return res.json(comments);
    } catch (e) {
        logger.error(e);
        return res.status(500).json({
            message: 'Internal error',
        });
    }
};
