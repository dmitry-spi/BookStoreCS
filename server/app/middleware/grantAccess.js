import AccessControl from 'accesscontrol';
import grants from '../config/permissions.config';

const grantAccess = (action, resource) => {
    const ac = new AccessControl(grants);
    return (req, res, next) => {
        if (!action || !resource) return next();

        const { user: { role } } = req;

        try {
            const hasPermission = ac.can(role)[action](resource);
            if (hasPermission) return next();
            return res.status(401).json({
                message: 'You don\'t have anougt permissions to do this',
            });
        } catch (e) {
            return next(e);
        }
    };
};

export default grantAccess;
