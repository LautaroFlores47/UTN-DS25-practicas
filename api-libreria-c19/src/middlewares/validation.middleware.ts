import { ZodError, ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate = (schema: ZodType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
        const validated = await schema.parseAsync(req.body);
        req.body = validated; // datos ya validados
        next();
        } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
            success: false,
            message: 'Datos inválidos',
            errors: error.issues.map(issue => ({
                field: issue.path.join('.'),
                message: issue.message
            }))
            });
        }
        next(error);
        }
    };
};
