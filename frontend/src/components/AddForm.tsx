import type { FC } from 'react';
import { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useItemsContext } from '../context/useItemsContext';

export const AddForm: FC = () => {
  const { addItem, loading } = useItemsContext();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    await addItem({ name, quantity: Number.parseFloat(price), purchased: false });
    setName('');
    setPrice('');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-2">
      <h2 className="text-sm font-light mb-3 text-center text-slate-700">Adicionar Item</h2>
      <form onSubmit={handleSubmit} className="flex gap-3 items-end">
        <div className="flex-1">
          <label htmlFor="product-name" className="block text-xs font-light text-slate-600 mb-1">Nome</label>
          <Input id="product-name" value={name} onChange={(e) => setName(e.target.value)} className="h-8 bg-slate-50 border-slate-200 rounded text-xs font-light" placeholder="Nome do produto" required />
        </div>
        <div className="w-24">
          <label htmlFor="product-price" className="block text-xs font-light text-slate-600 mb-1">Valor</label>
          <Input id="product-price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="h-8 bg-slate-50 border-slate-200 rounded text-xs font-light" placeholder="0.00" required />
        </div>
        <Button type="submit" disabled={loading} className="h-8 px-4 bg-slate-700 hover:bg-slate-800 rounded font-light text-xs transition-all duration-200 text-white">
          {loading ? <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent" /> : <span className="text-white">Adicionar</span>}
        </Button>
      </form>
    </div>
  );
};

export default AddForm;
