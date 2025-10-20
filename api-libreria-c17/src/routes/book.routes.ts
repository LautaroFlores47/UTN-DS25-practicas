import { Router } from 'express';
import * as bookController from '../controllers/book.controller';
import { validate } from '../middlewares/validation.middleware';
import { createBookSchema, updateBookSchema } from '../validations/book.validation';
import { normalizeBookPayload } from '../middlewares/normalize-book-payload';

const router = Router();

router.get('/',    bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

router.post('/',   normalizeBookPayload, validate(createBookSchema), bookController.createBook);
router.put('/:id', normalizeBookPayload, validate(updateBookSchema), bookController.updateBook);

router.delete('/:id', bookController.deleteBook);

export default router;
