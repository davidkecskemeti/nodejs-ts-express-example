import dotenv from 'dotenv';
import { IServer, IConfig } from './types';

dotenv.config();

const SERVER_HOST_NAME = process.env.SERVER_HOST_NAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || '1337';

const SERVER: IServer = {
    hostname: SERVER_HOST_NAME,
    port: SERVER_PORT
};

const config: IConfig = {
    server: SERVER
};

export default config;
