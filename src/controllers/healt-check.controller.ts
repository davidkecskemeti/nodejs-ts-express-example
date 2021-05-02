import { Request, Response, NextFunction } from 'express';
import npmlog from 'npmlog';

const NAMESPACE = 'Healt Check Controller';

export const healthCheckContorller = async (req: Request, res: Response, next: NextFunction) => {
    npmlog.info(NAMESPACE, 'Health route called.');
    return res.status(200).json({ message: 'Example NodeJS TS Service' });
};
