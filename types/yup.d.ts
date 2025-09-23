declare module "yup" {
    export class ValidationError extends Error {
        path?: string;
        errors: string[];
        inner: ValidationError[];
    }

    export interface ValidateOptions {
        abortEarly?: boolean;
    }

    export interface AnySchema<T = unknown> {
        validate(value: unknown, options?: ValidateOptions): Promise<T>;
        isValidSync?(value: unknown, options?: ValidateOptions): boolean;
    }

    export interface StringSchema<T = string> extends AnySchema<T> {
        required(message?: string): this;
        email(message?: string): this;
    }

    export interface ObjectSchema<T extends Record<string, any>> extends AnySchema<T> {}

    export function object<T extends Record<string, any>>(shape: T): ObjectSchema<T>;
    export function string(): StringSchema;
}
