import winston from 'winston';

/**
 * Configures a Winston logger for the application.
 * The logger is set to the 'info' level and outputs to the console in a simple format.
 */
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});