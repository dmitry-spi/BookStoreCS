import getRandomNumber from './getRandomNumber';

/**
 * Returns random element from the array
 *
 * @param  {Array} arr The array
 */
const getRandomFromArray = (arr) => {
    if (!Array.isArray(arr)) throw Error('arr must be of type Array');
    if (!arr.length) return null;

    const randIdx = getRandomNumber(0, arr.length);

    return arr[randIdx];
};

export default getRandomFromArray;
