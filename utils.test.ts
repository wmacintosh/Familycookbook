import { describe, it, expect } from 'vitest';
import { generateId, AppError } from './utils';

describe('utils', () => {
    describe('generateId', () => {
        it('should generate a valid UUID', () => {
            const id = generateId();
            expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
        });

        it('should generate unique IDs', () => {
            const id1 = generateId();
            const id2 = generateId();
            expect(id1).not.toBe(id2);
        });
    });

    describe('AppError', () => {
        it('should create an error with default code and status', () => {
            const error = new AppError('Test error');
            expect(error.message).toBe('Test error');
            expect(error.code).toBe('UNKNOWN_ERROR');
            expect(error.statusCode).toBe(500);
            expect(error.name).toBe('AppError');
        });

        it('should create an error with custom code and status', () => {
            const error = new AppError('Not found', 'NOT_FOUND', 404);
            expect(error.message).toBe('Not found');
            expect(error.code).toBe('NOT_FOUND');
            expect(error.statusCode).toBe(404);
        });

        it('should be an instance of Error', () => {
            const error = new AppError('Test');
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(AppError);
        });
    });
});
