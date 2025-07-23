import path from 'node:path';

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 4 * FIFTEEN_MINUTES;
export const ONE_MONTH = 30 * ONE_DAY;

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');