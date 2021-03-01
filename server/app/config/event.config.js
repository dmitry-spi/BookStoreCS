import EventEmitter from 'events';

let eventEmitter;

const createEventEmitterInstance = () => {
    eventEmitter = new EventEmitter();
    return eventEmitter;
};

const getInstance = () => {
    if (!eventEmitter) return createEventEmitterInstance();
    return eventEmitter;
};

export default getInstance;
