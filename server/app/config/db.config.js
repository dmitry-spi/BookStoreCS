import Sequelize from 'sequelize';
import { dbUrl } from './config';

let sequelize;

const createSequilizeInstance = () => {
    sequelize = new Sequelize(dbUrl);
    return sequelize;
};

const getInstance = () => {
    if (!sequelize) return createSequilizeInstance();
    return sequelize;
};

export default getInstance;
