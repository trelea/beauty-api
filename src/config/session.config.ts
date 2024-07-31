export const sessionConf = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: Number(process.env.SESSION_EXPIRE)
    }
};
