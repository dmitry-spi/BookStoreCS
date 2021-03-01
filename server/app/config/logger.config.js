import { createSimpleLogger } from 'simple-node-logger';

const logger = createSimpleLogger();

const levelLogger = {
    info: (...args) => logger.log('info', ...args),
    error: (...args) => logger.log('error', ...args),
    debug: (...args) => logger.log('debug', ...args),
};

export default levelLogger;
