/**
 * Constantes para mensagens de erro da aplicação.
 */
export const ERROR_MESSAGES = {
  FETCH_ITEMS: "Erro ao buscar itens",
  CREATE_ITEM: "Erro ao criar item",
  UPDATE_ITEM: "Erro ao atualizar item",
  DELETE_ITEM: "Erro ao deletar item",
  REQUIRED_FIELDS: "Nome e quantidade são obrigatórios",
  ID_REQUIRED: "ID obrigatório",
  ITEM_NOT_FOUND: "Item não encontrado",
} as const;

/**
 * Constantes para códigos de status HTTP.
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
