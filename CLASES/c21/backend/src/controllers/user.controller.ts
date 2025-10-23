import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';

export async function getAllUsers(_req: Request, res: Response, next: NextFunction) {
    try { const users = await userService.getAllUsers(); res.json({ success:true, data: users }); }
    catch (e) { next(e); }
}
export async function getUserById(req: Request, res: Response, next: NextFunction) {
    try { const u = await userService.getUserById(Number(req.params.id)); res.json({ success:true, data:u }); }
    catch (e) { next(e); }
}
export async function createUser(req: Request, res: Response, next: NextFunction) {
    try { const u = await userService.createUser(req.body); res.status(201).json({ success:true, data:u }); }
    catch (e) { next(e); }
}
export async function updateUser(req: Request, res: Response, next: NextFunction) {
    try { const u = await userService.updateUser(Number(req.params.id), req.body); res.json({ success:true, data:u }); }
    catch (e) { next(e); }
}
export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try { await userService.deleteUser(Number(req.params.id)); res.json({ success:true, message:'User deleted' }); }
    catch (e) { next(e); }
}
