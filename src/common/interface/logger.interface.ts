import { LogLevel } from '../types';

/**
 * @public
 */
export interface LoggerService {
  /**
   * Write an 'info' level log.
   */
  info(message: any, ...optionalParams: any[]): void;
  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]): void;
  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]): void;
  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]): void;
  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]): void;

  child(context: string): LoggerService;
}

/**
 * @public
 * Logger configuration interface
 */
export interface LoggerOptions {
  context?: string;
  logLevels?: LogLevel[];
  displayContext?: boolean;
  colorful?: boolean;
}
