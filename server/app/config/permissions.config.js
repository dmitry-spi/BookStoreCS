import userRoles from '../models/constants/userRoles';

const grants = {
    [userRoles.ADMIN]: {
        book: {
            'create:any': ['*'],
            'delete:own': ['*'],
            'update:any': ['*'],
            'read:any': ['*'],
        },
        comment: {
            'create:any': ['*'],
            'delete:any': ['*'],
            'read:any': ['*'],
        },
    },
    [userRoles.GUEST]: {
        book: {
            'create:any': ['*', '!approved'],
            'delete:own': ['*'],
            'read:any': ['*'],
        },
        comment: {
            'create:any': ['*'],
            'delete:own': ['*'],
            'read:any': ['*'],
        },
    },
};

export default grants;
