import { useState, useEffect } from 'react';
import { getItems, createItem, updateItem, deleteItem } from '../services/api';
import type { Item } from '../types/Item';

const ShoppingList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({ name: '', quantity: 1, purchased: false });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ name: '', quantity: 1 });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar itens');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newItem.name.trim()) return;
    try {
      const item = await createItem(newItem);
      setItems(prev => [...prev, item]);
            setNewItem({ name: '', quantity: 1, purchased: false });
    } catch (err) {
      setError('Erro ao adicionar item');
    }
  };

  const handleEdit = (item: Item) => {
    if (!item._id) return;
    setEditingId(item._id);
    setEditData({ name: item.name, quantity: item.quantity });
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    try {
      const updated = await updateItem(editingId, editData);
      setItems(prev => prev.map(item => item._id === editingId ? updated : item));
      setEditingId(null);
    } catch (err) {
      setError('Erro ao editar item');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este item?')) return;
    try {
      await deleteItem(id);
      setItems(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      setError('Erro ao excluir item');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Lista de Compras</h1>

        {/* Formulário para adicionar */}
        <div className="glass rounded-lg p-6 mb-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Adicionar Item</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nome do item"
              value={newItem.name}
              onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50"
            />
            <input
              type="number"
              min="1"
              value={newItem.quantity}
              onChange={(e) => setNewItem(prev => ({ ...prev, quantity: Number.parseInt(e.target.value) || 1 }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50"
            />
            <button
              type="button"
              onClick={handleAdd}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Adicionar
            </button>
          </div>
        </div>

        {/* Lista de itens */}
        <div className="space-y-4">
          {items.map(item => (
            <div key={item._id} className="glass rounded-lg p-4 shadow-lg">
              {editingId === item._id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50"
                  />
                  <input
                    type="number"
                    min="1"
                    value={editData.quantity}
                                        onChange={(e) => setEditData(prev => ({ ...prev, quantity: Number.parseInt(e.target.value) || 1 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50"
                  />
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={handleSaveEdit}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors duration-200"
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors duration-200"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">Quantidade: {item.quantity}</p>
                    {item.purchased && <span className="text-green-600 text-sm">Comprado</span>}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded transition-colors duration-200"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => item._id && handleDelete(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition-colors duration-200"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
