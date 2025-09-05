/**
 * Interface para um item da lista de compras.
 * Deve corresponder ao modelo do backend.
 */
export interface Item {
	_id?: string;
	name: string;
	quantity: number;
	purchased: boolean;
	createdAt: Date;
}

/**
 * Tipo para criar um novo item (sem _id e createdAt).
 */
export type CreateItemData = Omit<Item, "_id" | "createdAt">;

/**
 * Tipo para atualizar um item (campos opcionais).
 */
export type UpdateItemData = Partial<Omit<Item, "_id" | "createdAt">>;
