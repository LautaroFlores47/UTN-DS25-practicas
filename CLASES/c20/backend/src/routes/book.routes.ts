import { Router } from 'express';
import * as bookController from '../controllers/book.controller';
import { validate } from '../middlewares/validation.middleware';
import { createBookSchema, updateBookSchema } from '../validations/book.validation';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { normalizeBookPayload } from '../middlewares/normalize-book-payload';

const router = Router();

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

// Solo ADMIN puede crear/editar/borrar
router.post('/', authenticate, authorize('ADMIN'), normalizeBookPayload, validate(createBookSchema), bookController.createBook);
router.put('/:id', authenticate, authorize('ADMIN'), normalizeBookPayload, validate(updateBookSchema), bookController.updateBook);
router.delete('/:id', authenticate, authorize('ADMIN'), bookController.deleteBook);

export default router;
