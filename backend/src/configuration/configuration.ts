export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    db_host: process.env.POSTGRES_HOST || 'postgres',
    db_port: parseInt(process.env.POSTGRES_PORT, 10),
    db_username: process.env.POSTGRES_USER || 'student',
    db_password: process.env.POSTGRES_PASSWORD || 'student',
    database: process.env.POSTGRES_DB || 'kupipodariday',
    secret_jwt: process.env.JWT_SECRET || 'VerySecret',
    expire_jwt: process.env.JWT_EXPIRES,
});

