import * as Mailer from 'react-native-mail';

import { config } from '../common/config';

export enum ErrorLogType {
  INFO,
  WARN,
  ERROR,
}

/**
 * Error logging utility to log errors or other information about app.
 * It will send email about every error or log to me.
 */
const ErrorLogger: ErrorLoggerType = {
  // Error types
  API_ERROR: 'api-error',

  /**
   * Log warning
   * @param msg  Message to log
   */
  warn: (options: LogFunctionOptions): void => {
    if (options.msg) {
      sendEmail(options, ErrorLogType.WARN);
    }
  },

  /**
   * Log error
   * @param msg  Message to log
   */
  error: (options: LogFunctionOptions): void => {
    if (options.msg) {
      sendEmail(options, ErrorLogType.ERROR);
    }
  },

  /**
   * Log information
   * @param msg  Message to log
   */
  info: (options: LogFunctionOptions): void => {
    if (options. msg) {
      sendEmail(options, ErrorLogType.INFO);
    }
  },
};

/**
 * Sends email to me about error
 * @param msg Error/log message
 * @param type Type of log
 */
function sendEmail(options: LogFunctionOptions, type: ErrorLogType): void {
  console.log("mailer", Mailer);
  Mailer.mail({
    subject: '[KApps][HinduCalendar] Log notification',
    recipients: config.errorLogEmail,
    body: getMailBody(options, type),
    isHTML: true,
  },
  (error: {}) => {
    console.log('Some error while sending email..', error); // tslint:disable-line
  });
}

/**
 * Constructs email body
 */
function getMailBody(options: LogFunctionOptions, type: ErrorLogType): string {
  const errorType: string = ErrorLogType[type];
  const details: LogFunctionOptionsDetails = {
    ...options.details,
    type: options.details ? options.details.type : '',
    stack: '',
  };

  if (Error.captureStackTrace) {
    Error.captureStackTrace(details);
  }

  return `
    <i> This is notification regarding some error for your app: <b> Hindu Panchang </b> </i>
    <br />
    <br />

    <b> Error Type: </b> ${errorType} <br />
    <b> Information: </b> <br/>
    <p>${options.msg}</p> <br />
    <p> ${{...details, stack: details.stack}} </p>

    Please check your app if needed.
  `;
}

export {
  ErrorLogger,
};

export interface ErrorLoggerType {
  API_ERROR: string;
  warn(options: LogFunctionOptions): void;
  info(options: LogFunctionOptions): void;
  error(options: LogFunctionOptions): void;
}

interface LogFunctionOptionsDetails {
  type: string;
  requestUrl?: string;
  stack?: string;
}

interface LogFunctionOptions {
  msg: string;
  details?: LogFunctionOptionsDetails;
}

declare global {
  interface ErrorConstructor {
    captureStackTrace(thisArg: any, func?: any): void; // tslint:disable-line
  }
}
