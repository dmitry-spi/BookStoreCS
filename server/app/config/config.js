const {
    DB_URL, JWT_SECRET, ADMIN_KEY, PIXABAY_KEY, EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_SUPPORT,
} = process.env;

export const dbUrl = DB_URL;
export const jwtSecret = JWT_SECRET;
export const adminSecret = ADMIN_KEY;
export const pixaBayApiKey = PIXABAY_KEY;
export const emailUser = EMAIL_USERNAME;
export const emailPass = EMAIL_PASSWORD;
export const emailSupport = EMAIL_SUPPORT;
