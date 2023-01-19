import { Injectable, LoggerService, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.TRANSIENT })
export class LogService implements LoggerService {
  protected context?: string;

  white(str: string) {
    return `\x1b[0m${str}`;
  }
  red(str: string) {
    return `\x1b[31m${str}\x1b[0m`;
  }
  green(str: string) {
    return `\x1b[32m${str}\x1b[0m`;
  }
  yellow(str: string) {
    return `\x1b[33m${str}\x1b[0m`;
  }
  blue(str: string) {
    return `\x1b[34m${str}\x1b[0m`;
  }
  magenta(str: string) {
    return `\x1b[35m${str}\x1b[0m`;
  }
  cyan(str: string) {
    return `\x1b[36m${str}\x1b[0m`;
  }

  formatWithColor(level: string, msg: string, payload: any[]) {
    let lvlColor, msgColor;
    switch (level) {
      case "WAR":
        lvlColor = this.yellow;
        msgColor = this.yellow;
        break;
      case "ERR":
        lvlColor = this.red;
        msgColor = this.red;
        break;
      case "DBG":
        lvlColor = this.cyan;
        msgColor = this.cyan;
        break;
      default:
        lvlColor = this.green;
        msgColor = this.white;
        break;
    }

    let log = lvlColor(level);
    log += ` ${msgColor(process.pid)} - ${msgColor(new Date().toLocaleDateString())} ${msgColor(new Date().toLocaleTimeString())} - `;
    log += `[${this.context ? this.magenta(this.context) : this.magenta(payload[payload.length - 1])}]`;
    log += ` ${msgColor(msg)}`;
    if (Array.isArray(payload) && payload.length > 0) {
      if (payload[0] === this.context || !this.context) {
        payload.splice(payload.length - 1);
      }
      if (payload.length > 0) {
        log += `\n${JSON.stringify(payload, null, 2).replace(/\\\\/g, "/").replace(/\\n/g, "\n")}`;
      }
    }
    return log;
  }

  setContext(context) {
    this.context = context;
  }

  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatWithColor("LOG", message, optionalParams));
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatWithColor("ERR", message, optionalParams));
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    console.error(this.formatWithColor("WAR", message, optionalParams));
  }
  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    console.error(this.formatWithColor("DBG", message, optionalParams));
  }
  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {
    console.error(this.formatWithColor("INF", message, optionalParams));
  }
}
