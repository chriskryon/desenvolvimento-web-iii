import type { Response } from "express";

import { HTTP_STATUS } from "./constants.js";

/**
 * Trata erros de forma padronizada, logando no console e enviando resposta.
 */
export const handleError = (
  res: Response,
  error: unknown,
  message: string,
  statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
): void => {
  console.error(message, error);

  res.status(statusCode).json({ error: message });
};
