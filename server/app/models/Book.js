import Sequelize from 'sequelize';

export default {
    name: 'book',
    attributes: {
        title: {
            type: Sequelize.STRING,
            notNull: true,
            notEmpty: true,
        },
        description: {
            type: Sequelize.TEXT,
        },
        imageUrl: {
            type: Sequelize.STRING,
        },
        author: {
            type: Sequelize.STRING,
            notNull: true,
            notEmpty: true,
        },
        approved: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    },
    options: {

    },
};
