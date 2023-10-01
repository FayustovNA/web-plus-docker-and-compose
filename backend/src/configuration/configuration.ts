export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    db_host: process.env.DATABASE__HOST || 'localhost',
    db_port: parseInt(process.env.DATABASE_PORT, 10),
    db_username: process.env.DATABASE_USERNAME || 'student',
    db_password: process.env.DATABASE_PASSWORD || 'student',
    database: process.env.DATABASE_NAME || 'kupipodariday',
    secret_jwt: process.env.SECRET_JWT || 'VerySecret',
    expire_jwt: process.env.EXPIRE_JWT || 86000,
});
