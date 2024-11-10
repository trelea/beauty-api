export const corsConf = {
  origin: [
    'http://192.168.1.8:2000',
    'http://localhost:5173',
    'http://localhost:2005',
    'https://localhost',
    process.env.CORS_DEV,
    process.env.CORS_PROD,
  ],
  credentials: true,
};
