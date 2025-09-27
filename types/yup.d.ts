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

    export type InferType<TSchema> = TSchema extends AnySchema<infer TValue> ? TValue : never;

    export type InferObjectShape<TShape extends Record<string, AnySchema<any>>> = {
        [Key in keyof TShape]: InferType<TShape[Key]>;
    };

    export interface ObjectSchema<TShape extends Record<string, AnySchema<any>>>
        extends AnySchema<InferObjectShape<TShape>> {}

    export function object<TShape extends Record<string, AnySchema<any>>>(
        shape: TShape
    ): ObjectSchema<TShape>;
    export function string(): StringSchema;
}
