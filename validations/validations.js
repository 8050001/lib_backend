import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Invalid mail format').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
];

export const registrationValidation = [
    body('email', 'Invalid mail format').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
    body('fullName', 'Enter a name').isLength({ min: 2 }),
    body('avatarUrl', 'Invalid URL').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Enter article title').isLength({ min: 3 }).isString(),
    body('text', 'Enter article text').isLength({ min: 10 }).isString(),
    body('tags', 'Invalid tag format').optional().isString(),
    body('imageUrl', 'Invalid URL').optional().isString(),
];

