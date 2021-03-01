import Sequelize from 'sequelize';

export default {
    name: 'comment',
    attributes: {
        text: {
            type: Sequelize.TEXT,
        },
    },
    options: {

    },
};
