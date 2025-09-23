class ValidationError extends Error {
  constructor(errors, path, inner = []) {
    const messages = Array.isArray(errors) ? errors.map(String) : [String(errors)];
    super(messages[0] || "Validation error");
    this.name = "ValidationError";
    this.errors = messages;
    this.path = path;
    this.inner = inner;
  }
}

class BaseSchema {
  async validate(value, options = {}, path) {
    return this._validate(value, options, path);
  }

  isValidSync(value, options = {}) {
    try {
      this._validate(value, options);
      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        return false;
      }
      throw error;
    }
  }
}

class StringSchema extends BaseSchema {
  constructor() {
    super();
    this.tests = [];
  }

  required(message = "Required") {
    this.tests.push({
      name: "required",
      message,
      check: (value) => value !== undefined && value !== null && String(value).trim() !== "",
    });
    return this;
  }

  email(message = "Invalid email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.tests.push({
      name: "email",
      message,
      check: (value) => typeof value === "string" && emailRegex.test(value),
    });
    return this;
  }

  async _validate(value, options = {}, path) {
    const errors = [];
    const inner = [];
    let output = value;

    if (output === undefined || output === null) {
      output = output;
    } else if (typeof output !== "string") {
      output = String(output);
    }

    for (const test of this.tests) {
      const passed = test.check(output);
      if (!passed) {
        errors.push(test.message);
        inner.push(new ValidationError([test.message], path));
        if (options.abortEarly !== false) {
          throw new ValidationError(errors, path, inner);
        }
      }
    }

    if (errors.length) {
      throw new ValidationError(errors, path, inner);
    }

    return typeof output === "string" ? output : output ?? "";
  }
}

class ObjectSchema extends BaseSchema {
  constructor(shape) {
    super();
    this.shape = shape;
  }

  async _validate(value, options = {}, path) {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      throw new ValidationError(["Invalid object"], path);
    }

    const result = {};
    const errors = [];
    const inner = [];

    for (const key of Object.keys(this.shape)) {
      const schema = this.shape[key];
      try {
        result[key] = await schema.validate(value[key], options, key);
      } catch (error) {
        if (error instanceof ValidationError) {
          const childErrors = error.inner.length ? error.inner : [new ValidationError(error.errors, key)];
          errors.push(...error.errors);
          inner.push(...childErrors.map((err) => {
            if (err.path == null) {
              err.path = key;
            }
            return err;
          }));
          if (options.abortEarly !== false) {
            throw new ValidationError(errors, key, inner);
          }
        } else {
          throw error;
        }
      }
    }

    if (errors.length) {
      throw new ValidationError(errors, path, inner);
    }

    return result;
  }
}

function string() {
  return new StringSchema();
}

function object(shape) {
  return new ObjectSchema(shape);
}

module.exports = {
  ValidationError,
  object,
  string,
};
