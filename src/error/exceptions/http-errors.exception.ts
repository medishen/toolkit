import { HttpStatus } from '../../common';
import { HttpException, HttpExceptionOptions } from './http.exception';
/**
 * A collection of HTTP exception classes for common client (4xx) and server (5xx) error responses.
 * Each class corresponds to a specific HTTP status code and extends the base `HttpException`.
 */

// 4xx Client Errors
export class BadRequestException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.BAD_REQUEST, options);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.UNAUTHORIZED, options);
  }
}

export class PaymentRequiredException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.PAYMENT_REQUIRED, options);
  }
}

export class ForbiddenException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.FORBIDDEN, options);
  }
}

export class NotFoundException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.NOT_FOUND, options);
  }
}

export class MethodNotAllowedException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.METHOD_NOT_ALLOWED, options);
  }
}

export class NotAcceptableException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.NOT_ACCEPTABLE, options);
  }
}

export class ProxyAuthenticationRequiredException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.PROXY_AUTHENTICATION_REQUIRED, options);
  }
}

export class RequestTimeoutException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.REQUEST_TIMEOUT, options);
  }
}

export class ConflictException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.CONFLICT, options);
  }
}

export class GoneException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.GONE, options);
  }
}

export class LengthRequiredException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.LENGTH_REQUIRED, options);
  }
}

export class PreconditionFailedException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.PRECONDITION_FAILED, options);
  }
}

export class PayloadTooLargeException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.PAYLOAD_TOO_LARGE, options);
  }
}

export class UriTooLongException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.URI_TOO_LONG, options);
  }
}

export class UnsupportedMediaTypeException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.UNSUPPORTED_MEDIA_TYPE, options);
  }
}

export class RangeNotSatisfiableException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE, options);
  }
}

export class ExpectationFailedException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.EXPECTATION_FAILED, options);
  }
}

export class ImATeapotException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.I_AM_A_TEAPOT, options);
  }
}

export class MisdirectedException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.MISDIRECTED, options);
  }
}

export class UnprocessableEntityException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.UNPROCESSABLE_ENTITY, options);
  }
}

export class FailedDependencyException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.FAILED_DEPENDENCY, options);
  }
}

export class PreconditionRequiredException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.PRECONDITION_REQUIRED, options);
  }
}

export class TooManyRequestsException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.TOO_MANY_REQUESTS, options);
  }
}

// 5xx Server Errors
export class InternalServerErrorException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, options);
  }
}

export class NotImplementedException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.NOT_IMPLEMENTED, options);
  }
}

export class BadGatewayException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.BAD_GATEWAY, options);
  }
}

export class ServiceUnavailableException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.SERVICE_UNAVAILABLE, options);
  }
}

export class GatewayTimeoutException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.GATEWAY_TIMEOUT, options);
  }
}

export class HttpVersionNotSupportedException extends HttpException {
  constructor(options?: Partial<HttpExceptionOptions>) {
    super(HttpStatus.HTTP_VERSION_NOT_SUPPORTED, options);
  }
}