import { isFalsy, isObject } from '..';
import { LoggerOptions, LoggerService, LogLevel, Style, StyleKey } from '../common';

export class Logger implements LoggerService {
  private static logLevels: LogLevel[] = ['info', 'error', 'warn', 'debug', 'verbose'];
  private static defaultContext = 'Application';
  private static defaultColorful = true;

  private readonly context: string;
  private readonly logLevels: Set<LogLevel>;
  private readonly colorful: boolean;
  private readonly displayContext: boolean;

  public readonly styles: Record<LogLevel, StyleKey[]> = {
    info: ['FgGreen', 'Bold'],
    error: ['FgRed', 'BgBlack', 'Bold'],
    warn: ['FgYellow', 'Bold'],
    debug: ['FgBlue', 'Dim'],
    verbose: ['FgMagenta', 'Dim'],
  };
  constructor(private options: Partial<LoggerOptions> = {}) {
    this.context = options.context || Logger.defaultContext;
    this.logLevels = new Set(options.logLevels || Logger.logLevels);
    this.colorful = options.colorful ?? Logger.defaultColorful;
    this.displayContext = options.displayContext ?? true;
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, stack?: string, context?: string): void;
  error(message: any, ...optionalParams: [...any, string?, string?]): void;
  error(message: any, ...optionalParams: any[]) {
    this.log('error', message, optionalParams);
  }

  /**
   * Write a 'log' level log.
   */
  info(message: any, context?: string): void;
  info(message: any, ...optionalParams: [...any, string?]): void;
  info(message: any, ...optionalParams: any[]) {
    this.log('info', message, optionalParams);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, context?: string): void;
  warn(message: any, ...optionalParams: [...any, string?]): void;
  warn(message: any, ...optionalParams: any[]) {
    this.log('warn', message, optionalParams);
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: any, context?: string): void;
  debug(message: any, ...optionalParams: [...any, string?]): void;
  debug(message: any, ...optionalParams: any[]) {
    this.log('debug', message, optionalParams);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: any, context?: string): void;
  verbose(message: any, ...optionalParams: [...any, string?]): void;
  verbose(message: any, ...optionalParams: any[]) {
    this.log('verbose', message, optionalParams);
  }

  child(context: string): LoggerService {
    return new Logger({
      ...this.options,
      context: `${this.context}::${context}`,
    });
  }

  /* Core Implementation */
  private log(level: LogLevel, message: any, params: any[]): void {
    if (isFalsy(this.shouldLog)) return;

    const styledLevel = this.styleLevel(level);
    const styledContext = this.styleContext();
    const formattedMessage = this.formatMessage(message);

    const logParts = [styledContext, styledLevel, ...this.styleMessage(formattedMessage), ...params.map((p) => this.styleObject(p))].filter(Boolean);

    console.log(...logParts);
  }

  private shouldLog(level: LogLevel): boolean {
    return this.logLevels.has(level);
  }

  /* Styling Utilities */
  private styleLevel(level: LogLevel): string {
    if (isFalsy(this.colorful)) return `[${level.toUpperCase()}]`;

    const styles = this.styles[level].map((k) => Style[k]).join('');
    return `${styles}[${level.toUpperCase()}]${Style.Reset}`;
  }

  private styleContext(): string {
    if (isFalsy(this.displayContext)) return '';
    const style = this.colorful ? Style.FgCyan + Style.Bold : '';
    return `${style}[${this.context}]${Style.Reset} `;
  }

  private formatMessage(message: any): string {
    if (isObject(message)) {
      return JSON.stringify(message, null, 2);
    }
    if (message instanceof Error) {
      return `${message.message}\n${message.stack}`;
    }
    return String(message);
  }

  private styleMessage(message: string): string[] {
    if (isFalsy(this.colorful)) return [message];
    return [Style.Dim + message + Style.Reset];
  }

  private styleObject(obj: any): any {
    if (isFalsy(this.colorful)) return obj;
    if (isObject(obj)) {
      return JSON.stringify(obj, null, 2)
        .replace(/"(\w+)":/g, Style.FgYellow + '$1:' + Style.Reset)
        .replace(/(true|false|null)/g, Style.FgMagenta + '$1' + Style.Reset);
    }
    return obj;
  }
}
