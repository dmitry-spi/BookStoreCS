import modelBuilder from './helpers/modelBuilder';
import getDb from '../config/db.config';

import UserModel from './User';
import CommentModel from './Comment';
import BookModel from './Book';

const sequelize = getDb();
const defineModel = modelBuilder(sequelize);

export const User = defineModel(UserModel);
export const Comment = defineModel(CommentModel);
export const Book = defineModel(BookModel);

User.hasMany(Book);
User.hasMany(Comment);
Book.hasMany(Comment, { onDelete: 'cascade' });
Book.belongsTo(User);
Comment.belongsTo(Book);
Comment.belongsTo(User);

sequelize.sync({ force: true });
