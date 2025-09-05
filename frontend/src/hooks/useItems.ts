import { useState, useEffect } from "react";
import { getItems, createItem, updateItem, deleteItem } from "../services/api";
import type { Item, CreateItemData, UpdateItemData } from "../types/Item";

export const useItems = () => {
	const [items, setItems] = useState<Item[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchItems = async () => {
		setLoading(true);
		try {
			const data = await getItems();
			setItems(data);
			setError(null);
		} catch {
			setError("Erro ao carregar itens");
		} finally {
			setLoading(false);
		}
	};

	const addItem = async (data: CreateItemData) => {
		try {
			const newItem = await createItem(data);
			setItems((prev) => [...prev, newItem]);
		} catch {
			setError("Erro ao adicionar item");
		}
	};

	const editItem = async (id: string, data: UpdateItemData) => {
		try {
			const updatedItem = await updateItem(id, data);
			setItems((prev) =>
				prev.map((item) => (item._id === id ? updatedItem : item)),
			);
		} catch {
			setError("Erro ao editar item");
		}
	};

	const removeItem = async (id: string) => {
		try {
			await deleteItem(id);
			setItems((prev) => prev.filter((item) => item._id !== id));
		} catch {
			setError("Erro ao remover item");
		}
	};

	useEffect(() => {
		fetchItems();
	}, []);

	return {
		items,
		loading,
		error,
		addItem,
		editItem,
		removeItem,
		refetch: fetchItems,
	};
};
