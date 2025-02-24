import { HTTP_ERRORS, HttpStatus } from '../../common';
/**
 * Interface defining HTTP exception options
 * @publicApi
 */
export interface HttpExceptionOptions {
  /**
   * A URI reference [RFC3986] that identifies the problem type.
   * @example 'https://example.com/probs/out-of-credit'
   */
  type?: string;

  /**
   * Short human-readable summary of the problem type.
   * @default HTTP_ERRORS[status].message
   */
  title?: string;

  /**
   * Human-readable explanation specific to this occurrence.
   * @default HTTP_ERRORS[status].description
   */
  detail?: string;

  /**
   * URI reference identifying the specific occurrence of the problem
   * @example '/account/12345/msgs/abc'
   */
  instance?: string;

  /**
   * Additional extension members for the problem details
   */
  [key: string]: unknown;
}

/**
 * Base HTTP exception class providing RFC 7807 Problem Details format
 * @publicApi
 */
export class HttpException extends Error {
  /**
   * A URI reference identifying the problem type
   */
  public readonly type: string;

  /**
   * Short human-readable summary of the problem
   */
  public readonly title: string;

  /**
   * HTTP status code of the exception
   */
  public readonly status: HttpStatus;

  /**
   * Human-readable explanation of the error
   */
  public readonly detail?: string;

  /**
   * URI reference identifying the specific occurrence
   */
  public readonly instance?: string;
  /**
   * Additional problem details extensions
   */
  public readonly extensions: Omit<HttpExceptionOptions, 'type' | 'title' | 'detail' | 'instance'>;

  constructor(status: HttpStatus, options: HttpExceptionOptions = {}) {
    const statusCode = Object.values(HttpStatus).includes(status) ? status : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorConfig = Object.values(HTTP_ERRORS).find((config) => config.status === statusCode)!;
    const { type, title, detail, instance, ...extensions } = options;

    super(detail ?? errorConfig.description);

    // Set error name for stack traces
    this.name = 'HttpException';

    /**
     * @default 'about:blank' (per RFC 7807)
     */
    this.type = type ?? 'about:blank';

    /**
     * @default HTTP_ERRORS[status].message
     */
    this.title = title ?? errorConfig.message;

    /**
     * Normalized HTTP status code
     */
    this.status = statusCode;

    /**
     * Error description (if provided)
     */
    if (detail) this.detail = detail;

    /**
     * Instance reference (if provided)
     */
    if (instance) this.instance = instance;

    /**
     * Extension members (excluding standard fields)
     */
    this.extensions = extensions;

    // Capture stack trace (V8 engine only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Get complete problem details response
   * @param requestId Optional request correlation ID
   * @returns RFC 7807 Problem Details object
   */
  public getProblemDetails(requestId?: string): HttpExceptionOptions {
    return {
      type: this.type,
      title: this.title,
      status: this.status,
      ...(this.detail && { detail: this.detail }),
      ...(this.instance && { instance: this.instance }),
      ...this.extensions,
      ...(requestId && { traceId: requestId }),
    };
  }

  /**
   * Get JSON representation of problem details
   */
  public toJSON(): HttpExceptionOptions {
    return this.getProblemDetails();
  }

  /**
   * Helper to create HttpException with details and extensions
   * @param status HTTP status code
   * @param detail Error description
   * @param extensions Additional problem details
   */
  public static create(status: HttpStatus, detail?: string, extensions?: Record<string, unknown>): HttpException {
    return new HttpException(status, { detail, ...extensions });
  }
}
