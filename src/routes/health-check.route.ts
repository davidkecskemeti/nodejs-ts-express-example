import express from 'express';
import { healthCheckContorller } from '../controllers/healt-check.controller';

export const heathCheckRouter = express.Router();

heathCheckRouter.get('/health-check', healthCheckContorller);
