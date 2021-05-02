import http from 'http';
import express, { NextFunction } from 'express';
import log from 'npmlog';
import config from './config';
import { heathCheckRouter } from './routes/health-check.route';

const NAMESPACE = 'APP';
const app = express();

app.use((req, res, next) => {
    log.info(
        NAMESPACE,
        `
        METHOD - [${req.method}], 
        URL - [${req.url}], 
        IP - [${req.socket.remoteAddress}]
        `
    );

    res.on('finish', () => {
        log.info(
            NAMESPACE,
            `
            METHOD - [${req.method}], 
            URL - [${req.url}], 
            IP - [${req.socket.remoteAddress}], 
            STATUS - [${res.statusCode}]
            `
        );
    });

    next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json();
    }

    next();
});

app.use('/', heathCheckRouter);

app.use((req, res, next) => {
    const error = new Error('Not found');
    return res.status(404).json({ message: error.message });
});

app.listen(config.server.port, () => {
    log.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`);
});
