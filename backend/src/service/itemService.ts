import Item from "../models/Item.js";
import type { IItem } from "../models/Item.js";

/**
 * Recupera todos os itens do banco de dados.
 */
export const getAllItems = async (): Promise<IItem[]> => {
  return await Item.find();
};

/**
 * Cria um novo item no banco de dados.
 */
export const createItem = async (data: {
  name: string;
  quantity: number;
}): Promise<IItem> => {
  const item = new Item(data);

  return await item.save();
};

/**
 * Atualiza um item existente pelo ID.
 */
export const updateItem = async (
  id: string,
  data: Partial<IItem>,
): Promise<IItem | null> => {
  return await Item.findByIdAndUpdate(id, data, { new: true });
};

/**
 * Deleta um item pelo ID.
 */
export const deleteItem = async (id: string): Promise<boolean> => {
  const result = await Item.findByIdAndDelete(id);

  return !!result;
};
