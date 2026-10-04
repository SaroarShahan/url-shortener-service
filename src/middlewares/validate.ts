import type { NextFunction, Request, Response } from 'express';

interface Parser<T = Record<string, unknown>> {
  parse: (data: unknown) => T;
}

interface ValidationSchema {
  // Allow values to be string, number, or any primitive that your schemas coerce them into
  params?: Parser<Record<string, string | number | boolean>>;
  query?: Parser<Record<string, unknown>>;
  body?: Parser<unknown>;
}

const validate = (schema: ValidationSchema = {}) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (schema.params) {
        //
        req.params = schema.params.parse(req.params) as unknown as Record<string, string>;
      }

      if (schema.query) {
        const parsedQuery = schema.query.parse(req.query);

        for (const key of Object.keys(req.query)) {
          delete req.query[key];
        }

        Object.assign(req.query, parsedQuery);
      }

      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }

      next();
    } catch (error: unknown) {
      const validationError = error as Error & {
        httpStatusCode?: number;
        value?: boolean;
        type?: string;
      };

      validationError.httpStatusCode = 400;
      validationError.value = true;
      validationError.type = 'validation';

      next(validationError);
    }
  };
};

export default validate;
