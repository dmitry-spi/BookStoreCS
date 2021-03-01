import axios from 'axios';
import logger from '../config/logger.config';
import { pixaBayApiKey } from '../config/config';
import getRandomFromArray from './helpers/getRandomFromArray';

const BASE_URL = `https://pixabay.com/api/?key=${pixaBayApiKey}`;

const getImages = async (url) => {
    const { data } = await axios.get(url);
    return data;
};

export const getRandomImage = async () => {
    try {
        const imageData = await getImages(BASE_URL);
        return getRandomFromArray(imageData.hits);
    } catch (e) {
        logger.error('Error during request', e);
    }
    return null;
};

export const getRandomImageByKeyword = async (keyword) => {
    try {
        const imageData = await getImages(`${BASE_URL}&q=${keyword}`);
        return getRandomFromArray(imageData);
    } catch (e) {
        logger.error('Error during request', e);
    }
    return null;
};
