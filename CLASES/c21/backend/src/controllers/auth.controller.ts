import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await authService.login(req.body);
        res.json({ success: true, data: result });
    } catch (err) { next(err); }
}

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await authService.register(req.body);
        res.status(201).json({ success: true, data: result });
    } catch (err) { next(err); }
}
