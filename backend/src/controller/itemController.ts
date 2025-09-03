import type { Request, Response } from "express";
import {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
} from "../service/itemService.js";
import { handleError } from "../utils/helpers.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../utils/constants.js";

/**
 * Recupera todos os itens do banco de dados.
 */
export const getAllItemsController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const items = await getAllItems();
    res.json(items);
  } catch (error) {
    handleError(res, error, ERROR_MESSAGES.FETCH_ITEMS);
  }
};

/**
 * Cria um novo item no banco de dados.
 */
export const createItemController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, quantity } = req.body;

    if (!name || !quantity) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: ERROR_MESSAGES.REQUIRED_FIELDS });
      return;
    }

    const item = await createItem({ name, quantity });

    res.status(HTTP_STATUS.CREATED).json(item);
  } catch (error) {
    handleError(res, error, ERROR_MESSAGES.CREATE_ITEM);
  }
};

/**
 * Atualiza um item existente pelo ID.
 */
export const updateItemController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: ERROR_MESSAGES.ID_REQUIRED });
      return;
    }

    const updates = req.body;
    const item = await updateItem(id, updates);

    if (!item) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: ERROR_MESSAGES.ITEM_NOT_FOUND });
      return;
    }

    res.json(item);
  } catch (error) {
    handleError(res, error, ERROR_MESSAGES.UPDATE_ITEM);
  }
};

/**
 * Deleta um item pelo ID.
 */
export const deleteItemController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: ERROR_MESSAGES.ID_REQUIRED });
      return;
    }

    const deleted = await deleteItem(id);

    if (!deleted) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: ERROR_MESSAGES.ITEM_NOT_FOUND });

      return;
    }

    res.status(HTTP_STATUS.NO_CONTENT).send();
  } catch (error) {
    handleError(res, error, ERROR_MESSAGES.DELETE_ITEM);
  }
};
