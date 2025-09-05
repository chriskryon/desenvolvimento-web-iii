import axios from "axios";

import type { Item, CreateItemData, UpdateItemData } from "../types/Item";

// Configuração base do Axios
const api = axios.create({
	baseURL: "http://localhost:3000/api", // URL do backend
	timeout: 5000, // Timeout de 5 segundos
});

// Tipos de resposta da API
interface ApiResponse<T> {
	data: T;
}

/**
 * Busca todos os itens da lista.
 */
export const getItems = async (): Promise<Item[]> => {
	try {
		const response = await api.get("/items");
		return response.data;
	} catch (error) {
		console.error("Erro ao buscar itens:", error);
		throw new Error("Falha ao carregar itens");
	}
};

/**
 * Cria um novo item na lista.
 */
export const createItem = async (data: CreateItemData): Promise<Item> => {
	try {
		const response = await api.post("/items", data);
		return response.data;
	} catch (error) {
		console.error("Erro ao criar item:", error);
		throw new Error("Falha ao criar item");
	}
};

/**
 * Atualiza um item existente.
 */
export const updateItem = async (
	id: string,
	data: UpdateItemData,
): Promise<Item> => {
	try {
		const response = await api.put(`/items/${id}`, data);
		return response.data;
	} catch (error) {
		console.error("Erro ao atualizar item:", error);
		throw new Error("Falha ao atualizar item");
	}
};

/**
 * Deleta um item da lista.
 */
export const deleteItem = async (id: string): Promise<void> => {
	try {
		await api.delete(`/items/${id}`);
	} catch (error) {
		console.error("Erro ao deletar item:", error);
		throw new Error("Falha ao deletar item");
	}
};
