import rtracer from 'cls-rtracer';
import type {
  Options,
  RateLimitExceededEventHandler,
  RateLimitRequestHandler,
} from 'express-rate-limit';
import rateLimit from 'express-rate-limit';

interface VerificationLimiterOptions {
  max: number;
  errorMessage: string;
  keyGenerator?: Options['keyGenerator'];
}

/**
 * Creates a rate limiter for verification endpoints
 * @param {Object} options - Rate limiter configuration
 * @param {number} options.max - Maximum requests per window
 * @param {string} options.errorMessage - Error message when limit exceeded
 * @param {Function} [options.keyGenerator] - Optional (req, res) => string. Defaults to req.ip. Use for per-phone limiting.
 * @returns {Function} Express rate limiter middleware
 */
const createVerificationLimiter = ({
  max,
  errorMessage,
  keyGenerator,
}: VerificationLimiterOptions): RateLimitRequestHandler => {
  return rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max,
    ...(keyGenerator ? { keyGenerator } : {}),
    handler: ((_req, res) => {
      res.status(429).json({
        errorCode: 'rate_limit_exceeded',
        message: errorMessage,
        requestId: rtracer.id(),
        httpStatusCode: 429,
      });
    }) satisfies RateLimitExceededEventHandler,
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Pre-configured rate limiters for common use cases (per phone number)
export const shortenUrlLimiter = createVerificationLimiter({
  max: 5,
  errorMessage: 'Too many requests, please try again later',
});

// Pre-configured rate limiters for common use cases (per phone number)
export const authLimiter = createVerificationLimiter({
  max: 5,
  errorMessage: 'Too many auth attempts, please try again later',
});
